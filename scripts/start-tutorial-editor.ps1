$serverScript = Join-Path $PSScriptRoot '..\dev\tutorial-editor\server.js'
$projectRoot = Join-Path $PSScriptRoot '..'

Write-Host 'Tutorial editor server: http://127.0.0.1:8787/dev/tutorial-editor'
Write-Host 'Game preview:           http://127.0.0.1:8787/'
Write-Host ''
Write-Host 'Ctrl+C to stop.'
Write-Host ''

node $serverScript
