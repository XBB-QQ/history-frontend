/**
 * 从 Wikimedia Commons 批量搜索中国历代服饰图片
 * 输出 JSON 格式：{ 朝代ID: [{ name, file, thumbUrl, license }] }
 *
 * 运行方式：node scripts/fetch_clothing_images.mjs
 * 输出文件：scripts/clothing_images.json
 */

const API_BASE = 'https://commons.wikimedia.org/w/api.php';

// 按朝代定义搜索关键词
const SEARCH_QUERIES = {
  'shang-zhou': [
    'Shang dynasty jade figure clothing',
    'Zhou dynasty bronze figure garment',
    'Chinese ancient jade person figurine',
  ],
  'qin-han': [
    'Mawangdui silk garment Han dynasty',
    'Han dynasty tomb mural figures clothing',
    'Dahuting Han tomb mural',
  ],
  'wei-jin': [
    'Wei Jin Southern Northern Dynasty figurine pottery',
    'Bamboo grove seven sages painting',
    'Northern Wei dynasty pottery figurine',
  ],
  'tang': [
    'Tang dynasty court ladies painting',
    'Tang dynasty pottery figurine woman',
    'Tang dynasty horse rider figurine',
  ],
  'song': [
    'Song dynasty emperor portrait painting',
    'Song dynasty lady painting court',
    'Song dynasty literati painting figure',
  ],
  'yuan': [
    'Yuan dynasty emperor portrait Kublai Khan',
    'Yuan dynasty Mongol clothing painting',
    'Yuan dynasty pottery figurine',
  ],
  'ming': [
    'Ming dynasty emperor portrait seated',
    'Ming dynasty official portrait robe',
    'Ming dynasty woman portrait painting',
  ],
  'qing': [
    'Qing dynasty dragon robe emperor',
    'Qing dynasty official court robe',
    'Qing dynasty Manchu woman clothing',
  ],
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const resp = await fetch(url);
    if (resp.ok) return resp;
    if (resp.status === 429) {
      const wait = 3000 * (i + 1);
      console.log(`    429 rate limited, waiting ${wait}ms...`);
      await sleep(wait);
      continue;
    }
    throw new Error(`HTTP ${resp.status}`);
  }
  throw new Error('Max retries exceeded');
}

async function searchImages(query, limit = 5) {
  const url = new URL(API_BASE);
  url.searchParams.set('action', 'query');
  url.searchParams.set('list', 'search');
  url.searchParams.set('srsearch', query);
  url.searchParams.set('srnamespace', '6');
  url.searchParams.set('srlimit', String(limit));
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');

  const resp = await fetchWithRetry(url);
  const data = await resp.json();
  return (data.query?.search || []).map(r => r.title);
}

async function getImageInfo(fileTitle) {
  const url = new URL(API_BASE);
  url.searchParams.set('action', 'query');
  url.searchParams.set('titles', fileTitle);
  url.searchParams.set('prop', 'imageinfo');
  url.searchParams.set('iiprop', 'url|extmetadata');
  url.searchParams.set('iiurlwidth', '600');
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');

  const resp = await fetchWithRetry(url);
  const data = await resp.json();
  const pages = data.query?.pages || {};
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) return null;

  const license = info.extmetadata?.LicenseShortName?.value || 'Unknown';
  return {
    file: fileTitle,
    thumbUrl: info.thumburl,
    url: info.url,
    width: info.thumbwidth,
    height: info.thumbheight,
    license: license.replace(/<[^>]*>/g, ''),
  };
}

async function main() {
  const results = {};

  for (const [dynastyId, queries] of Object.entries(SEARCH_QUERIES)) {
    console.log(`\n=== ${dynastyId} ===`);
    const allFiles = new Set();

    for (const query of queries) {
      console.log(`  Searching: ${query}`);
      try {
        const files = await searchImages(query, 8);
        files.forEach(f => {
          // 只保留 jpg/png 格式的图片文件
          if (/\.(jpg|jpeg|png)$/i.test(f)) {
            allFiles.add(f);
          }
        });
      } catch (e) {
        console.error(`  Error: ${e.message}`);
      }
      // 间隔 2 秒避免 429 速率限制
      await sleep(2000);
    }

    // 获取每个文件的图片 URL
    const images = [];
    for (const file of allFiles) {
      try {
        const info = await getImageInfo(file);
        if (info && info.thumbUrl) {
          images.push(info);
          console.log(`  OK: ${file} (${info.width}x${info.height}, ${info.license})`);
        }
      } catch (e) {
        console.error(`  ImageInfo error for ${file}: ${e.message}`);
      }
      await sleep(1500);
    }

    results[dynastyId] = images;
    console.log(`  Total: ${images.length} images`);
  }

  // 输出 JSON
  const outputPath = new URL('./clothing_images.json', import.meta.url);
  const fs = await import('fs');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nDone! Output: ${outputPath.pathname}`);

  // 打印摘要
  for (const [dynastyId, images] of Object.entries(results)) {
    console.log(`  ${dynastyId}: ${images.length} images`);
  }
}

main().catch(console.error);
