"""修复 en.json 中丢失的 Emoji 前缀"""
import json
import re

ZH = r'D:\claudeCode\history-frontend\src\i18n\locales\zh.json'
EN = r'D:\claudeCode\history-frontend\src\i18n\locales\en.json'

with open(ZH, encoding='utf-8') as f:
    zh = json.load(f)
with open(EN, encoding='utf-8') as f:
    en = json.load(f)

emoji_pattern = re.compile(
    '^('
    '['
    '\U0001F300-\U0001F9FF'
    '\U00002600-\U000027BF'
    '\U0001F600-\U0001F64F'
    '\U0001F680-\U0001F6FF'
    '\U0001F1E0-\U0001F1FF'
    '\U0000FE0F'
    '\u27A1'
    '\u2B05'
    '\u2B06'
    '\u2B07'
    ']+'
    '\s*'
    ')'
)

def flat(o, prefix=''):
    result = {}
    for k, v in o.items():
        kk = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            result.update(flat(v, kk))
        else:
            result[kk] = v
    return result

zh_flat = flat(zh)
en_flat = flat(en)

fixed = 0
for k, zh_v in zh_flat.items():
    if not isinstance(zh_v, str) or not isinstance(en_flat.get(k), str):
        continue
    m = emoji_pattern.match(zh_v)
    if m:
        emoji_prefix = m.group(1)
        en_v = en_flat[k]
        if not emoji_pattern.match(en_v):
            new_en = emoji_prefix + en_v
            keys = k.split('.')
            obj = en
            for key in keys[:-1]:
                obj = obj[key]
            obj[keys[-1]] = new_en
            fixed += 1
            if fixed <= 10:
                print(f'  {k}: {en_v} -> {new_en}')

with open(EN, 'w', encoding='utf-8') as f:
    json.dump(en, f, ensure_ascii=False, indent=2)
    f.write('\n')

print(f'\nTotal fixed: {fixed}')
