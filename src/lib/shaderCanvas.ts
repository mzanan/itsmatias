import { Renderer, Program, Mesh, Triangle } from "ogl";
import { SHADER_VERTEX } from "@/lib/shaders";

type MountOptions = {
  maxDpr?: number;
  fps?: number;
};

const FADE_IN_MS = 700;

export const mountShader = (
  container: HTMLElement,
  fragment: string,
  { maxDpr = 1, fps = 30 }: MountOptions = {}
): (() => void) => {
  const renderer = new Renderer({
    dpr: Math.min(window.devicePixelRatio, maxDpr),
    alpha: false,
    antialias: false,
  });
  const gl = renderer.gl;
  gl.clearColor(0.02, 0.025, 0.045, 1);
  Object.assign(gl.canvas.style, {
    width: "100%",
    height: "100%",
    display: "block",
    opacity: "0",
    transition: `opacity ${FADE_IN_MS}ms ease-out`,
  });
  container.appendChild(gl.canvas);

  const program = new Program(gl, {
    vertex: SHADER_VERTEX,
    fragment,
    uniforms: {
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uMouse: { value: [0, 0] },
    },
  });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h);
    program.uniforms.uAspect.value = w / h;
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const mouseTarget = { x: 0, y: 0 };
  const mouseCurrent = { x: 0, y: 0 };
  const onPointerMove = (e: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    mouseTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseTarget.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const minFrameMs = 1000 / fps - 3;
  let raf = 0;
  let elapsed = 0;
  let last = performance.now();
  let inView = true;
  const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

  const renderFrame = () => {
    program.uniforms.uTime.value = elapsed;
    program.uniforms.uMouse.value = [mouseCurrent.x, mouseCurrent.y];
    renderer.render({ scene: mesh });
  };

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
  document.addEventListener("visibilitychange", sync);
  reduceMq.addEventListener("change", sync);

  renderFrame();
  const fadeRaf = requestAnimationFrame(() => {
    gl.canvas.style.opacity = "1";
  });
  sync();

  return () => {
    cancelAnimationFrame(raf);
    cancelAnimationFrame(fadeRaf);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", sync);
    reduceMq.removeEventListener("change", sync);
    window.removeEventListener("pointermove", onPointerMove);
    if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
};
