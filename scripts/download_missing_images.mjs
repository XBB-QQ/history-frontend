/**
 * 补下载 clothingHistory.ts 中引用但未在 manifest.json 中的图片
 * 这些图片是手工挑选的、与 clothing_images.json 前 6 张不重叠的部分
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'clothing');
const MANIFEST_FILE = path.join(TARGET_DIR, 'manifest.json');
const SOURCE_FILE = path.join(ROOT, 'src', 'data', 'features', 'clothingHistory.ts');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
const existingUrls = new Set(manifest.items.map(i => i.originalUrl));

// 从 clothingHistory.ts 提取所有 Wikimedia URL
const source = fs.readFileSync(SOURCE_FILE, 'utf-8');
const urlRegex = /url:\s*'(https:\/\/upload\.wikimedia\.org[^']+)'/g;
const matches = [...source.matchAll(urlRegex)];

// 找出未下载的 URL
const missingUrls = [];
for (const m of matches) {
  const url = m[1];
  if (!existingUrls.has(url)) {
    missingUrls.push(url);
  }
}

console.log(`需补下载 ${missingUrls.length} 张图片`);

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function downloadWithRetry(url, destPath, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const resp = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'Referer': 'https://commons.wikimedia.org/',
        },
      });
      if (!resp.ok) {
        if (resp.status === 429) {
          const wait = 5000 * (i + 1);
          console.log(`    429, waiting ${wait}ms...`);
          await sleep(wait);
          continue;
        }
        throw new Error(`HTTP ${resp.status}`);
      }
      const buf = Buffer.from(await resp.arrayBuffer());
      fs.writeFileSync(destPath, buf);
      return buf.length;
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      console.log(`    Retry ${i + 1}: ${err.message}`);
      await sleep(3000);
    }
  }
}

function urlToFilename(url) {
  // 从 URL 中提取文件名部分
  // https://upload.wikimedia.org/wikipedia/commons/thumb/x/xx/Filename/960px-Filename
  // 或 https://upload.wikimedia.org/wikipedia/commons/x/xx/Filename
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split('/');
  // 最后一段（去掉 960px- 前缀如果有）
  let last = parts[parts.length - 1];
  last = last.replace(/^960px-/, '');
  // 如果是 thumbnail.jpg 这种特殊情况
  if (last === 'thumbnail.jpg') {
    last = parts[parts.length - 2].replace(/^960px-/, '') + '_thumb.jpg';
  }
  let name = decodeURIComponent(last).replace(/[^\w.-]/g, '_');
  if (name.length > 100) {
    const ext = path.extname(name);
    name = name.slice(0, 100 - ext.length) + ext;
  }
  return name;
}

async function main() {
  const newItems = [];
  let success = 0;
  let failed = 0;

  for (let i = 0; i < missingUrls.length; i++) {
    const url = missingUrls[i];
    const filename = `extra-${i}-${urlToFilename(url)}`;
    const destPath = path.join(TARGET_DIR, filename);
    const localPath = `/images/clothing/${filename}`;

    if (fs.existsSync(destPath)) {
      console.log(`  SKIP: ${filename}`);
      newItems.push({ originalUrl: url, localPath });
      success++;
      continue;
    }

    try {
      console.log(`[${i + 1}/${missingUrls.length}] Downloading: ${filename}`);
      const size = await downloadWithRetry(url, destPath);
      console.log(`  OK: ${(size / 1024).toFixed(1)} KB`);
      newItems.push({ originalUrl: url, localPath });
      success++;
    } catch (err) {
      console.log(`  FAIL: ${err.message}`);
      failed++;
    }
    // 间隔 1.5 秒
    await sleep(1500);
  }

  // 更新 manifest
  manifest.items.push(...newItems);
  manifest.success += success;
  manifest.failed += failed;
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(`\n=== Done ===`);
  console.log(`  Success: ${success}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Manifest updated: ${MANIFEST_FILE}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
