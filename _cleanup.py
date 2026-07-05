import sys

# ===== 1. letterWriter.ts =====
path1 = r'D:\claudeCode\history-frontend\src\features\letterWriter.ts'
with open(path1, 'r', encoding='utf-8') as f:
    content = f.read()

old1 = "    ? `\\n\\n写信人是一位对历史充满热情的访客，其画像：朝代偏好${persona.favoriteDynasties.join('、') || '广泛'}，关注人物${persona.favoritePersons.join('、') || '众多'}`"
new1 = "    ? `\\n\\n写信人画像：偏好朝代${persona.favoriteDynasties.join('、') || '广泛'}，关注人物${persona.favoritePersons.join('、') || '众多'}`"
assert old1 in content, 'personaContext 段未找到'
content = content.replace(old1, new1, 1)

old2 = '6. 不要说"作为AI"之类的自我指涉`;\n'
new2 = '6. 不要说"作为AI"之类的自我指涉\n7. 输出纯文本，不要使用 Markdown 语法（不要 ##、**、代码块等），不要使用 emoji`;\n'
assert old2 in content, '回信要求第 6 条未找到'
content = content.replace(old2, new2, 1)

with open(path1, 'w', encoding='utf-8') as f:
    f.write(content)
print('letterWriter.ts 已更新')

# ===== 2. LetterPage.tsx =====
path2 = r'D:\claudeCode\history-frontend\src\pages\LetterPage.tsx'
with open(path2, 'r', encoding='utf-8') as f:
    content2 = f.read()

repls = [
    ('📜 往来信件 ({letters.length})', '往来信件 ({letters.length})'),
    ('>📝 来信</div>', '>来信</div>'),
    ('>📮 回信</div>', '>回信</div>'),
]
for old, new in repls:
    assert old in content2, f'未找到: {old!r}'
    content2 = content2.replace(old, new, 1)

with open(path2, 'w', encoding='utf-8') as f:
    f.write(content2)
print('LetterPage.tsx 已更新')
