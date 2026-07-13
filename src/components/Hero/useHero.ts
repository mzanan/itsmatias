import { useEffect, useMemo } from "react";
import { Renderer, Camera, Transform, Plane, Mesh, Program } from "ogl";

const vertexShader = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uWaveHeight;

  varying vec3 vNormal;
  varying float vHeight;
  varying vec2 vUv;

  float wave(vec2 p, float t, vec2 dir, float freq, float speed) {
    return sin(dot(p, dir) * freq + t * speed);
  }

  float surface(vec2 p, float t, vec2 mouse) {
    vec2 m = mouse * 0.6;
    vec2 d1 = normalize(vec2(1.0, 0.6) + m);
    vec2 d2 = normalize(vec2(-0.7, 1.0) - m * 0.5);
    vec2 d3 = normalize(vec2(0.4, -1.0) + m * 0.3);

    float h = 0.0;
    h += wave(p, t, d1, 0.018, 0.9) * 0.55;
    h += wave(p, t, d2, 0.030, 1.2) * 0.30;
    h += wave(p, t, d3, 0.055, 1.5) * 0.18;
    h += sin(p.x * 0.012 + t * 0.4 + mouse.x * 1.2) * 0.25;
    h += cos(p.y * 0.014 + t * 0.35 + mouse.y * 1.1) * 0.22;
    return h;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float h = surface(pos.xy, uTime, uMouse);
    pos.z += h * uWaveHeight;

    float eps = 4.0;
    float hx = surface(pos.xy + vec2(eps, 0.0), uTime, uMouse);
    float hy = surface(pos.xy + vec2(0.0, eps), uTime, uMouse);
    vec3 tangentX = vec3(eps, 0.0, (hx - h) * uWaveHeight);
    vec3 tangentY = vec3(0.0, eps, (hy - h) * uWaveHeight);
    vNormal = normalize(cross(tangentX, tangentY));
    vHeight = h;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uShininess;
  uniform vec3 uColorDeep;
  uniform vec3 uColorPeak;

  varying vec3 vNormal;
  varying float vHeight;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(0.4, 0.8, 0.6));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);

    float diff = max(dot(normal, lightDir), 0.0);
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uShininess);

    float t = clamp(vHeight * 0.5 + 0.5, 0.0, 1.0);
    vec3 base = mix(uColorDeep, uColorPeak, t);

    vec3 color = base * (0.35 + 0.65 * diff) + spec * 0.5;

    float vignette = smoothstep(1.1, 0.4, length(vUv - 0.5));
    color *= mix(0.85, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const useHero = (vantaRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const container = vantaRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1),
      alpha: false,
      antialias: false,
    });
    const gl = renderer.gl;
    gl.clearColor(0.024, 0.039, 0.094, 1.0);
    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const camera = new Camera(gl, { fov: 45, near: 0.1, far: 5000 });
    camera.position.set(0, 220, 420);
    camera.lookAt([0, 0, -100]);

    const scene = new Transform();

    const geometry = new Plane(gl, {
      width: 1400,
      height: 1000,
      widthSegments: 100,
      heightSegments: 80,
    });

    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      cullFace: null,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0, 0] },
        uWaveHeight: { value: 40.0 },
        uShininess: { value: 24.0 },
        uColorDeep: { value: [0.024, 0.039, 0.094] },
        uColorPeak: { value: [0.16, 0.38, 0.62] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.z = -200;
    mesh.setParent(scene);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((clientY - rect.top) / rect.height) * 2 - 1;
      mouseTarget.x = x;
      mouseTarget.y = -y;
    };
    const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    container.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    let raf = 0;
    let elapsed = 0;
    let last = performance.now();
    let inView = true;
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const renderFrame = () => {
      program.uniforms.uTime.value = elapsed;
      program.uniforms.uMouse.value = [mouseCurrent.x, mouseCurrent.y];
      renderer.render({ scene, camera });
    };

    const minFrameMs = 1000 / 30 - 3;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      const delta = now - last;
      if (delta < minFrameMs) return;
      elapsed += delta * 0.001;
      last = now;
      const smoothing = 1 - Math.exp(-delta * 0.003);
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * smoothing;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * smoothing;
      renderFrame();
    };

    const sync = () => {
      const shouldRun = inView && !document.hidden && !reduceMq.matches;
      if (shouldRun && raf === 0) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(container);
    const onVisibilityChange = () => sync();
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMq.addEventListener("change", sync);

    renderFrame();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMq.removeEventListener("change", sync);
      ro.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      if (gl.canvas.parentElement === container) {
        container.removeChild(gl.canvas);
      }
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, [vantaRef]);

  const scrollIndicatorVariants = useMemo(
    () => ({
      animate: { y: [0, 10, 0] },
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
    }),
    []
  );

  return { scrollIndicatorVariants };
};
