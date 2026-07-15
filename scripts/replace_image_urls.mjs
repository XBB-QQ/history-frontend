/**
 * 把 clothingHistory.ts 中的外部 Wikimedia URL 替换为本地路径
 * 数据来源：public/images/clothing/manifest.json
 *
 * 注意：clothingHistory.ts 中 yuan 朝代用了 6 张图，但 manifest.json 中 yuan 只有 5 张
 *      （因为 yuan-2 Өгөдэй хаан.jpg 下载失败）。脚本会对每张图检查是否在 manifest 中存在，
 *      不存在的图保持原样（仍指向 Wikimedia）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TARGET_FILE = path.join(ROOT, 'src', 'data', 'features', 'clothingHistory.ts');
const MANIFEST_FILE = path.join(ROOT, 'public', 'images', 'clothing', 'manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));

// 构建 originalUrl → localPath 映射
const urlMap = new Map();
for (const item of manifest.items) {
  urlMap.set(item.originalUrl, item.localPath);
}

console.log(`Manifest 加载完成，共 ${urlMap.size} 个映射`);

let content = fs.readFileSync(TARGET_FILE, 'utf-8');
let replacedCount = 0;
let notFoundCount = 0;

// 对每个映射做替换
for (const [originalUrl, localPath] of urlMap) {
  if (content.includes(originalUrl)) {
    content = content.split(originalUrl).join(localPath);
    replacedCount++;
  }
}

// 检查还有哪些 URL 没被替换（在代码中存在但不在 manifest 中）
const remainingUrls = content.match(/https:\/\/upload\.wikimedia\.org[^'"]+/g) || [];
notFoundCount = remainingUrls.length;

fs.writeFileSync(TARGET_FILE, content, 'utf-8');

console.log(`\n=== 替换完成 ===`);
console.log(`  替换: ${replacedCount} 个 URL`);
console.log(`  未替换（不在 manifest 中）: ${notFoundCount} 个`);
if (remainingUrls.length > 0) {
  console.log(`  未替换的 URL:`);
  remainingUrls.forEach(url => console.log(`    - ${url}`));
}
