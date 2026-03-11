import adapter from '@sveltejs/adapter-static';

const isGitHubPagesBuild =
  process.env.GITHUB_ACTIONS === 'true';
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath =
  isGitHubPagesBuild && repositoryName
    ? `/${repositoryName}`
    : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: true,
  },
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
    }),
    paths: {
      base: basePath,
    },
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
      // $root: 'frontend',
    },
  },
};

export default config;
