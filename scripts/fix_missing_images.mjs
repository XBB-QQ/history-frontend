/**
 * 修复脚本：重新下载 clothingHistory.ts 引用但磁盘上缺失的 11 个图片
 *
 * 关键改进（针对之前 NaN KB 假成功问题）：
 * 1. 下载后严格校验：buf.length > 5000 字节
 * 2. 校验 JPEG 魔数 FF D8 FF 或 PNG 魔数 89 50 4E 47
 * 3. 校验失败则不写入文件，避免空文件假成功
 * 4. 请求间隔 3 秒，429 退避 10-30 秒
 * 5. 最多重试 5 次
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'clothing');

// 11 个缺失文件的 localPath → originalUrl 映射（来自 manifest.json）
const MISSING_FILES = [
  {
    localPath: '/images/clothing/qin-han-3-960px-Dahuting_Eastern_Han_Tombs_Mural_-_5.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Dahuting_Eastern_Han_Tombs_Mural_-_5.jpg/960px-Dahuting_Eastern_Han_Tombs_Mural_-_5.jpg',
  },
  {
    localPath: '/images/clothing/qin-han-5-960px-Dahuting_Eastern_Han_Tombs_Mural_-_30.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Dahuting_Eastern_Han_Tombs_Mural_-_30.jpg/960px-Dahuting_Eastern_Han_Tombs_Mural_-_30.jpg',
  },
  {
    localPath: '/images/clothing/extra-0-Seven_Sages_of_the_Bamboo_Grove_by_Honda_Tenj_.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Seven_Sages_of_the_Bamboo_Grove_by_Honda_Tenj%C5%8D.jpg',
  },
  {
    localPath: '/images/clothing/extra-5-Tang_Dynasty_woman_with_long_silk_sleeves.JPG',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Tang_Dynasty_woman_with_long_silk_sleeves.JPG',
  },
  {
    localPath: '/images/clothing/song-1-960px-Portrait_de_Song_Taizu.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Portrait_de_Song_Taizu.jpg/960px-Portrait_de_Song_Taizu.jpg',
  },
  {
    localPath: '/images/clothing/song-5-Song_court_lady.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Song_court_lady.jpg',
  },
  {
    localPath: '/images/clothing/extra-9-Dame_Guoguo_partant_faire_une_promenade___cheval__copie_par_Li_Gonglin.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Dame_Guoguo_partant_faire_une_promenade_%C3%A0_cheval%2C_copie_par_Li_Gonglin.jpg',
  },
  {
    localPath: '/images/clothing/extra-13-___________.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/%D3%A8%D0%B3%D3%A9%D0%B4%D1%8D%D0%B9_%D1%85%D0%B0%D0%B0%D0%BD.jpg',
  },
  {
    localPath: '/images/clothing/qing-0-960px-20241025_Dragon_Robe_of_Daoguang_Emperor__Qing_Dynasty_02.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/20241025_Dragon_Robe_of_Daoguang_Emperor%2C_Qing_Dynasty_02.jpg/960px-20241025_Dragon_Robe_of_Daoguang_Emperor%2C_Qing_Dynasty_02.jpg',
  },
  {
    localPath: '/images/clothing/qing-2-960px-Qing_Dragon_Robe_b.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Qing_Dragon_Robe_b.jpg/960px-Qing_Dragon_Robe_b.jpg',
  },
  {
    localPath: '/images/clothing/qing-4-960px-1913.158_-_Emperor_s_Jifu__Semiformal_Court_Robe_.jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/1913.158_-_Emperor%27s_Jifu_%28Semiformal_Court_Robe%29.jpg/960px-1913.158_-_Emperor%27s_Jifu_%28Semiformal_Court_Robe%29.jpg',
  },
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

/**
 * 校验图片 buffer 是否有效
 * - 长度 > 5000 字节
 * - JPEG 魔数 FF D8 FF，或 PNG 魔数 89 50 4E 47，或 GIF 魔数 47 49 46 38
 */
function isValidImage(buf) {
  if (!buf || buf.length < 5000) {
    return { ok: false, reason: `size too small: ${buf ? buf.length : 0} bytes` };
  }
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return { ok: true, reason: 'JPEG' };
  }
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return { ok: true, reason: 'PNG' };
  }
  // GIF
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) {
    return { ok: true, reason: 'GIF' };
  }
  return { ok: false, reason: `bad magic: ${buf[0].toString(16)} ${buf[1].toString(16)} ${buf[2].toString(16)}` };
}

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
          const wait = 10000 + 5000 * i; // 10s, 15s, 20s, 25s, 30s
          console.log(`    429, waiting ${wait}ms...`);
          await sleep(wait);
          continue;
        }
        throw new Error(`HTTP ${resp.status}`);
      }
      const buf = Buffer.from(await resp.arrayBuffer());
      const validation = isValidImage(buf);
      if (!validation.ok) {
        // 校验失败：不写入文件，直接重试
        console.log(`    Invalid: ${validation.reason}, retrying...`);
        await sleep(3000);
        continue;
      }
      // 校验通过：写入文件
      fs.writeFileSync(destPath, buf);
      return { size: buf.length, type: validation.reason };
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      console.log(`    Retry ${i + 1}: ${err.message}`);
      await sleep(3000);
    }
  }
  throw new Error('Max retries exceeded');
}

async function main() {
  console.log(`=== 修复缺失图片脚本 ===`);
  console.log(`目标目录: ${TARGET_DIR}`);
  console.log(`待下载: ${MISSING_FILES.length} 个文件\n`);

  const successList = [];
  const failedList = [];

  for (let i = 0; i < MISSING_FILES.length; i++) {
    const { localPath, originalUrl } = MISSING_FILES[i];
    const filename = path.basename(localPath);
    const destPath = path.join(TARGET_DIR, filename);

    console.log(`[${i + 1}/${MISSING_FILES.length}] ${filename}`);

    // 如果文件已存在且有效，跳过
    if (fs.existsSync(destPath)) {
      const stat = fs.statSync(destPath);
      if (stat.size > 5000) {
        console.log(`  SKIP (already exists, ${stat.size} bytes)`);
        successList.push({ localPath, originalUrl, size: stat.size });
        continue;
      } else {
        console.log(`  Existing file too small (${stat.size} bytes), re-downloading...`);
        fs.unlinkSync(destPath);
      }
    }

    try {
      const result = await downloadWithRetry(originalUrl, destPath);
      console.log(`  OK: ${(result.size / 1024).toFixed(1)} KB (${result.type})`);
      successList.push({ localPath, originalUrl, size: result.size });
    } catch (err) {
      console.log(`  FAIL: ${err.message}`);
      failedList.push({ localPath, originalUrl, reason: err.message });
    }
    // 间隔 3 秒，避免 429
    if (i < MISSING_FILES.length - 1) {
      await sleep(3000);
    }
  }

  console.log(`\n=== 完成 ===`);
  console.log(`成功: ${successList.length}`);
  console.log(`失败: ${failedList.length}`);

  if (failedList.length > 0) {
    console.log(`\n失败列表（需手动处理，建议从 clothingHistory.ts 删除这些条目）:`);
    for (const f of failedList) {
      console.log(`  ${path.basename(f.localPath)}`);
      console.log(`    URL: ${f.originalUrl}`);
      console.log(`    原因: ${f.reason}`);
    }
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
