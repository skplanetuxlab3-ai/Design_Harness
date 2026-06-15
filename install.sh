#!/usr/bin/env bash
# DesignQA — Design System Harness 설치 스크립트
# Usage: bash install.sh

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info()    { echo -e "${BLUE}[INFO]${NC}  $1"; }
log_ok()      { echo -e "${GREEN}[OK]${NC}    $1"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC}  $1"; }
log_error()   { echo -e "${RED}[ERROR]${NC} $1"; }

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  DesignQA — Design System Harness Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Node.js 버전 확인 ──────────────────────────────────────
log_info "Node.js 버전 확인 중..."
if ! command -v node &>/dev/null; then
  log_error "Node.js가 설치되어 있지 않습니다."
  log_error "https://nodejs.org 에서 v20 이상 설치 후 다시 실행하세요."
  exit 1
fi

NODE_MAJOR=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
if [ "$NODE_MAJOR" -lt 18 ]; then
  log_warn "Node.js v${NODE_MAJOR} 감지. v18 이상을 권장합니다."
else
  log_ok "Node.js $(node -v) ✓"
fi

# ── npm 확인 ───────────────────────────────────────────────
if ! command -v npm &>/dev/null; then
  log_error "npm이 설치되어 있지 않습니다."
  exit 1
fi
log_ok "npm $(npm -v) ✓"

# ── package.json 존재 여부 확인 ────────────────────────────
if [ ! -f "package.json" ]; then
  log_info "package.json이 없습니다. React + Vite 프로젝트를 초기화합니다..."
  npm create vite@latest . -- --template react-ts --yes 2>/dev/null || {
    log_warn "Vite 자동 초기화 실패. 수동으로 프로젝트를 생성해주세요:"
    log_warn "  npm create vite@latest . -- --template react-ts"
    exit 1
  }
  log_ok "Vite 프로젝트 생성 완료 ✓"
fi

# ── 의존성 설치 ────────────────────────────────────────────
log_info "의존성 설치 중..."
npm install 2>/dev/null
log_ok "기본 의존성 설치 완료 ✓"

# ── Tailwind CSS v4 설치 ───────────────────────────────────
log_info "Tailwind CSS v4 설치 중..."
npm install -D tailwindcss@next @tailwindcss/vite@next 2>/dev/null || \
  npm install -D tailwindcss@^4 2>/dev/null || {
    log_warn "Tailwind v4 설치 실패. v3로 대체합니다..."
    npm install -D tailwindcss postcss autoprefixer 2>/dev/null
    npx tailwindcss init -p 2>/dev/null
  }
log_ok "Tailwind CSS 설치 완료 ✓"

# ── Storybook 8 설치 ───────────────────────────────────────
if [ ! -d ".storybook" ]; then
  log_info "Storybook 8 초기화 중 (시간이 걸릴 수 있습니다)..."
  npx storybook@latest init --yes 2>/dev/null || {
    log_warn "Storybook 자동 초기화 실패."
    log_warn "수동 실행: npx storybook@latest init"
  }
  log_ok "Storybook 설치 완료 ✓"
else
  log_ok "Storybook 이미 설치됨 ✓"
fi

# ── TypeScript 확인 ────────────────────────────────────────
if ! npm list typescript --depth=0 2>/dev/null | grep -q typescript; then
  log_info "TypeScript 설치 중..."
  npm install -D typescript @types/react @types/react-dom 2>/dev/null
  log_ok "TypeScript 설치 완료 ✓"
else
  log_ok "TypeScript 이미 설치됨 ✓"
fi

# ── ESLint 설치 ────────────────────────────────────────────
if ! npm list eslint --depth=0 2>/dev/null | grep -q eslint; then
  log_info "ESLint 설치 중..."
  npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
    eslint-plugin-react eslint-plugin-react-hooks 2>/dev/null
  log_ok "ESLint 설치 완료 ✓"
fi

# ── 디렉토리 구조 생성 ────────────────────────────────────
log_info "프로젝트 디렉토리 구조 생성 중..."
mkdir -p src/components
mkdir -p src/styles
mkdir -p src/layouts
mkdir -p docs
mkdir -p .claude/agents
mkdir -p .claude/hooks
log_ok "디렉토리 구조 생성 완료 ✓"

# ── CSS 토큰 파일 생성 (없을 경우) ────────────────────────
if [ ! -f "src/styles/tokens.css" ]; then
  log_info "기본 디자인 토큰 파일 생성 중..."
  cat > src/styles/tokens.css << 'EOF'
/* Design Tokens — src/styles/tokens.css
 * 이 파일에서만 원시값(hex, px)을 사용할 수 있음
 * 컴포넌트에서는 반드시 var(--*) 형태로 참조
 */

:root {
  /* ── Primitive Colors ── */
  --primitive-blue-50: #eff6ff;
  --primitive-blue-500: #3b82f6;
  --primitive-blue-600: #2563eb;
  --primitive-gray-50: #f9fafb;
  --primitive-gray-100: #f3f4f6;
  --primitive-gray-200: #e5e7eb;
  --primitive-gray-400: #9ca3af;
  --primitive-gray-500: #6b7280;
  --primitive-gray-900: #111827;
  --primitive-red-500: #ef4444;
  --primitive-green-500: #22c55e;

  /* ── Semantic Colors ── */
  --color-primary: var(--primitive-blue-500);
  --color-primary-hover: var(--primitive-blue-600);
  --color-surface: #ffffff;
  --color-surface-subtle: var(--primitive-gray-50);
  --color-border: var(--primitive-gray-200);
  --color-text-primary: var(--primitive-gray-900);
  --color-text-secondary: var(--primitive-gray-500);
  --color-text-disabled: var(--primitive-gray-400);
  --color-error: var(--primitive-red-500);
  --color-success: var(--primitive-green-500);

  /* ── Spacing (4px grid) ── */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* ── Border Radius ── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* ── Typography ── */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-display: 3rem;
  --text-h1: 2rem;
  --text-h2: 1.5rem;
  --text-h3: 1.25rem;
  --text-body-lg: 1rem;
  --text-body: 0.875rem;
  --text-caption: 0.75rem;
  --text-label: 0.75rem;
}
EOF
  log_ok "src/styles/tokens.css 생성 완료 ✓"
fi

# ── package.json scripts 업데이트 안내 ────────────────────
log_info "package.json에 다음 scripts를 추가하세요:"
echo ""
echo '  "scripts": {'
echo '    "dev": "vite",'
echo '    "build": "tsc && vite build",'
echo '    "typecheck": "tsc --noEmit",'
echo '    "lint": "eslint src --ext ts,tsx",'
echo '    "storybook": "storybook dev -p 6006",'
echo '    "build-storybook": "storybook build"'
echo '  }'
echo ""

# ── hooks 실행 권한 부여 ───────────────────────────────────
log_info "hooks 실행 권한 설정 중..."
chmod +x .claude/hooks/*.mjs 2>/dev/null && log_ok "hooks 실행 권한 설정 완료 ✓" || true

# ── 완료 ──────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "  ${GREEN}설치 완료!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "다음 단계:"
echo "  1. npm run dev          → 개발 서버 시작"
echo "  2. npm run storybook    → Storybook 시작"
echo "  3. Figma 컴포넌트 구현: Claude Code에서 @figma-implementer 호출"
echo "  4. 품질 검사: @design-qa 또는 @design-reviewer 호출"
echo ""
echo "문서:"
echo "  CLAUDE.md       → 토큰 규칙, 컴포넌트 구조"
echo "  docs/DESIGN.md  → 브랜드 가이드, 색상/스페이싱"
echo ""
