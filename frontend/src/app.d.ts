// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};

// vite-imagetools module type declarations
// Wildcard '*' matches the full module id, so these catch all imports
// ending with &as=picture or &as=url regardless of other query params.
declare module '*&as=picture' {
  const value: {
    /** Key = image format (webp, jpeg, …); value = responsive srcset string */
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default value;
}

declare module '*?as=picture' {
  const value: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default value;
}

/** Single-image URL (e.g. ?w=200&format=webp&as=url) */
declare module '*&as=url' {
  const value: string;
  export default value;
}

declare module '*?as=url' {
  const value: string;
  export default value;
}

declare module '*.jpg?*as=picture' {
  const value: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default value;
}

declare module '*.jpg?*as=url' {
  const value: string;
  export default value;
}

// Fallback for arbitrary query-based image imports (e.g. '?w=...&format=...').
declare module '*.jpg?*' {
  const value: unknown;
  export default value;
}

declare module '*.jpeg?*' {
  const value: unknown;
  export default value;
}

declare module '*.png?*' {
  const value: unknown;
  export default value;
}

declare module '*.webp?*' {
  const value: unknown;
  export default value;
}
