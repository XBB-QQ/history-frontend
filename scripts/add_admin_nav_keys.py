"""添加 31 个 admin/nav 新 key 到 zh.json 和 en.json"""
import json
import os

ZH_PATH = r'D:\claudeCode\history-frontend\src\i18n\locales\zh.json'
EN_PATH = r'D:\claudeCode\history-frontend\src\i18n\locales\en.json'

# nav 4 个新 key
NAV_NEW = {
    'search_title': {'zh': '搜索 (Ctrl+K)', 'en': 'Search (Ctrl+K)'},
    'theme_toggle': {'zh': '切换主题', 'en': 'Toggle theme'},
    'menu': {'zh': '菜单', 'en': 'Menu'},
    'user_menu': {'zh': '用户菜单', 'en': 'User menu'},
}

# admin 27 个新 key
ADMIN_NEW = {
    'title': {'zh': '管理后台', 'en': 'Admin Panel'},
    'dashboard': {'zh': '控制台', 'en': 'Dashboard'},
    'events_manage': {'zh': '事件管理', 'en': 'Events Management'},
    'persons_manage': {'zh': '人物管理', 'en': 'Persons Management'},
    'dynasties_manage': {'zh': '朝代管理', 'en': 'Dynasties Management'},
    'knowledge_cards': {'zh': '知识卡片', 'en': 'Knowledge Cards'},
    'knowledge_manage': {'zh': '知识管理', 'en': 'Knowledge Management'},
    'events_label': {'zh': '事件', 'en': 'Events'},
    'persons_label': {'zh': '人物', 'en': 'Persons'},
    'dynasties_label': {'zh': '朝代', 'en': 'Dynasties'},
    'knowledge_label': {'zh': '知识', 'en': 'Knowledge'},
    'back_to_frontend': {'zh': '返回前台', 'en': 'Back to Frontend'},
    'login_required': {'zh': '请登录管理员账号', 'en': 'Please login as administrator'},
    'default_account': {'zh': '默认账号', 'en': 'Default account'},
    'quick_actions': {'zh': '快速操作', 'en': 'Quick Actions'},
    'manage': {'zh': '管理', 'en': 'Manage'},
    'action': {'zh': '操作', 'en': 'Action'},
    'add_new': {'zh': '新增', 'en': 'Add New'},
    'refresh': {'zh': '刷新', 'en': 'Refresh'},
    'data_list': {'zh': '数据列表', 'en': 'Data List'},
    'please_select': {'zh': '请选择', 'en': 'Please select'},
    'comma_separated': {'zh': '用逗号分隔', 'en': 'Comma separated'},
    'confirm_delete': {'zh': '确定删除？', 'en': 'Confirm delete?'},
    'load_failed': {'zh': '加载失败', 'en': 'Load failed'},
    'save_failed': {'zh': '保存失败', 'en': 'Save failed'},
    'delete_failed': {'zh': '删除失败', 'en': 'Delete failed'},
    'surname_map_manage': {'zh': '姓氏地图管理', 'en': 'Surname Map Management'},
}


def add_keys(path, lang):
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # nav 分类
    if 'nav' not in data:
        data['nav'] = {}
    nav_added = 0
    for key, val in NAV_NEW.items():
        if key not in data['nav']:
            data['nav'][key] = val[lang]
            nav_added += 1
        else:
            print(f'  [skip] nav.{key} already exists: {data["nav"][key]}')

    # admin 分类
    if 'admin' not in data:
        data['admin'] = {}
    admin_added = 0
    for key, val in ADMIN_NEW.items():
        if key not in data['admin']:
            data['admin'][key] = val[lang]
            admin_added += 1
        else:
            print(f'  [skip] admin.{key} already exists: {data["admin"][key]}')

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

    print(f'{lang}: nav +{nav_added}, admin +{admin_added}')
    return nav_added + admin_added


print('=== zh.json ===')
zh_count = add_keys(ZH_PATH, 'zh')
print('=== en.json ===')
en_count = add_keys(EN_PATH, 'en')

print(f'\n总计: zh +{zh_count}, en +{en_count}')

# 验证
with open(ZH_PATH, 'r', encoding='utf-8') as f:
    zh = json.load(f)
with open(EN_PATH, 'r', encoding='utf-8') as f:
    en = json.load(f)

print(f'\n验证:')
print(f'  zh.nav.search_title = {zh["nav"].get("search_title")}')
print(f'  en.nav.search_title = {en["nav"].get("search_title")}')
print(f'  zh.admin.title = {zh.get("admin", {}).get("title")}')
print(f'  en.admin.title = {en.get("admin", {}).get("title")}')
print(f'  zh.admin keys = {len(zh.get("admin", {}))}')
print(f'  en.admin keys = {len(en.get("admin", {}))}')
