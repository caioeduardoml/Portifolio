declare module 'three' {
  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
  }

  export class Euler {
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  export class Color {
    constructor(color?: string | number);
    set(color: string | number): this;
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
  }

  export class Scene extends Object3D {
    constructor();
  }

  export class Group extends Object3D {
    constructor();
  }

  export class PerspectiveCamera extends Object3D {
    aspect: number;
    constructor(fov?: number, aspect?: number, near?: number, far?: number);
    updateProjectionMatrix(): void;
    lookAt(x: number, y: number, z: number): void;
  }

  export interface WebGLRendererParameters {
    canvas?: HTMLCanvasElement;
    alpha?: boolean;
    antialias?: boolean;
    powerPreference?: 'default' | 'high-performance' | 'low-power';
  }

  export class WebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(parameters?: WebGLRendererParameters);
    setSize(width: number, height: number, updateStyle?: boolean): void;
    setPixelRatio(value: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    dispose(): void;
  }

  export class BufferAttribute {
    constructor(array: Float32Array, itemSize: number);
  }

  export class Float32BufferAttribute extends BufferAttribute {
    constructor(array: Float32Array | number[], itemSize: number);
  }

  export class BufferGeometry {
    constructor();
    setAttribute(name: string, attribute: BufferAttribute): this;
    dispose(): void;
  }

  export class IcosahedronGeometry extends BufferGeometry {
    constructor(radius?: number, detail?: number);
  }

  export class OctahedronGeometry extends BufferGeometry {
    constructor(radius?: number, detail?: number);
  }

  export class TorusGeometry extends BufferGeometry {
    constructor(
      radius?: number,
      tube?: number,
      radialSegments?: number,
      tubularSegments?: number
    );
  }

  export class EdgesGeometry extends BufferGeometry {
    constructor(geometry: BufferGeometry, thresholdAngle?: number);
  }

  export class Material {
    opacity: number;
    transparent: boolean;
    dispose(): void;
  }

  export interface MeshBasicMaterialParameters {
    color?: number | string;
    wireframe?: boolean;
    transparent?: boolean;
    opacity?: number;
  }

  export class MeshBasicMaterial extends Material {
    color: Color;
    wireframe: boolean;
    constructor(parameters?: MeshBasicMaterialParameters);
  }

  export interface MeshStandardMaterialParameters {
    color?: number | string;
    emissive?: number | string;
    emissiveIntensity?: number;
    metalness?: number;
    roughness?: number;
    wireframe?: boolean;
    transparent?: boolean;
    opacity?: number;
  }

  export class MeshStandardMaterial extends Material {
    color: Color;
    emissive: Color;
    emissiveIntensity: number;
    constructor(parameters?: MeshStandardMaterialParameters);
  }

  export interface LineBasicMaterialParameters {
    color?: number | string;
    transparent?: boolean;
    opacity?: number;
  }

  export class LineBasicMaterial extends Material {
    color: Color;
    constructor(parameters?: LineBasicMaterialParameters);
  }

  export interface PointsMaterialParameters {
    color?: number | string;
    size?: number;
    transparent?: boolean;
    opacity?: number;
    sizeAttenuation?: boolean;
  }

  export class PointsMaterial extends Material {
    color: Color;
    size: number;
    constructor(parameters?: PointsMaterialParameters);
  }

  export class Mesh extends Object3D {
    geometry: BufferGeometry;
    material: Material;
    constructor(geometry?: BufferGeometry, material?: Material);
  }

  export class LineSegments extends Object3D {
    geometry: BufferGeometry;
    material: Material;
    constructor(geometry?: BufferGeometry, material?: Material);
  }

  export class Points extends Object3D {
    geometry: BufferGeometry;
    material: PointsMaterial;
    constructor(geometry?: BufferGeometry, material?: PointsMaterial);
  }

  export class AmbientLight extends Object3D {
    intensity: number;
    color: Color;
    constructor(color?: number | string, intensity?: number);
  }

  export class PointLight extends Object3D {
    intensity: number;
    color: Color;
    constructor(color?: number | string, intensity?: number, distance?: number);
  }

  export class DirectionalLight extends Object3D {
    intensity: number;
    color: Color;
    constructor(color?: number | string, intensity?: number);
  }
}
