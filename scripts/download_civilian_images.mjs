/**
 * 下载平民/民间服饰图片脚本（等网络恢复后运行）
 *
 * 数据来源：clothing_images.json 中已抓取但未下载的平民相关图片
 * 涵盖：清明上河图（宋代市井）、元代乐舞砖俑、北魏女乐俑等
 *
 * 用法：node scripts/download_civilian_images.mjs
 * 运行后需手动执行替换脚本更新 clothingHistory.ts 中的引用
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'clothing');
const MANIFEST_FILE = path.join(TARGET_DIR, 'manifest.json');

// 平民/民间服饰图片清单（来自 clothing_images.json）
const CIVILIAN_IMAGES = [
  // ===== 宋代：清明上河图（反映市井平民生活）=====
  {
    dynasty: 'song',
    filename: 'civ-song-qingming-1.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Along_the_River_During_the_Qingming_Festival_%28Qing_Court_Version%29.jpg/960px-Along_the_River_During_the_Qingming_Festival_%28Qing_Court_Version%29.jpg',
    caption: '清明上河图·局部（清院本，反映宋代市井百姓服饰全貌）',
    license: 'Public domain',
  },
  {
    dynasty: 'song',
    filename: 'civ-song-qingming-2.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Along_the_River_During_the_Qingming_Festival_%28Qing_Court_Version%29_2.jpg/960px-Along_the_River_During_the_Qingming_Festival_%28Qing_Court_Version%29_2.jpg',
    caption: '清明上河图·局部二（清院本，反映宋代商贩与劳动百姓服饰）',
    license: 'CC BY-SA 4.0',
  },
  {
    dynasty: 'song',
    filename: 'civ-song-lisung.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Li_Sung_001.jpg',
    caption: '李嵩画作（反映宋代市井生活与平民服饰）',
    license: 'Public domain',
  },

  // ===== 元代：乐舞砖俑（反映民间艺人服饰）=====
  {
    dynasty: 'yuan',
    filename: 'civ-yuan-musician-clappers.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/20260515_Carved_Brick_Figurine_of_a_Musician_Playing_the_Clappers.jpg/960px-20260515_Carved_Brick_Figurine_of_a_Musician_Playing_the_Clappers.jpg',
    caption: '元代乐舞砖俑·拍板乐人（反映民间艺人服饰）',
    license: 'CC BY-SA 4.0',
  },
  {
    dynasty: 'yuan',
    filename: 'civ-yuan-musician-panpipes.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/20260515_Carved_Brick_Figurine_of_a_Musician_Playing_the_Panpipes.jpg/960px-20260515_Carved_Brick_Figurine_of_a_Musician_Playing_the_Panpipes.jpg',
    caption: '元代乐舞砖俑·排箫乐人（反映民间艺人头巾与短袍）',
    license: 'CC BY-SA 4.0',
  },
  {
    dynasty: 'yuan',
    filename: 'civ-yuan-drum-dancer.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/20260515_Carved_Brick_Figurine_of_a_Drum_Dancer.jpg/960px-20260515_Carved_Brick_Figurine_of_a_Drum_Dancer.jpg',
    caption: '元代乐舞砖俑·鼓舞人（反映民间舞蹈服饰）',
    license: 'CC BY-SA 4.0',
  },
  {
    dynasty: 'yuan',
    filename: 'civ-yuan-musician-zither.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/20260515_Carved_Brick_Figurine_of_a_Musician_Playing_the_Three-String_Zither.jpg/960px-20260515_Carved_Brick_Figurine_of_a_Musician_Playing_the_Three-String_Zither.jpg',
    caption: '元代乐舞砖俑·三弦乐人（反映民间乐人巾帽与袍服）',
    license: 'CC BY-SA 4.0',
  },

  // ===== 魏晋：北魏女乐俑（反映民间女性服饰）=====
  {
    dynasty: 'wei-jin',
    filename: 'civ-weijin-female-musician-02.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Northern_Wei_Painted_Pottery_Female_Musician_02.jpg/960px-Northern_Wei_Painted_Pottery_Female_Musician_02.jpg',
    caption: '北魏彩绘女乐俑（反映北方民间女性襦裙与发髻）',
    license: 'CC0',
  },
  {
    dynasty: 'wei-jin',
    filename: 'civ-weijin-female-musician-05.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Northern_Wei_Painted_Pottery_Female_Musician_05.jpg/960px-Northern_Wei_Painted_Pottery_Female_Musician_05.jpg',
    caption: '北魏彩绘女乐俑（反映民间乐人服饰细节）',
    license: 'CC0',
  },
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

/**
 * 校验图片 buffer 是否有效
 */
function isValidImage(buf) {
  if (!buf || buf.length < 5000) {
    return { ok: false, reason: `size too small: ${buf ? buf.length : 0} bytes` };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { ok: true, reason: 'JPEG' };
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return { ok: true, reason: 'PNG' };
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return { ok: true, reason: 'GIF' };
  return { ok: false, reason: `bad magic: ${buf[0].toString(16)} ${buf[1].toString(16)} ${buf[2].toString(16)}` };
}

async function downloadWithRetry(url, destPath, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      // 用 curl.exe 下载（比 Node.js fetch 更可靠，DNS/SSL 兼容性更好）
      const args = [
        '-s', '-L',
        '--max-time', '60',
        '-o', destPath,
        '-w', '%{http_code}',
        '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        '-H', 'Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        '-H', 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8',
        '-H', 'Referer: https://commons.wikimedia.org/',
        url,
      ];
      const httpCode = execFileSync('curl.exe', args, { encoding: 'utf-8', timeout: 90000 }).trim();

      if (httpCode !== '200') {
        throw new Error(`HTTP ${httpCode}`);
      }

      const buf = fs.readFileSync(destPath);
      const validation = isValidImage(buf);
      if (!validation.ok) {
        console.log(`    Invalid: ${validation.reason}, retrying...`);
        fs.unlinkSync(destPath);
        await sleep(3000);
        continue;
      }
      return { size: buf.length, type: validation.reason };
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      console.log(`    Retry ${i + 1}: ${err.message}`);
      await sleep(5000);
    }
  }
  throw new Error('Max retries exceeded');
}

async function main() {
  console.log('=== 下载平民服饰图片 ===');
  console.log(`目标目录: ${TARGET_DIR}`);
  console.log(`待下载: ${CIVILIAN_IMAGES.length} 个文件\n`);

  // 先测试网络连通性（用 curl.exe，比 Node.js fetch 更可靠）
  console.log('测试网络连通性...');
  try {
    const httpCode = execFileSync('curl.exe', [
      '-s', '-o', 'NUL', '-w', '%{http_code}',
      '--max-time', '15',
      'https://upload.wikimedia.org/',
    ], { encoding: 'utf-8', timeout: 20000 }).trim();
    console.log(`网络连通: HTTP ${httpCode}\n`);
  } catch (err) {
    console.log(`网络不通: ${err.message}`);
    console.log('请等网络恢复后重新运行此脚本。');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
  const successList = [];
  const failedList = [];

  for (let i = 0; i < CIVILIAN_IMAGES.length; i++) {
    const img = CIVILIAN_IMAGES[i];
    const destPath = path.join(TARGET_DIR, img.filename);
    const localPath = `/images/clothing/${img.filename}`;

    console.log(`[${i + 1}/${CIVILIAN_IMAGES.length}] ${img.filename} (${img.dynasty})`);

    if (fs.existsSync(destPath)) {
      const stat = fs.statSync(destPath);
      if (stat.size > 5000) {
        console.log(`  SKIP (already exists, ${stat.size} bytes)`);
        successList.push({ ...img, localPath, size: stat.size });
        continue;
      }
    }

    try {
      const result = await downloadWithRetry(img.originalUrl, destPath);
      console.log(`  OK: ${(result.size / 1024).toFixed(1)} KB (${result.type})`);
      successList.push({ ...img, localPath, size: result.size });
    } catch (err) {
      console.log(`  FAIL: ${err.message}`);
      failedList.push({ ...img, reason: err.message });
    }
    if (i < CIVILIAN_IMAGES.length - 1) {
      await sleep(3000);
    }
  }

  // 更新 manifest
  const newItems = successList.map(s => ({
    dynasty: s.dynasty,
    originalUrl: s.originalUrl,
    localPath: s.localPath,
    caption: s.caption,
    license: s.license,
  }));
  manifest.items.push(...newItems);
  manifest.success += successList.length;
  manifest.failed += failedList.length;
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log('\n=== 完成 ===');
  console.log(`成功: ${successList.length}`);
  console.log(`失败: ${failedList.length}`);

  if (successList.length > 0) {
    console.log('\n已下载的平民图片:');
    for (const s of successList) {
      console.log(`  [${s.dynasty}] ${s.filename}`);
      console.log(`    ${s.caption}`);
    }
    console.log('\n下一步: 运行 node scripts/replace_civilian_urls.mjs 替换 clothingHistory.ts 中的帝王画像引用');
  }

  if (failedList.length > 0) {
    console.log('\n失败列表:');
    for (const f of failedList) {
      console.log(`  ${f.filename}: ${f.reason}`);
    }
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
