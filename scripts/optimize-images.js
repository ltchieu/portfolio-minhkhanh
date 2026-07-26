import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = path.resolve(process.cwd(), 'assets/image/drive-download-20260722T121611Z-1-001');

async function getAllFiles(dir, fileList = []) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      await getAllFiles(res, fileList);
    } else {
      fileList.push(res);
    }
  }
  return fileList;
}

async function optimizeImages() {
  console.log(`Starting image optimization in: ${targetDir}`);
  const files = await getAllFiles(targetDir);
  
  const validExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.PNG'];
  let totalOriginal = 0;
  let totalOptimized = 0;
  let convertedCount = 0;

  for (const filePath of files) {
    const ext = path.extname(filePath);
    const basename = path.basename(filePath);

    // Skip avatar.JPG as requested by user
    if (basename.toLowerCase() === 'avatar.jpg') {
      console.log(`Skipping: ${basename} (Excluded by user)`);
      continue;
    }

    if (!validExtensions.includes(ext)) {
      continue;
    }

    const outputFilePath = filePath.substring(0, filePath.length - ext.length) + '.webp';

    try {
      const stats = await fs.promises.stat(filePath);
      totalOriginal += stats.size;

      const image = sharp(filePath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width > 1920 || metadata.height > 1920) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? 1920 : null,
          height: metadata.height >= metadata.width ? 1920 : null,
          withoutEnlargement: true,
          fit: 'inside'
        });
      }

      await pipeline.webp({ quality: 82 }).toFile(outputFilePath + '.tmp');

      // Replace or move
      await fs.promises.rename(outputFilePath + '.tmp', outputFilePath);

      // Remove old non-webp file if extension was different
      if (filePath !== outputFilePath) {
        await fs.promises.unlink(filePath);
      }

      const newStats = await fs.promises.stat(outputFilePath);
      totalOptimized += newStats.size;
      convertedCount++;

      const origMB = (stats.size / (1024 * 1024)).toFixed(2);
      const newMB = (newStats.size / (1024 * 1024)).toFixed(2);
      console.log(`[${convertedCount}] Converted ${basename} (${origMB} MB -> ${newMB} MB)`);
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
      // Clean up tmp file if error
      if (fs.existsSync(outputFilePath + '.tmp')) {
        await fs.promises.unlink(outputFilePath + '.tmp').catch(() => {});
      }
    }
  }

  const origTotalMB = (totalOriginal / (1024 * 1024)).toFixed(2);
  const optTotalMB = (totalOptimized / (1024 * 1024)).toFixed(2);
  const savings = (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1);

  console.log('\n========================================');
  console.log(`Optimization Complete!`);
  console.log(`Converted Images: ${convertedCount}`);
  console.log(`Original Size:  ${origTotalMB} MB`);
  console.log(`Optimized Size: ${optTotalMB} MB`);
  console.log(`Total Saved:    ${savings}% reduction`);
  console.log('========================================\n');
}

optimizeImages();
