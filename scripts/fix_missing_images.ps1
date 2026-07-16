# 测试网络连通性并下载缺失图片
$ErrorActionPreference = 'Stop'

$targetDir = 'D:\claudeCode\history-frontend\public\images\clothing'

$files = @(
    @{ local = 'qin-han-3-960px-Dahuting_Eastern_Han_Tombs_Mural_-_5.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Dahuting_Eastern_Han_Tombs_Mural_-_5.jpg/960px-Dahuting_Eastern_Han_Tombs_Mural_-_5.jpg' },
    @{ local = 'qin-han-5-960px-Dahuting_Eastern_Han_Tombs_Mural_-_30.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Dahuting_Eastern_Han_Tombs_Mural_-_30.jpg/960px-Dahuting_Eastern_Han_Tombs_Mural_-_30.jpg' },
    @{ local = 'extra-0-Seven_Sages_of_the_Bamboo_Grove_by_Honda_Tenj_.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Seven_Sages_of_the_Bamboo_Grove_by_Honda_Tenj%C5%8D.jpg' },
    @{ local = 'extra-5-Tang_Dynasty_woman_with_long_silk_sleeves.JPG'; url = 'https://upload.wikimedia.org/wikipedia/commons/4/40/Tang_Dynasty_woman_with_long_silk_sleeves.JPG' },
    @{ local = 'song-1-960px-Portrait_de_Song_Taizu.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Portrait_de_Song_Taizu.jpg/960px-Portrait_de_Song_Taizu.jpg' },
    @{ local = 'song-5-Song_court_lady.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/7/75/Song_court_lady.jpg' },
    @{ local = 'extra-9-Dame_Guoguo_partant_faire_une_promenade___cheval__copie_par_Li_Gonglin.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/3/39/Dame_Guoguo_partant_faire_une_promenade_%C3%A0_cheval%2C_copie_par_Li_Gonglin.jpg' },
    @{ local = 'extra-13-___________.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/9/94/%D3%A8%D0%B3%D3%A9%D0%B4%D1%8D%D0%B9_%D1%85%D0%B0%D0%B0%D0%BD.jpg' },
    @{ local = 'qing-0-960px-20241025_Dragon_Robe_of_Daoguang_Emperor__Qing_Dynasty_02.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/20241025_Dragon_Robe_of_Daoguang_Emperor%2C_Qing_Dynasty_02.jpg/960px-20241025_Dragon_Robe_of_Daoguang_Emperor%2C_Qing_Dynasty_02.jpg' },
    @{ local = 'qing-2-960px-Qing_Dragon_Robe_b.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Qing_Dragon_Robe_b.jpg/960px-Qing_Dragon_Robe_b.jpg' },
    @{ local = 'qing-4-960px-1913.158_-_Emperor_s_Jifu__Semiformal_Court_Robe_.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/1913.158_-_Emperor%27s_Jifu_%28Semiformal_Court_Robe%29.jpg/960px-1913.158_-_Emperor%27s_Jifu_%28Semiformal_Court_Robe%29.jpg' }
)

$headers = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    'Accept' = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    'Accept-Language' = 'zh-CN,zh;q=0.9,en;q=0.8'
    'Referer' = 'https://commons.wikimedia.org/'
}

$success = 0
$failed = 0
$failedList = @()

for ($i = 0; $i -lt $files.Count; $i++) {
    $f = $files[$i]
    $destPath = Join-Path $targetDir $f.local
    Write-Host "[$($i+1)/$($files.Count)] $($f.local)"

    # 如果文件已存在且大于 5KB，跳过
    if (Test-Path $destPath) {
        $size = (Get-Item $destPath).Length
        if ($size -gt 5000) {
            Write-Host "  SKIP (already exists, $size bytes)"
            $success++
            continue
        }
    }

    $maxRetries = 5
    $downloaded = $false
    for ($r = 0; $r -lt $maxRetries; $r++) {
        try {
            Invoke-WebRequest -Uri $f.url -OutFile $destPath -Headers $headers -TimeoutSec 30
            $size = (Get-Item $destPath).Length
            if ($size -gt 5000) {
                $sizeKB = [math]::Round($size / 1024, 1)
                Write-Host "  OK: $sizeKB KB"
                $success++
                $downloaded = $true
                break
            } else {
                Write-Host "  Invalid (size $size bytes), retrying..."
                Remove-Item $destPath -Force -ErrorAction SilentlyContinue
                Start-Sleep -Seconds 3
            }
        } catch {
            $msg = $_.Exception.Message
            if ($msg -match '429') {
                $wait = 10 + 5 * $r
                Write-Host "  429, waiting ${wait}s..."
                Start-Sleep -Seconds $wait
            } else {
                Write-Host "  Retry $($r+1): $msg"
                Start-Sleep -Seconds 3
            }
        }
    }

    if (-not $downloaded) {
        Write-Host "  FAIL"
        $failed++
        $failedList += $f.local
    }

    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "=== Done ==="
Write-Host "Success: $success"
Write-Host "Failed: $failed"
if ($failedList.Count -gt 0) {
    Write-Host ""
    Write-Host "Failed list:"
    foreach ($name in $failedList) {
        Write-Host "  $name"
    }
}
