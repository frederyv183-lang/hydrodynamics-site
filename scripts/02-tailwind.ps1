# Шаг 2: Tailwind config
# Запуск: .\scripts\02-tailwind.ps1

Set-Location (Split-Path $PSScriptRoot -Parent)

# Файлы создаются командами ниже. Полные исходники:
#   tailwind.config.ts
#   postcss.config.js
#   next.config.mjs
#   .eslintrc.json

Write-Host "Файлы Tailwind — в репозитории." -ForegroundColor Cyan
Write-Host "Запусти: npm install" -ForegroundColor Yellow
