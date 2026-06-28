<#
  deploy-boks.ps1
  Copia (mirror) il branch/worktree LIVE dentro il repo BOKS che GitHub Pages serve.

  Uso:
    .\deploy-boks.ps1            # ANTEPRIMA: copia + verifica + mostra le modifiche, NON pusha
    .\deploy-boks.ps1 -Push      # copia + verifica + commit + push su boks

  La prima volta: controlla che $BoksRepoPath qui sotto sia il percorso giusto del repo boks.
#>

[CmdletBinding()]
param(
  [string]$LiveWorktreePath = "C:\Users\maurizio\Documents\cubetto-pwa-live",
  [string]$BoksRepoPath     = "C:\Users\maurizio\Documents\boks",   # <-- CONFERMA QUESTO PERCORSO
  [switch]$Push
)

$ErrorActionPreference = 'Stop'

# --- Validazione percorsi -------------------------------------------------
if (-not (Test-Path (Join-Path $LiveWorktreePath 'index.html'))) {
  throw "Worktree live non valido (manca index.html): $LiveWorktreePath"
}
if (-not (Test-Path (Join-Path $BoksRepoPath '.git'))) {
  throw "Repo boks non valido (manca .git): $BoksRepoPath  --  correggi il percorso in cima allo script."
}

# Sicurezza: la sorgente deve essere davvero sul branch 'live'
$liveBranch = (& git -C $LiveWorktreePath rev-parse --abbrev-ref HEAD).Trim()
if ($liveBranch -ne 'live') {
  throw "La sorgente non e sul branch 'live' (trovato: '$liveBranch'). Deploy annullato."
}

Write-Host "Sorgente    : $LiveWorktreePath (branch $liveBranch)" -ForegroundColor Cyan
Write-Host "Destinazione: $BoksRepoPath" -ForegroundColor Cyan
Write-Host ""

# --- Mirror dei file ------------------------------------------------------
#  /MIR  = mirror completo (aggiunge, aggiorna, RIMUOVE i file spariti)
#  /XD   = NON toccare queste cartelle (interno git, CI e settings editor del repo boks)
#  /XF   = il worktree usa un FILE chiamato .git: va escluso a parte
$roboArgs = @(
  $LiveWorktreePath,
  $BoksRepoPath,
  '/MIR',
  '/XD', '.git', '.github', '.vscode', '.agents',
  '/XF', '.git',
  '/NFL', '/NDL', '/R:1', '/W:1'
)
robocopy @roboArgs
$rc = $LASTEXITCODE
# robocopy: exit < 8 = successo (0 niente da fare, 1 copiati, 3 copiati+eliminati, ecc.)
if ($rc -ge 8) {
  throw "robocopy ha riportato un errore (exit $rc). Niente commit, niente push."
}
Write-Host "Mirror completato (robocopy exit $rc = ok)." -ForegroundColor Green
Write-Host ""

# --- Verifica dei file critici (quelli che una copia a mano dimentica) ----
$lottie = Join-Path $BoksRepoPath 'js\vendor\lottie.min.js'
$cname  = Join-Path $BoksRepoPath 'CNAME'

if (-not (Test-Path $lottie)) { throw "MANCA js/vendor/lottie.min.js in boks dopo la copia." }
if (-not (Test-Path $cname))  { throw "MANCA CNAME in boks dopo la copia." }

$lottieLen = (Get-Item $lottie).Length
if ($lottieLen -lt 200000) {
  throw "lottie.min.js sospetto: $lottieLen byte (atteso ~300KB). Controlla il file in live."
}
$cnameVal = (Get-Content $cname -Raw).Trim()
Write-Host "Verifica OK:" -ForegroundColor Green
Write-Host "  - lottie.min.js  $lottieLen byte"
Write-Host "  - CNAME          $cnameVal"
Write-Host ""

# --- Git: prepara e mostra cosa cambia ------------------------------------
& git -C $BoksRepoPath add -A
Write-Host "Modifiche pronte per il commit in boks:" -ForegroundColor Cyan
& git -C $BoksRepoPath status --short

if ($Push) {
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  & git -C $BoksRepoPath commit -m "Deploy live -> boks ($stamp)"
  if ($LASTEXITCODE -ne 0) { throw "git commit fallito (forse nessuna modifica da committare)." }
  & git -C $BoksRepoPath push
  if ($LASTEXITCODE -ne 0) { throw "git push fallito." }
  Write-Host ""
  Write-Host "Deploy pushato su boks. GitHub Pages si aggiorna in ~1 minuto." -ForegroundColor Green
} else {
  Write-Host ""
  Write-Host "ANTEPRIMA: nessun push. Controlla la lista qui sopra." -ForegroundColor Yellow
  Write-Host "Se e tutto giusto, rilancia con:  .\deploy-boks.ps1 -Push" -ForegroundColor Yellow
}
