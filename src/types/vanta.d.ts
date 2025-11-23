declare module "vanta/dist/vanta.waves.min" {
  export interface VANTAWAVES {
    el: string | HTMLElement;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    shininess?: number;
    waveHeight?: number;
    zoom?: number;
    destroy: () => void;
  }

  export interface VANTA {
    WAVES: (options: VANTAWAVES) => VANTAWAVES;
  }

  const VANTA: VANTA;
  export default VANTA;
}

