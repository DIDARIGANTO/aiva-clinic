#!/bin/sh
# Статическая демо-сборка для GitHub Pages → папка out/
# Серверный обработчик заявок в статической версии не работает, поэтому на время сборки он убирается:
# форма в демо-версии после проверки предлагает отправить заявку в WhatsApp.
set -e
cd "$(dirname "$0")/.."

REPO="${DEMO_REPO:-aiva-clinic}"
OWNER="${DEMO_OWNER:-didariganto}"
STASH="$(mktemp -d)"

restore() { [ -d "$STASH/api" ] && mv "$STASH/api" src/app/api; rmdir "$STASH" 2>/dev/null || true; }
trap restore EXIT
mv src/app/api "$STASH/api"

rm -rf out
DEMO_EXPORT=1 \
NEXT_PUBLIC_BASE_PATH="/$REPO" \
NEXT_PUBLIC_SITE_URL="https://$OWNER.github.io/$REPO" \
NEXT_PUBLIC_NOINDEX=1 \
npx next build

touch out/.nojekyll
echo "Демо-сборка готова: out/"
