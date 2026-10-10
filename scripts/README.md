# scripts/ — восстановление проекта

Здесь лежат PowerShell-скрипты, которыми шаг за шагом строился проект
«Гидродинамика». Нужны для восстановления с нуля на новой машине.

## Требования

- Windows 10/11
- Node.js 18+ (лучше 20+)
- npm 9+
- Git

## Как восстановить проект

1. git clone https://github.com/frederyv183-lang/hydrodynamics-site.git
2. cd hydrodynamics-site
3. npm install
4. npm run dev
5. Открыть http://localhost:3000

Всё — файлы уже в репозитории, скрипты нужны только для ручной сборки.

## Скрипты (запускать по порядку)

- 01-scaffold.ps1  — базовая структура и первые файлы
- 02-tailwind.ps1  — tailwind.config, postcss.config, next.config
- 03-skeleton.ps1  — страницы и роуты (сокращённый: только папки)
- 04-katex.ps1     — KaTeX-рендер (сокращённый: напоминание про npm install)
- 05-charts.ps1    — Recharts + атмосфера (сокращённый)
- 06-models.ps1    — живой график и модели (сокращённый)

Полные исходники всех файлов — в папке src/ репозитория.

## Важно: LiteralPath для [slug]

В PowerShell [ и ] — метасимволы. Для путей с [slug] всегда:

  Out-File -LiteralPath "src\app\formulas\[slug]\page.tsx"

Иначе PowerShell попытается развернуть wildcard и упадёт.

## Важно: LaTeX в here-string

Внутри @'...'@ обратные слэши НЕ экранируются. Поэтому в TS:

- обычная строка "..."   → нужны двойные слэши: \\frac
- String.raw `...`       → нужны одинарные: \frac

Рекомендуется String.raw.

## Важно: не использовать .bat для JSX

.bat и .cmd ломают JSX из-за символов <, >, &. Только PowerShell.
