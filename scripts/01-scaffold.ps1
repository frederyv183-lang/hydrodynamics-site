# Шаг 1: базовая структура
# Запуск: .\scripts\01-scaffold.ps1

Set-Location (Split-Path $PSScriptRoot -Parent)

$folders = @(
  "src\app",
  "src\components\layout",
  "src\styles",
  "public\images"
)
foreach ($f in $folders) {
  New-Item -ItemType Directory -Force -Path $f | Out-Null
}
Write-Host "Папки созданы." -ForegroundColor Green

# Файлы создаются командами ниже (см. полные версии в репозитории).
# Этот скрипт — только структура папок. Полные исходники:
#   src/app/page.tsx
#   src/app/layout.tsx
#   src/app/globals.css
#   src/components/layout/Header.tsx
#   src/components/layout/Footer.tsx
#   src/styles/katex-overrides.css
Write-Host "Файлы — в репозитории." -ForegroundColor Cyan
