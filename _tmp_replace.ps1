$ErrorActionPreference = 'Stop'
$path = 'D:\claudeCode\history-frontend\src\features\dailyGreeting.ts'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

$old = "  const systemPrompt = ``你是历史人物 `$figure.name`（`$figure.dynasty · `$figure.role`）。`r`n`r`n你的人物资料：`r`n- 生平：`$figure.bio`r`n- 说话风格：`$figure.speakingStyle`r`n- 性格：`$figure.personality`r`n- 名言：`$figure.quotes.join('、')`"

if ($content.Contains($old)) {
    Write-Host 'OLD_FOUND_CRLF'
} else {
    $old2 = $old -replace "`r`n", "`n"
    if ($content.Contains($old2)) {
        Write-Host 'OLD_FOUND_LF'
    } else {
        Write-Host 'OLD_NOT_FOUND'
        Write-Host ('Content length: ' + $content.Length)
        $idx = $content.IndexOf('你是历史人物')
        Write-Host ('Index of 你是历史人物: ' + $idx)
        if ($idx -ge 0) {
            $sub = $content.Substring($idx, 50)
            Write-Host ('Substring: ' + $sub)
        }
    }
}
