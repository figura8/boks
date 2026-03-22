$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $repoRoot 'index.html'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'

$content = Get-Content -Raw $indexPath
$updated = [regex]::Replace($content, 'data-build=\"[^\"]+\"', "data-build=""$stamp""", 1)

if ($updated -eq $content) {
  throw "Impossibile trovare data-build in $indexPath"
}

Set-Content -Path $indexPath -Value $updated -NoNewline
Write-Output "Stamped build: $stamp"
