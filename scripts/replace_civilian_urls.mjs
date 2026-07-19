/**
 * 替换 clothingHistory.ts 中的帝王画像为平民服饰图片
 *
 * 前置条件：先运行 node scripts/download_civilian_images.mjs 下载图片
 *
 * 替换策略：
 * - song: 替换 3 张帝王画像为清明上河图 + 李嵩画作
 * - yuan: 替换 3 张帝王画像为乐舞砖俑
 * - wei-jin: 补充 2 张北魏女乐俑（替换重复的陶俑）
 *
 * ming/qing 朝代因 clothing_images.json 中无平民图片，保持现状
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_FILE = path.join(ROOT, 'src', 'data', 'features', 'clothingHistory.ts');
const TARGET_DIR = path.join(ROOT, 'public', 'images', 'clothing');

// 替换映射：旧 URL → 新 URL + 新 caption + 新 license
const REPLACEMENTS = [
  // ===== 宋代：帝王画像 → 李嵩画作（清明上河图因超长横卷不适合展示，已弃用）=====
  {
    oldUrl: '/images/clothing/song-4-960px-SongEmperorAlbumZhenzongPortrait.jpg',
    newUrl: '/images/clothing/civ-song-lisung.jpg',
    newCaption: '李嵩画作（反映宋代市井生活与平民服饰）',
    newLicense: 'Public domain',
  },

  // ===== 元代：帝王画像 → 乐舞砖俑 =====
  {
    oldUrl: '/images/clothing/yuan-0-960px-YuanEmperorAlbumKhubilaiPortrait.jpg',
    newUrl: '/images/clothing/civ-yuan-musician-clappers.jpg',
    newCaption: '元代乐舞砖俑·拍板乐人（反映民间艺人服饰）',
    newLicense: 'CC BY-SA 4.0',
  },
  {
    oldUrl: '/images/clothing/yuan-1-960px-YuanEmperorAlbumKhubilaiFull.jpg',
    newUrl: '/images/clothing/civ-yuan-musician-panpipes.jpg',
    newCaption: '元代乐舞砖俑·排箫乐人（反映民间艺人头巾与短袍）',
    newLicense: 'CC BY-SA 4.0',
  },
  {
    oldUrl: '/images/clothing/extra-12-Liu-Kuan-Tao-Jagd.JPG',
    newUrl: '/images/clothing/civ-yuan-drum-dancer.jpg',
    newCaption: '元代乐舞砖俑·鼓舞人（反映民间舞蹈服饰）',
    newLicense: 'CC BY-SA 4.0',
  },

  // ===== 魏晋：补充北魏女乐俑（替换重复的陶俑）=====
  {
    oldUrl: '/images/clothing/wei-jin-2-960px-Pottery_Figurine_of_Wei__Jin__or_Southern-Northern_Dynasties__10369815.jpg',
    newUrl: '/images/clothing/civ-weijin-female-musician-02.jpg',
    newCaption: '北魏彩绘女乐俑（反映北方民间女性襦裙与发髻）',
    newLicense: 'CC0',
  },
  {
    oldUrl: '/images/clothing/wei-jin-0-960px-Pottery_Figurine_of_Wei__Jin__or_Southern-Northern_Dynasties.jpg',
    newUrl: '/images/clothing/civ-weijin-female-musician-05.jpg',
    newCaption: '北魏彩绘女乐俑（反映民间乐人服饰细节）',
    newLicense: 'CC0',
  },
];

function main() {
  console.log('=== 替换帝王画像为平民服饰图片 ===\n');

  let source = fs.readFileSync(SOURCE_FILE, 'utf-8');
  let replaceCount = 0;
  let skipCount = 0;

  for (const r of REPLACEMENTS) {
    // 检查新图片是否已下载
    const newFilePath = path.join(TARGET_DIR, path.basename(r.newUrl));
    if (!fs.existsSync(newFilePath)) {
      console.log(`SKIP (文件未下载): ${r.newUrl}`);
      skipCount++;
      continue;
    }

    // 检查旧 URL 是否存在于源文件
    if (!source.includes(r.oldUrl)) {
      console.log(`SKIP (旧URL未找到): ${r.oldUrl}`);
      skipCount++;
      continue;
    }

    // 替换 URL
    source = source.split(r.oldUrl).join(r.newUrl);

    // 替换 caption（找到对应的 caption 行并替换）
    // caption 格式: caption: '...',
    const oldCaptionRegex = new RegExp(`(url: '${r.newUrl}',\\s*\\n\\s*caption: ')('[^']*',)`, 'g');
    // 上面这个正则不太对，换个方式：找到 newUrl 所在的条目，替换其 caption
    // 更简单的方式：直接搜索 oldUrl 附近的 caption
    // 但因为已经替换了 URL，现在搜索 newUrl
    const lines = source.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(r.newUrl)) {
        // 找到下一行的 caption
        if (i + 1 < lines.length && lines[i + 1].includes('caption:')) {
          lines[i + 1] = lines[i + 1].replace(/caption: '[^']*',/, `caption: '${r.newCaption}',`);
        }
        // 找到下下行的 license
        if (i + 2 < lines.length && lines[i + 2].includes('license:')) {
          lines[i + 2] = lines[i + 2].replace(/license: '[^']*',/, `license: '${r.newLicense}',`);
        }
        break;
      }
    }
    source = lines.join('\n');

    console.log(`REPLACED: ${r.oldUrl}`);
    console.log(`       → ${r.newUrl}`);
    replaceCount++;
  }

  if (replaceCount > 0) {
    fs.writeFileSync(SOURCE_FILE, source, 'utf-8');
  }

  console.log(`\n=== 完成 ===`);
  console.log(`替换: ${replaceCount}`);
  console.log(`跳过: ${skipCount}`);

  if (replaceCount > 0) {
    console.log('\n请刷新浏览器查看效果。');
    console.log('注意: ming/qing 朝代因无平民图片素材，仍为帝王/贵族服饰。');
  }
}

main();
