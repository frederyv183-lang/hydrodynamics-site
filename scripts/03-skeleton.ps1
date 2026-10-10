# Шаг 3: страницы и роуты
# Запуск: .\scripts\03-skeleton.ps1

Set-Location (Split-Path $PSScriptRoot -Parent)

$folders = @(
  "src\app\about",
  "src\app\formulas\[slug]",
  "src\app\models\[slug]",
  "src\app\calculators\reynolds",
  "src\components\ui",
  "src\data",
  "src\lib"
)
foreach ($f in $folders) {
  New-Item -ItemType Directory -Force -Path $f | Out-Null
}
Write-Host "Папки созданы." -ForegroundColor Green
Write-Host "Файлы страниц — в репозитории (src/app/...)." -ForegroundColor Cyan
