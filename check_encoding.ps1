$path = 'D:\claudeCode\history-frontend\src\features\momentsFeed.ts'
$bytes = [System.IO.File]::ReadAllBytes($path)
Write-Host "File size: $($bytes.Length) bytes"
Write-Host "First 3 bytes (BOM check):"
for ($i = 0; $i -lt 3; $i++) {
    Write-Host -NoNewline ("{0:X2} " -f $bytes[$i])
}
Write-Host ""
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$lines = $content -split "`r`n|`r|`n"
Write-Host "Line 419 content:"
Write-Host $lines[418]
Write-Host "Line 419 length: $($lines[418].Length)"
$lineBytes = [System.Text.Encoding]::UTF8.GetBytes($lines[418])
Write-Host "Line 419 byte length: $($lineBytes.Length)"
