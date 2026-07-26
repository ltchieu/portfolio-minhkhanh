import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const baseDir = path.resolve(process.cwd(), 'assets/image/Activities');

async function processFolder(dirPath) {
  console.log(`Processing folder: ${dirPath}`);
  const items = await fs.promises.readdir(dirPath, { withFileTypes: true });

  const subfolders = items.filter(item => item.isDirectory()).map(item => path.join(dirPath, item.name));
  for (const subfolder of subfolders) {
    await processFolder(subfolder);
  }

  // Get image files in current folder
  const validExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.PNG', '.webp', '.WEBP'];
  const imageFiles = items
    .filter(item => !item.isDirectory() && validExtensions.includes(path.extname(item.name)))
    .map(item => path.join(dirPath, item.name));

  if (imageFiles.length === 0) return;

  console.log(`  Found ${imageFiles.length} image files in ${path.basename(dirPath)}`);

  // Target count per folder: 10 to 15 main images
  let selectedFiles = [];
  if (imageFiles.length <= 15) {
    selectedFiles = imageFiles;
  } else {
    // Pick ~12 evenly spaced images across the folder
    const targetCount = 12;
    const step = (imageFiles.length - 1) / (targetCount - 1);
    for (let i = 0; i < targetCount; i++) {
      const index = Math.round(i * step);
      if (imageFiles[index] && !selectedFiles.includes(imageFiles[index])) {
        selectedFiles.push(imageFiles[index]);
      }
    }
  }

  console.log(`  Selected ${selectedFiles.length} main images to keep and convert.`);

  // Delete non-selected images
  for (const file of imageFiles) {
    if (!selectedFiles.includes(file)) {
      await fs.promises.unlink(file).catch(err => console.error(`Failed to delete ${file}:`, err.message));
    }
  }

  // Convert selected files to webp and delete original non-webp files
  for (const file of selectedFiles) {
    const ext = path.extname(file);
    const outputWebpPath = file.substring(0, file.length - ext.length) + '.webp';

    try {
      if (ext.toLowerCase() === '.webp') {
        continue;
      }

      const image = sharp(file);
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

      await pipeline.webp({ quality: 82 }).toFile(outputWebpPath + '.tmp');
      await fs.promises.rename(outputWebpPath + '.tmp', outputWebpPath);

      if (file !== outputWebpPath) {
        await fs.promises.unlink(file);
      }

      console.log(`    Converted -> ${path.basename(outputWebpPath)}`);
    } catch (err) {
      console.error(`    Error converting ${path.basename(file)}:`, err.message);
      if (fs.existsSync(outputWebpPath + '.tmp')) {
        await fs.promises.unlink(outputWebpPath + '.tmp').catch(() => {});
      }
    }
  }
}

async function run() {
  console.log('=== Starting Activity Image Processing & WebP Conversion ===');
  await processFolder(baseDir);
  console.log('=== Activity Image Processing Completed! ===');
}

run();
