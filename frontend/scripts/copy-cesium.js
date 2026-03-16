const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../node_modules/cesium/Build');
const destDir = path.join(__dirname, '../public/cesium');

// Remove existing destination directory if it exists
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}

// Copy the entire Build directory
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

try {
  copyRecursive(srcDir, destDir);
  console.log('✓ Cesium Build files copied to public/cesium');
} catch (err) {
  console.error('✗ Failed to copy Cesium Build:', err.message);
  process.exit(1);
}
