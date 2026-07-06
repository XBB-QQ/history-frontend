# -*- coding: utf-8 -*-
import json
import sys

ZH_PATH = r"d:\claudeCode\history-frontend\src\i18n\locales\zh.json"
EN_PATH = r"d:\claudeCode\history-frontend\src\i18n\locales\en.json"
DATA_PATH = r"d:\claudeCode\history-frontend\scripts\i18n_ai_data.json"

with open(DATA_PATH, "r", encoding="utf-8") as f:
    NEW_CATEGORIES = json.load(f)

def update_json(path, locale):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    added = []
    for cat_name, cat_data in NEW_CATEGORIES.items():
        if cat_name not in data:
            data[cat_name] = cat_data[locale]
            added.append(cat_name)
        else:
            for k, v in cat_data[locale].items():
                if k not in data[cat_name]:
                    data[cat_name][k] = v
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    return added

if __name__ == "__main__":
    zh_added = update_json(ZH_PATH, "zh")
    en_added = update_json(EN_PATH, "en")
    print(f"zh.json added: {zh_added}")
    print(f"en.json added: {en_added}")
    with open(ZH_PATH, "r", encoding="utf-8") as f:
        zh = json.load(f)
    with open(EN_PATH, "r", encoding="utf-8") as f:
        en = json.load(f)
    print(f"zh.json valid, top-level keys: {len(zh)}")
    print(f"en.json valid, top-level keys: {len(en)}")
    zh_keys = set()
    en_keys = set()
    for cat in NEW_CATEGORIES:
        if cat in zh:
            zh_keys.update(f"{cat}.{k}" for k in zh[cat])
        if cat in en:
            en_keys.update(f"{cat}.{k}" for k in en[cat])
    missing_in_en = zh_keys - en_keys
    missing_in_zh = en_keys - zh_keys
    if missing_in_en:
        print(f"WARNING: keys in zh but missing in en: {missing_in_en}")
    if missing_in_zh:
        print(f"WARNING: keys in en but missing in zh: {missing_in_zh}")
    if not missing_in_en and not missing_in_zh:
        print("zh.json and en.json are in sync for AI categories")
