// Centralized image imports (vite-imagetools)
// Keeps optimization settings in one place.

// @ts-expect-error Vite imagetools query import
export { default as linesBg } from '$lib/assets/bg/lines.png?format=webp&as=url';

// @ts-expect-error Vite imagetools query import
export { default as peaceBg } from '$lib/assets/bg/peace.png?w=1600&format=webp&as=url';

// @ts-expect-error Vite imagetools query import
export { default as nataliaPicture } from '$lib/assets/people/Natalia_Sukhachova.jpg?w=480;768;1024&format=webp;avif&as=picture';
