$serverScript = Join-Path $PSScriptRoot 'server.js'
$editorUrl = 'http://127.0.0.1:8787/dev/tutorial-editor'

$port = 8787
$alreadyRunning = $false
try {
  $response = Invoke-WebRequest -Uri $editorUrl -UseBasicParsing -TimeoutSec 1 -ErrorAction Stop
  $alreadyRunning = $true
} catch {}

if ($alreadyRunning) {
  Write-Host "Server gia avviato su $editorUrl"
} else {
  Write-Host "Avvio server tutorial editor..."
  Start-Process -FilePath 'node' -ArgumentList $serverScript -WindowStyle Normal
  Start-Sleep -Milliseconds 800
}

Start-Process $editorUrl
