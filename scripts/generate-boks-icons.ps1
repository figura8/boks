Add-Type -AssemblyName System.Drawing

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$fontsDir = Join-Path $repoRoot 'assets\fonts'
$lilitaFontPath = Join-Path $fontsDir 'LilitaOne-Regular.ttf'

$privateFonts = New-Object System.Drawing.Text.PrivateFontCollection
if (Test-Path $lilitaFontPath) {
  $privateFonts.AddFontFile($lilitaFontPath)
}

$fontFamily = $null
if ($privateFonts.Families.Count -gt 0) {
  $fontFamily = $privateFonts.Families[0]
}

$fontCandidates = @(
  'Lilita One',
  'Fredoka',
  'Arial Black',
  'Segoe UI Black',
  'Segoe UI'
)
$installedFonts = (New-Object System.Drawing.Text.InstalledFontCollection).Families.Name
$fontName = $fontCandidates | Where-Object { $installedFonts -contains $_ } | Select-Object -First 1
if (-not $fontName) { $fontName = 'Arial' }

$letters = @(
  [PSCustomObject]@{ Char = [string][char]0x0042; Color = [System.Drawing.ColorTranslator]::FromHtml('#3F9A62') }, # B
  [PSCustomObject]@{ Char = [string][char]0x00D6; Color = [System.Drawing.ColorTranslator]::FromHtml('#FF3B3B') }, # Ö
  [PSCustomObject]@{ Char = [string][char]0x004B; Color = [System.Drawing.ColorTranslator]::FromHtml('#FFD31A') }, # K
  [PSCustomObject]@{ Char = [string][char]0x0053; Color = [System.Drawing.ColorTranslator]::FromHtml('#2B8FD4') }  # S
)

function New-BoksIcon {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][int]$Size,
    [Parameter(Mandatory = $true)][double]$Scale
  )

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $format = $null
  $font = $null

  try {
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Trasparente: icona con sola scritta.
    $g.Clear([System.Drawing.Color]::FromArgb(0, 255, 255, 255))

    $fontSize = [Math]::Max(12, [Math]::Round($Size * $Scale))
    if ($fontFamily) {
      $font = New-Object System.Drawing.Font($fontFamily, $fontSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    } else {
      $font = New-Object System.Drawing.Font($fontName, $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    }
    $format = New-Object System.Drawing.StringFormat([System.Drawing.StringFormat]::GenericDefault)
    $format.Alignment = [System.Drawing.StringAlignment]::Near
    $format.LineAlignment = [System.Drawing.StringAlignment]::Near
    $format.FormatFlags = [System.Drawing.StringFormatFlags]::NoClip

    $spacing = 0
    $widths = @()
    foreach ($letter in $letters) {
      $sz = $g.MeasureString($letter.Char, $font)
      $widths += [Math]::Ceiling($sz.Width)
    }

    # Pair kerning to match the visual spacing of the BÖKS logo reference.
    $pairAdjust = @(
      -[Math]::Round($fontSize * 0.18), # B -> Ö
      -[Math]::Round($fontSize * 0.16), # Ö -> K
      -[Math]::Round($fontSize * 0.21)  # K -> S
    )
    $pairAdjust = $pairAdjust | ForEach-Object { [int]$_ }
    $totalKerning = ($pairAdjust | Measure-Object -Sum).Sum
    $totalWidth = ($widths | Measure-Object -Sum).Sum + ($spacing * ($letters.Count - 1)) + $totalKerning
    $x = [Math]::Max(0, [Math]::Floor(($Size - $totalWidth) / 2))
    $y = [Math]::Max(0, [Math]::Floor(($Size - $font.GetHeight($g)) / 2) - [Math]::Round($Size * 0.01))

    for ($i = 0; $i -lt $letters.Count; $i++) {
      $brush = New-Object System.Drawing.SolidBrush($letters[$i].Color)
      try {
        $g.DrawString($letters[$i].Char, $font, $brush, [single]$x, [single]$y, $format)
      } finally {
        $brush.Dispose()
      }
      $advance = $widths[$i] + $spacing
      if ($i -lt $pairAdjust.Count) {
        $advance += $pairAdjust[$i]
      }
      $x += $advance
    }

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    if ($format) { $format.Dispose() }
    if ($font) { $font.Dispose() }
    $g.Dispose()
    $bmp.Dispose()
  }
}

$iconsDir = Join-Path $repoRoot 'icons'
if (-not (Test-Path $iconsDir)) {
  New-Item -ItemType Directory -Path $iconsDir | Out-Null
}

New-BoksIcon -Path (Join-Path $iconsDir 'icon-192.png') -Size 192 -Scale 0.22
New-BoksIcon -Path (Join-Path $iconsDir 'icon-512.png') -Size 512 -Scale 0.22
New-BoksIcon -Path (Join-Path $iconsDir 'icon-192-maskable.png') -Size 192 -Scale 0.19
New-BoksIcon -Path (Join-Path $iconsDir 'icon-512-maskable.png') -Size 512 -Scale 0.19
New-BoksIcon -Path (Join-Path $iconsDir 'boks-apple-touch-icon.png') -Size 180 -Scale 0.22

$legacyCharacter = Join-Path $iconsDir 'boks-character.png'
if (Test-Path $legacyCharacter) {
  Remove-Item $legacyCharacter -Force
}

$resolvedFont = if ($fontFamily) { $fontFamily.Name } else { $fontName }
Write-Host "Generated BOKS text-only icons in '$iconsDir' using font '$resolvedFont'."
$privateFonts.Dispose()
