import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $shared: 'src/lib/shared',
      $entities: 'src/lib/entities',
      $features: 'src/lib/features',
      $widgets: 'src/lib/widgets',
      $processes: 'src/lib/processes',
      $pages: 'src/lib/pages',
      $core: 'src/lib/app',
      $server: 'src/lib/server',
      $styles: 'src/lib/app/styles',
      $static: 'frontend/static',
    },
  },
};

export default config;
