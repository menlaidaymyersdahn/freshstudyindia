import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const archiverModule = require('archiver');

function createZipArchive(options = { zlib: { level: 9 } }) {
  if (typeof archiverModule === 'function') {
    return archiverModule('zip', options);
  }
  if (archiverModule.ZipArchive) {
    return new archiverModule.ZipArchive(options);
  }
  if (archiverModule.default && typeof archiverModule.default === 'function') {
    return archiverModule.default('zip', options);
  }
  throw new Error('Could not instantiate zip archiver.');
}

const themeDir = path.join(process.cwd(), 'wordpress-theme', 'myers-global-pathways');
const outputZip = path.join(process.cwd(), 'public', 'myers-global-pathways-theme.zip');

console.log('Packaging WordPress Theme from:', themeDir);
console.log('Target ZIP path:', outputZip);

const output = fs.createWriteStream(outputZip);
const archive = createZipArchive();

output.on('close', function() {
  console.log(`Successfully generated WordPress Theme ZIP: ${archive.pointer()} total bytes.`);
});

archive.on('error', function(err) {
  console.error('Packaging error:', err);
  process.exit(1);
});

archive.pipe(output);
archive.directory(themeDir, 'myers-global-pathways');
archive.finalize();
