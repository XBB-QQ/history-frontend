/**
 * 批量下载服饰图片到本地 public/images/clothing/ 目录
 * 数据来源：scripts/clothing_images.json + clothingHistory.ts 中精选的图片
 * 解决浏览器无法直接访问 upload.wikimedia.org 的问题
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'clothing');

// 从 clothingHistory.ts 提取的精选图片 URL（与数据文件中的 images 数组对应）
// 用 clothing_images.json 里的 thumbUrl（960px 宽，平衡清晰度和文件大小）
const IMAGES_DATA = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'clothing_images.json'), 'utf-8')
);

// 仅下载 clothingHistory.ts 中实际使用的图片（每个朝代前 6 张）
const DYNASTY_KEYS = Object.keys(IMAGES_DATA);
const totalCount = DYNASTY_KEYS.reduce(
  (acc, k) => acc + Math.min(6, IMAGES_DATA[k].length),
  0
);

console.log(`总计需要下载 ${totalCount} 张图片`);

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function downloadWithRetry(url, destPath, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const resp = await fetch(url, {
        headers: {
          // Wikimedia 要求 User-Agent 包含产品名和联系方式，但更完整的浏览器 UA 也能通过
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'Referer': 'https://commons.wikimedia.org/',
        },
      });
      if (!resp.ok) {
        if (resp.status === 429) {
          const wait = 3000 * (i + 1);
          console.log(`    429 rate limited, waiting ${wait}ms...`);
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
      await sleep(2000);
    }
  }
}

// 从 URL 提取文件名（去掉 query string 并简化）
function urlToFilename(dynasty, idx, url) {
  // 取 URL 最后一段作为基础名
  const lastPart = url.split('/').pop() || `image-${idx}`;
  // 截断过长的文件名（Windows 路径长度限制）
  let name = decodeURIComponent(lastPart).replace(/[^\w.-]/g, '_');
  if (name.length > 80) {
    const ext = path.extname(name);
    name = name.slice(0, 80 - ext.length) + ext;
  }
  return `${dynasty}-${idx}-${name}`;
}

// 朝代 → 路径前缀映射
async function main() {
  const manifest = [];
  let success = 0;
  let failed = 0;

  for (const dynasty of DYNASTY_KEYS) {
    console.log(`\n=== ${dynasty} ===`);
    const items = IMAGES_DATA[dynasty].slice(0, 6); // 每个朝代前 6 张
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const filename = urlToFilename(dynasty, i, item.thumbUrl);
      const destPath = path.join(TARGET_DIR, filename);
      const localPath = `/images/clothing/${filename}`;

      // 已存在则跳过
      if (fs.existsSync(destPath)) {
        const stat = fs.statSync(destPath);
        console.log(`  SKIP: ${filename} (already exists, ${stat.size} bytes)`);
        manifest.push({
          dynasty,
          index: i,
          originalUrl: item.thumbUrl,
          localPath,
          caption: item.file.replace('File:', ''),
          license: item.license,
        });
        success++;
        continue;
      }

      try {
        console.log(`  Downloading: ${filename}`);
        const size = await downloadWithRetry(item.thumbUrl, destPath);
        console.log(`  OK: ${(size / 1024).toFixed(1)} KB`);
        manifest.push({
          dynasty,
          index: i,
          originalUrl: item.thumbUrl,
          localPath,
          caption: item.file.replace('File:', ''),
          license: item.license,
        });
        success++;
      } catch (err) {
        console.log(`  FAIL: ${err.message}`);
        failed++;
      }
      // 请求间隔 1 秒（避免 429）
      await sleep(1000);
    }
  }

  // 写入 manifest 供查阅
  fs.writeFileSync(
    path.join(TARGET_DIR, 'manifest.json'),
    JSON.stringify({ success, failed, items: manifest }, null, 2),
    'utf-8'
  );

  console.log(`\n=== Done ===`);
  console.log(`  Success: ${success}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Output: ${TARGET_DIR}`);
  console.log(`  Manifest: ${path.join(TARGET_DIR, 'manifest.json')}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
