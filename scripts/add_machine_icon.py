# -*- coding: utf-8 -*-
import io, json

for fname, val in [("zh.json", "\u673a"), ("en.json", "AI")]:
    path = f"d:/claudeCode/history-frontend/src/i18n/locales/{fname}"
    with io.open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if "machine_icon" not in data["classicalAnnotation"]:
        data["classicalAnnotation"]["machine_icon"] = val
        with io.open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"Added machine_icon to {fname}: {val}")
    else:
        print(f"machine_icon already exists in {fname}")
