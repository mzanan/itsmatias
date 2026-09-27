export type ShaderId = "hero" | "plasma" | "metaballs" | "aurora" | "raymarch";

export type LabShader = {
  id: Exclude<ShaderId, "hero">;
  name: string;
  note: string;
};

export const SHADER_VERTEX = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const HEADER = `
  precision highp float;
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uMouse;
  varying vec2 vUv;
`;

const NOISE = `
  float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash2(i);
    float b = hash2(i + vec2(1.0, 0.0));
    float c = hash2(i + vec2(0.0, 1.0));
    float d = hash2(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise2(p);
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }
`;

const hero = `${HEADER}${NOISE}
  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    float t = uTime * 0.05;
    vec2 m = uMouse * 0.15;
    vec2 warp = vec2(fbm(p * 2.2 + t + m), fbm(p * 2.2 + vec2(5.2, 1.3) - t - m));
    float n = fbm(p * 2.8 + warp * 1.8);
    vec3 deep = vec3(0.02, 0.025, 0.045);
    vec3 mid = vec3(0.10, 0.14, 0.26);
    vec3 peak = vec3(0.62, 0.68, 0.82);
    vec3 color = mix(deep, mid, smoothstep(0.25, 0.65, n));
    color = mix(color, peak, smoothstep(0.62, 0.95, n) * 0.55);
    float fade = smoothstep(0.0, 0.55, vUv.y);
    gl_FragColor = vec4(color * mix(0.35, 1.0, fade), 1.0);
  }
`;

const plasma = `${HEADER}
  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y) * 6.0;
    float t = uTime * 0.6;
    float v = sin(p.x + t);
    v += sin(p.y * 0.9 + t * 0.7);
    v += sin((p.x + p.y) * 0.7 + t * 0.4);
    v += sin(length(p - vec2(3.0, 2.0) - uMouse) * 1.2 - t);
    float n = v * 0.25 * 3.14159;
    vec3 color = vec3(0.5 + 0.5 * sin(n), 0.5 + 0.5 * sin(n + 2.09), 0.5 + 0.5 * sin(n + 4.19));
    gl_FragColor = vec4(color * 0.75, 1.0);
  }
`;

const metaballs = `${HEADER}
  void main() {
    vec2 p = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5);
    float t = uTime * 0.35;
    float field = 0.0;
    for (int i = 0; i < 7; i++) {
      float fi = float(i);
      vec2 c = vec2(sin(t * (0.6 + fi * 0.11) + fi * 2.1) * 0.42, cos(t * (0.5 + fi * 0.13) + fi * 1.7) * 0.32);
      vec2 d = p - c;
      field += 0.02 / (dot(d, d) + 0.004);
    }
    vec2 dm = p - uMouse * vec2(0.5 * uAspect, 0.5);
    field += 0.02 / (dot(dm, dm) + 0.004);
    float m = smoothstep(0.9, 1.9, field);
    vec3 base = vec3(0.04, 0.05, 0.12);
    vec3 ink = mix(vec3(0.20, 0.55, 0.95), vec3(0.65, 0.25, 0.85), clamp(p.x + 0.5, 0.0, 1.0));
    gl_FragColor = vec4(mix(base, ink, m), 1.0);
  }
`;

const aurora = `${HEADER}${NOISE}
  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    float t = uTime * 0.15;
    vec3 color = vec3(0.02, 0.03, 0.09);
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      float band = 0.25 + fi * 0.16 + uMouse.y * 0.04;
      float wobble = noise2(vec2(p.x * 1.6 + fi * 4.0, t + fi)) - 0.5;
      float d = abs(p.y - band - wobble * 0.35);
      float glow = 0.035 / (d + 0.035);
      vec3 hue = mix(vec3(0.15, 0.75, 0.55), vec3(0.45, 0.28, 0.90), fi / 3.0);
      color += hue * glow * 0.35;
    }
    gl_FragColor = vec4(color, 1.0);
  }
`;

const raymarch = `${HEADER}
  float map(vec3 p, float t) {
    float d = 100000.0;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec3 c = vec3(sin(t * 0.7 + fi * 1.9) * 1.1, cos(t * 0.6 + fi * 2.3) * 0.8, sin(t * 0.5 + fi * 1.3) * 1.1);
      d = min(d, length(p - c) - 0.55);
    }
    return d;
  }
  void main() {
    vec2 ndc = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5) * 2.0;
    vec3 ro = vec3(uMouse.x * 0.6, uMouse.y * 0.4, -4.0);
    vec3 rd = normalize(vec3(ndc, 1.6));
    float t = uTime * 0.5;
    float dist = 0.0;
    float hit = 0.0;
    for (int i = 0; i < 64; i++) {
      float d = map(ro + rd * dist, t);
      if (d < 0.002) {
        hit = 1.0;
        break;
      }
      dist += d;
      if (dist > 12.0) break;
    }
    float glow = 1.0 - clamp(dist / 12.0, 0.0, 1.0);
    vec3 base = vec3(0.03, 0.04, 0.10);
    vec3 ink = mix(vec3(0.25, 0.60, 0.95), vec3(0.70, 0.30, 0.90), glow);
    gl_FragColor = vec4(mix(base, ink, clamp(hit * 0.9 + glow * 0.15, 0.0, 1.0)), 1.0);
  }
`;

export const SHADER_FRAGMENTS: Record<ShaderId, string> = {
  hero,
  plasma,
  metaballs,
  aurora,
  raymarch,
};

export const LAB_SHADERS: LabShader[] = [
  {
    id: "aurora",
    name: "Aurora",
    note: "Four noise-driven ribbons of light. Cheap enough to sit behind a hero.",
  },
  {
    id: "metaballs",
    name: "Metaballs",
    note: "Seven liquid blobs solved per pixel. Your pointer is the eighth.",
  },
  {
    id: "plasma",
    name: "Plasma",
    note: "Four sine fields interfering. The classic demo look, almost free to render.",
  },
  {
    id: "raymarch",
    name: "Raymarch",
    note: "A 3D scene traced 64 steps per pixel. The point where a background stops being free.",
  },
];

export const LAB_REPO_URL =
  "https://github.com/mzanan/labs/tree/main/p4-shader-page-cost";
