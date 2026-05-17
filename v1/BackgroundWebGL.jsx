// BackgroundWebGL.jsx — saturated plasma canvas + 5 vertical white-glass slices.
// Technique mirrors the IRIA-style reference: vibrant noise plasma painted on a
// canvas behind everything, then 5 vertical glass panels (opaque-white on the
// left → near-transparent on the right) reveal the plasma progressively. The
// visible "wide rectangles" are the white glass slices.
const { useEffect: useEffectBG, useRef: useRefBG } = React;

function BackgroundWebGL() {
  const canvasRef = useRefBG(null);
  const rafRef = useRefBG(0);

  useEffectBG(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const vsrc = `
      attribute vec2 a;
      void main(){ gl_Position = vec4(a, 0.0, 1.0); }
    `;

    // Simplex noise plasma — flowing indigo / cyan / deep-purple
    const fsrc = `
      precision highp float;
      uniform vec2 uRes;
      uniform float uT;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g; g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        float t = uT * 0.18;

        float n  = snoise(uv * 2.4 + vec2(t * 0.40, t * 0.50));
        float n2 = snoise(uv * 1.4 - vec2(t * 0.30, t * 0.20));

        // BETA ETF brand palette — lightened for a softer plasma
        vec3 INDIGO   = vec3(0.520, 0.500, 0.945); // lightened from #4F46E5
        vec3 CYAN     = vec3(0.420, 0.860, 0.930); // lightened from #06B6D4
        vec3 DEEP     = vec3(0.420, 0.400, 0.760); // lighter base
        vec3 LAVENDER = vec3(0.880, 0.910, 1.000); // brighter lavender

        float m1 = smoothstep(-0.6, 0.8, n);
        vec3 col = mix(DEEP, INDIGO, m1);

        float m2 = smoothstep(-0.4, 0.9, n2);
        col = mix(col, CYAN, m2 * 0.75);

        // lavender hot-spot at intersections — keeps it brand-correct
        float m3 = smoothstep(0.6, 1.0, n * n2 + 0.4);
        col = mix(col, LAVENDER, m3 * 0.35);

        // Tame overall plasma intensity by blending toward white
        vec3 PAGE_BG = vec3(1.000, 1.000, 1.000);
        col = mix(PAGE_BG, col, 0.50);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1,
    ]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uT   = gl.getUniformLocation(prog, "uT");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const t0 = performance.now();
    let running = true;
    const onVis = () => { running = !document.hidden; if (running) loop(); };
    document.addEventListener("visibilitychange", onVis);

    function loop() {
      if (!running) return;
      const t = (performance.now() - t0) / 1000;
      gl.uniform1f(uT, t);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="hero-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-bg__canvas" />
      <div className="hero-bg__slices">
        <div className="hero-bg__slice s1" />
        <div className="hero-bg__slice s2" />
        <div className="hero-bg__slice s3" />
        <div className="hero-bg__slice s4" />
        <div className="hero-bg__slice s5" />
      </div>
    </div>
  );
}
window.BackgroundWebGL = BackgroundWebGL;
