[CmdletBinding()]
param(
  [string]$RepoRoot,
  [ValidateSet('main', 'live')]
  [string]$Channel = 'main'
)

$ErrorActionPreference = 'Stop'

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if (-not $RepoRoot) {
  $RepoRoot = Split-Path -Parent $scriptRoot
}

$repoRoot = (Resolve-Path $RepoRoot).Path
$indexPath = Join-Path $repoRoot 'index.html'

if (-not (Test-Path $indexPath)) {
  throw "Impossibile trovare index.html in $repoRoot"
}

$settings = switch ($Channel) {
  'live' {
    @{
      releaseChannel = 'live'
      editorEnabled = 'false'
      debugToolsEnabled = 'false'
      buildBadgeEnabled = 'false'
    }
  }
  default {
    @{
      releaseChannel = 'main'
      editorEnabled = 'true'
      debugToolsEnabled = 'true'
      buildBadgeEnabled = 'true'
    }
  }
}

$content = Get-Content -Raw $indexPath

function Set-DataAttribute {
  param(
    [string]$Html,
    [string]$Name,
    [string]$Value
  )

  $pattern = "$Name=""[^""]*"""
  $replacement = "$Name=""$Value"""

  if ($Html -notmatch $pattern) {
    throw "Impossibile trovare l'attributo $Name in $indexPath"
  }

  return [regex]::Replace($Html, $pattern, $replacement, 1)
}

function Get-DataAttribute {
  param(
    [string]$Html,
    [string]$Name
  )

  $match = [regex]::Match($Html, "$Name=""([^""]+)""")
  if (-not $match.Success) {
    throw "Impossibile trovare l'attributo $Name in $indexPath"
  }
  return $match.Groups[1].Value
}

function Remove-RemoteFontLink {
  param(
    [string]$Html
  )

  return [regex]::Replace(
    $Html,
    "\s*<link href=""https://fonts\.googleapis\.com/css2\?family=Fredoka[^""]*"" rel=""stylesheet"">\r?\n",
    '',
    1
  )
}

function Enable-LocalLiveFont {
  param(
    [string]$RepoRoot
  )

  $cssPath = Join-Path $RepoRoot 'styles/app.css'
  if (-not (Test-Path $cssPath)) {
    throw "Impossibile trovare styles/app.css in $RepoRoot"
  }

  $css = Get-Content -Raw $cssPath
  if ($css -match 'assets/fonts/LilitaOne-Regular\.ttf') {
    return
  }

  $fontFace = @"
    @font-face {
      font-family: 'Lilita One';
      src: url('../assets/fonts/LilitaOne-Regular.ttf') format('truetype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
"@

  Set-Content -Path $cssPath -Value ($fontFace + $css) -NoNewline
}

function Optimize-LiveServiceWorker {
  param(
    [string]$RepoRoot,
    [string]$Build
  )

  $swPath = Join-Path $RepoRoot 'service-worker.js'
  if (-not (Test-Path $swPath)) {
    throw "Impossibile trovare service-worker.js in $RepoRoot"
  }

  $sw = Get-Content -Raw $swPath
  $versionMatch = [regex]::Match($sw, "const CACHE_VERSION = '([^']+)';")
  $baseCacheVersion = if ($versionMatch.Success) { $versionMatch.Groups[1].Value } else { 'v1' }
  $baseCacheVersion = [regex]::Replace($baseCacheVersion, '-live-.*$', '')
  $cacheVersion = "$baseCacheVersion-live-$Build"
  $sw = [regex]::Replace($sw, "const CACHE_VERSION = '[^']+';", "const CACHE_VERSION = '$cacheVersion';", 1)

  $removeFromPrecache = @(
    'js/editor/solver.js',
    'js/editor/level-editor.js',
    'assets/audio/music/game_loop_main.mp3',
    'assets/audio/music/level_01_intro_main.ogg',
    'assets/audio/sfx/gameplay/step_move.mp3',
    'assets/audio/sfx/gameplay/error_action.mp3',
    'assets/audio/sfx/gameplay/bubble_pop_main.ogg',
    'assets/audio/sfx/gameplay/goal_bubble_bounce.ogg',
    'assets/audio/sfx/gameplay/level_complete_main.mp3',
    'assets/audio/sfx/gameplay/wellcome.mp3'
  )

  foreach ($entry in $removeFromPrecache) {
    $line = "  './$entry',"
    $sw = $sw.Replace("$line`r`n", '').Replace("$line`n", '')
  }

  Set-Content -Path $swPath -Value $sw -NoNewline
}

$updated = $content
$updated = Set-DataAttribute -Html $updated -Name 'data-release-channel' -Value $settings.releaseChannel
$updated = Set-DataAttribute -Html $updated -Name 'data-editor-enabled' -Value $settings.editorEnabled
$updated = Set-DataAttribute -Html $updated -Name 'data-debug-tools-enabled' -Value $settings.debugToolsEnabled
$updated = Set-DataAttribute -Html $updated -Name 'data-build-badge-enabled' -Value $settings.buildBadgeEnabled

if ($Channel -eq 'live') {
  $updated = Remove-RemoteFontLink -Html $updated
}

Set-Content -Path $indexPath -Value $updated -NoNewline

if ($Channel -eq 'live') {
  $build = Get-DataAttribute -Html $updated -Name 'data-build'
  Enable-LocalLiveFont -RepoRoot $repoRoot
  Optimize-LiveServiceWorker -RepoRoot $repoRoot -Build $build
}

Write-Output "Release mode impostato: $Channel"
