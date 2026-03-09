import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const featuresDir = path.join(
  root,
  'src',
  'lib',
  'features'
);
const widgetsDir = path.join(root, 'src', 'lib', 'widgets');

function isCamelCase(name) {
  return /^[a-z][A-Za-z0-9]*$/.test(name);
}

async function listDirs(dir) {
  try {
    const entries = await readdir(dir);
    const dirs = [];
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const info = await stat(full);
      if (info.isDirectory())
        dirs.push({ name: entry, full });
    }
    return dirs;
  } catch {
    return [];
  }
}

async function listFilesRecursively(dir, acc = []) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return acc;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry);
    const info = await stat(full);
    if (info.isDirectory()) {
      await listFilesRecursively(full, acc);
      continue;
    }
    if (/\.(ts|js|svelte)$/.test(entry)) acc.push(full);
  }
  return acc;
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

async function checkFeatureFolderNames() {
  const dirs = await listDirs(featuresDir);
  const errors = [];
  for (const dir of dirs) {
    if (!isCamelCase(dir.name)) {
      errors.push(
        `Feature folder must be camelCase: src/lib/features/${dir.name}`
      );
    }
  }
  return errors;
}

async function checkWidgetsImportRules() {
  const files = await listFilesRecursively(widgetsDir);
  const errors = [];
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const importLines = content
      .split('\n')
      .filter(
        (line) =>
          line.includes('import') || line.includes('from ')
      );

    for (const line of importLines) {
      const forbidden =
        line.includes("'$features") ||
        line.includes('"$features') ||
        line.includes('/features/');

      if (forbidden) {
        errors.push(
          `widgets cannot import features: ${toPosix(path.relative(root, file))}`
        );
        break;
      }
    }
  }
  return errors;
}

async function run() {
  const errors = [
    ...(await checkFeatureFolderNames()),
    ...(await checkWidgetsImportRules()),
  ];

  if (errors.length === 0) {
    console.log('Architecture checks passed.');
    return;
  }

  console.error('Architecture checks failed:');
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  process.exit(1);
}

await run();
