#!/usr/bin/env node
/**
 * Design Harness — 하드코딩 스캐너 (결정론적)
 *
 * CLAUDE.md §1(토큰), §3(Figma 충실도), §4(너비) 규칙을 LLM 판단이 아니라
 * 정규식으로 강제한다. LLM은 새는데, 이건 안 샌다.
 *
 * 사용법:
 *   node scripts/scan-hardcode.mjs                     # src 전체 스캔
 *   node scripts/scan-hardcode.mjs src/components/Chip # 경로 지정
 *   node scripts/scan-hardcode.mjs --baseline          # 신규 위반만 (기존 부채 무시)
 *   node scripts/scan-hardcode.mjs --write-baseline    # 현재 상태를 기준선으로 저장
 *   node scripts/scan-hardcode.mjs --json              # 기계 판독용 출력
 *   node scripts/scan-hardcode.mjs --strict            # warn도 실패 처리
 *
 * 종료 코드: 0 = 통과, 1 = 위반 발견
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve, extname, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASELINE_PATH = join(ROOT, 'scripts', 'design-baseline.json')

/* ══════════════════════════════════════════════════════════
   1. 토큰 인벤토리 — CSS에서 실제 정의된 토큰을 읽어온다
   ══════════════════════════════════════════════════════════ */

const TOKEN_SOURCES = [
  'src/tokens/colors.css',
  'src/tokens/spacing.css',
  'src/tokens/typography.css',
  'src/styles/globals.css',
]

function loadTokens() {
  const tokens = []
  for (const rel of TOKEN_SOURCES) {
    const abs = join(ROOT, rel)
    if (!existsSync(abs)) continue
    const src = readFileSync(abs, 'utf8')
    const re = /^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gim
    let m
    while ((m = re.exec(src))) {
      tokens.push({ name: m[1], value: m[2].trim(), file: rel })
    }
  }
  return tokens
}

const TOKENS = loadTokens()

/* ── 토큰 소스 건강 검사 ────────────────────────────────────
   이 스캐너는 CSS를 정규식으로 읽는다. 그래서 브라우저가 실제로는 무시하는
   선언까지 "존재하는 토큰"으로 인덱싱할 수 있다.
   실제로 그런 일이 있었다 — 주석 안에 comment-close 시퀀스가 들어간 경우다.
   (예: typeset_sm_ 뒤에 별표+슬래시가 오고 그 뒤에 size 가 이어지는 형태)
   주석이 조기 종료되고, 뒤따르는 토큰 선언이 통째로 사라진다.
   파일에는 보이는데 런타임에는 없는 토큰이 생기고, 그걸 참조한 코드는 조용히 깨진다.
   그래서 스캔 전에 토큰 소스가 실제로 파싱되는지 먼저 확인한다.
──────────────────────────────────────────────────────────── */

function checkTokenSources() {
  const problems = []
  for (const rel of TOKEN_SOURCES) {
    const abs = join(ROOT, rel)
    if (!existsSync(abs)) continue
    const src = readFileSync(abs, 'utf8')
    const lines = src.split('\n')

    // 주석 상태를 추적하며 훑는다. 여러 줄 주석이 있으므로 줄 단위로는 판단할 수 없다.
    // 주석 밖에서 만나는 닫기 시퀀스는 전부 미아 — 그 앞 주석이 조기 종료됐다는 뜻이다.
    let i = 0
    let line = 1
    let inComment = false
    while (i < src.length - 1) {
      if (src[i] === '\n') { line++; i++; continue }
      const two = src[i] + src[i + 1]
      if (!inComment && two === '/*') { inComment = true; i += 2; continue }
      if (inComment && two === '*/') { inComment = false; i += 2; continue }
      if (!inComment && two === '*/') {
        problems.push({
          file: rel,
          line,
          snippet: (lines[line - 1] || '').trim().slice(0, 100),
          why: '주석이 조기 종료됐습니다 — 주석 텍스트 안에 닫기 시퀀스가 들어 있습니다. 이 줄의 선언은 런타임에 사라집니다.',
        })
        i += 2
        continue
      }
      i++
    }
    if (inComment) {
      problems.push({ file: rel, line, snippet: '(파일 끝)', why: '닫히지 않은 주석 — 이후 선언이 전부 무시됩니다.' })
    }
  }

  // 정의되지 않은 토큰을 참조하는 선언 — var()가 해석되지 않아 선언 전체가 버려진다.
  // 실제로 `--products-spacing40` 처럼 하이픈 하나 빠진 오타가 5건 있었다.
  const defined = new Set(TOKENS.map((t) => t.name))
  for (const rel of TOKEN_SOURCES) {
    const abs = join(ROOT, rel)
    if (!existsSync(abs)) continue
    readFileSync(abs, 'utf8').split('\n').forEach((l, i) => {
      if (!/^\s*--[a-z0-9-]+\s*:/.test(l)) return
      for (const m of l.matchAll(/var\((--[a-z0-9-]+)\)/g)) {
        if (defined.has(m[1])) continue
        problems.push({
          file: rel,
          line: i + 1,
          snippet: l.trim().slice(0, 100),
          why: `정의되지 않은 토큰 ${m[1]} 을 참조합니다 — 이 선언은 런타임에 사라집니다 (오타 확인)`,
        })
      }
    })
  }

  return problems
}

const TOKEN_PROBLEMS = checkTokenSources()


// px 값 → 토큰명 목록
const PX_INDEX = new Map()
// hex 값(소문자) → 토큰명 목록
const HEX_INDEX = new Map()

for (const t of TOKENS) {
  const px = /^(-?\d+(?:\.\d+)?)px$/.exec(t.value)
  if (px) {
    const k = parseFloat(px[1])
    if (!PX_INDEX.has(k)) PX_INDEX.set(k, [])
    PX_INDEX.get(k).push(t.name)
  }
  const hex = /^#([0-9a-f]{3,8})$/i.exec(t.value)
  if (hex) {
    const k = normalizeHex(t.value)
    if (!HEX_INDEX.has(k)) HEX_INDEX.set(k, [])
    HEX_INDEX.get(k).push(t.name)
  }
}

function normalizeHex(h) {
  let v = h.replace('#', '').toLowerCase()
  if (v.length === 3) v = v.split('').map((c) => c + c).join('')
  return '#' + v
}

/* 유틸리티 접두사 → 토큰 카테고리 */
const UTILITY_KIND = {
  rounded: 'radius', 'rounded-t': 'radius', 'rounded-b': 'radius',
  'rounded-l': 'radius', 'rounded-r': 'radius', 'rounded-tl': 'radius',
  'rounded-tr': 'radius', 'rounded-bl': 'radius', 'rounded-br': 'radius',
  text: 'font-size', leading: 'line-height', tracking: 'letter-spacing',
  p: 'spacing', px: 'spacing', py: 'spacing', pt: 'spacing', pr: 'spacing',
  pb: 'spacing', pl: 'spacing', m: 'spacing', mx: 'spacing', my: 'spacing',
  mt: 'spacing', mr: 'spacing', mb: 'spacing', ml: 'spacing',
  gap: 'spacing', 'gap-x': 'spacing', 'gap-y': 'spacing',
  'space-x': 'spacing', 'space-y': 'spacing',
  inset: 'spacing', top: 'spacing', right: 'spacing', bottom: 'spacing', left: 'spacing',
  w: 'sizing', h: 'sizing', size: 'sizing', 'min-w': 'sizing', 'max-w': 'sizing',
  'min-h': 'sizing', 'max-h': 'sizing', basis: 'sizing',
}

const KIND_FILTER = {
  radius: /radius/,
  'font-size': /typeset.*-size$/,
  'line-height': /typeset.*-lh$/,
  'letter-spacing': /typeset.*-tracking$/,
  spacing: /(spacing|gap|-p[xytblr]$|-m[xytblr]$|padding|margin|-pt$|-pb$|-pl$|-pr$)/,
  sizing: /(height|width|-size$|-w$|-h$)/,
}

/* ── 컴포넌트 네임스페이스 ────────────────────────────────────
   토큰은 컴포넌트별 네임스페이스로 나뉘어 있다 (--product-card-*, --checkout-* ...).
   px 값만 보고 추천하면 값은 맞지만 의미가 틀린 토큰을 집는다.
   그래서 파일이 속한 컴포넌트의 네임스페이스를 우선한다.
──────────────────────────────────────────────────────────── */

const NS_MAP_PATH = join(ROOT, 'scripts', 'component-token-map.json')
let NS_MAP = {}
try {
  NS_MAP = JSON.parse(readFileSync(NS_MAP_PATH, 'utf8'))
} catch {
  NS_MAP = {}
}

/** PascalCase 컴포넌트명 → 네임스페이스 후보 (긴 것부터) */
function deriveNamespaces(component) {
  if (NS_MAP[component]) return NS_MAP[component]
  const words = component.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().split(' ')
  const out = []
  for (let n = words.length; n >= 1; n--) {
    out.push(words.slice(0, n).join('-'), words.slice(0, n).join(''))
  }
  return [...new Set(out)]
}

/** 파일 경로 → 네임스페이스 후보 */
function namespacesForFile(rel) {
  const m = /components[\\/]([^\\/]+)[\\/]/.exec(rel)
  if (!m) return []
  return deriveNamespaces(m[1])
}

/** px 값에 맞는 토큰 후보를 카테고리 우선으로 추천 */
/* 유틸리티 → 토큰 이름 접미어(축).
   이 레포 토큰은 --plist-tag-px, --product-deal-btn-pb 처럼 축을 접미어로 쓴다.
   축이 안 맞으면 padding-top 자리에 padding-bottom 토큰을 꽂는 사고가 난다. */
const UTILITY_AXIS = {
  pt: ['-pt', '-padding-top'],
  pb: ['-pb', '-padding-bottom'],
  pl: ['-pl', '-padding-left'],
  pr: ['-pr', '-padding-right'],
  px: ['-px', '-padding-inline'],
  py: ['-py', '-padding-block'],
  p: ['-p', '-padding'],
  mt: ['-mt'], mb: ['-mb'], ml: ['-ml'], mr: ['-mr'],
  mx: ['-mx'], my: ['-my'], m: ['-m', '-margin'],
  gap: ['-gap'], 'gap-x': ['-gap'], 'gap-y': ['-row-gap', '-gap'],
  'space-x': ['-gap'], 'space-y': ['-row-gap', '-gap'],
  w: ['-w', '-width'],
  h: ['-h', '-height'],
  size: ['-size'],
  'min-w': ['-min-w'], 'max-w': ['-max-w'],
  'min-h': ['-min-h'], 'max-h': ['-max-h'],
  rounded: ['-r', '-radius'],
  text: ['-size'], leading: ['-lh'], tracking: ['-tracking'],
  top: ['-top'], right: ['-right'], bottom: ['-bottom'], left: ['-left'],
}

function matchesAxis(tokenName, utility) {
  const suffixes = UTILITY_AXIS[utility]
  if (!suffixes) return true // 축을 모르는 유틸리티는 축 조건을 걸지 않는다
  return suffixes.some((sfx) => tokenName.endsWith(sfx))
}

/* ── typeset 짝 맞추기 ──────────────────────────────────────
   lh 값은 16/20/24/28px에서 두세 계열과 겹친다 (xs·sm 둘 다 16px 등).
   size와 lh를 따로 풀면 `--typeset-sm-size` + `--typeset-xs-lh` 같은
   잡종 조합이 나온다. 값은 맞지만 코드가 거짓말을 하게 된다.
   그래서 같은 줄에 text-[Npx]와 leading-[Mpx]가 함께 있으면 한 쌍으로 푼다.
──────────────────────────────────────────────────────────── */

const TYPESET = {}
for (const t of TOKENS) {
  const m = /^--typeset-(.+)-(size|lh|tracking)$/.exec(t.name)
  if (m) (TYPESET[m[1]] ??= {})[m[2]] = t.value
}

/** 한 줄에서 typeset 스텝을 확정한다. 못 하면 null. */
function typesetStepForLine(line) {
  // 리터럴(text-[14px])과 이미 토큰화된 형태(text-[length:var(--typeset-md-size)])를 모두 읽는다.
  // 한쪽만 먼저 치환된 줄에서도 짝 정보를 잃지 않아야 한다.
  const readAxis = (utility, prop) => {
    const lit = new RegExp(`\\b${utility}-\\[(?:length:)?(\\d+(?:\\.\\d+)?)px\\]`).exec(line)
    if (lit) return lit[1] + 'px'
    const tok = new RegExp(`\\b${utility}-\\[(?:length:)?var\\(--typeset-([a-z0-9-]+)-${prop}\\)\\]`).exec(line)
    if (tok && TYPESET[tok[1]]) return TYPESET[tok[1]][prop]
    return null
  }
  const size = readAxis('text', 'size')
  const lh = readAxis('leading', 'lh')
  if (!size && !lh) return null

  const steps = Object.entries(TYPESET)
  // size와 lh가 모두 있으면 둘 다 맞는 스텝만 정답.
  // 맞는 스텝이 없으면 이 조합은 타입 스케일에 없는 값 — 억지로 붙이지 않는다.
  if (size && lh) {
    const both = steps.filter(([, v]) => v.size === size && v.lh === lh)
    if (both.length === 1) return both[0][0]
    return 'OFF_SCALE'
  }
  // 하나만 있으면 그 값으로 유일하게 결정되는 경우에만 확정
  const key = size ? 'size' : 'lh'
  const want = size || lh
  const hit = steps.filter(([, v]) => v[key] === want)
  return hit.length === 1 ? hit[0][0] : null
}

/* 전역 토큰 계열 — 특정 컴포넌트 소유가 아니므로 항상 네임스페이스가 맞는 것으로 본다.
   (타이포·radius·spacing 스케일은 모든 컴포넌트가 공유한다) */
const GLOBAL_NS = ['typeset', 'radius', 'spacing', 'font', 'color', 'products-spacing', 'products-radius']

function inNamespace(tokenName, namespaces) {
  if (GLOBAL_NS.some((ns) => tokenName.startsWith('--' + ns))) return true
  return namespaces.some((ns) => ns && tokenName.startsWith('--' + ns))
}

/**
 * px 값에 맞는 토큰 후보를 추천한다.
 * 우선순위: 같은 네임스페이스 + 같은 카테고리 > 같은 네임스페이스 > 같은 카테고리 > 나머지
 * 반환: { tokens: string[], confident: boolean }
 *   confident=false 면 값만 맞고 의미는 보장 못 한다는 뜻 — 사람이 확인해야 한다.
 */
/** `--product-deal-badge-pb` → `--product-deal-badge` (마지막 축 세그먼트를 뗀 가족명) */
function tokenFamily(name) {
  return name.replace(/-[a-z0-9]+$/, '')
}

/** 같은 줄에 이미 쓰인 토큰들의 가족 목록 — 형제 토큰을 우선하기 위한 단서 */
function familiesOnLine(line) {
  const out = new Set()
  for (const m of line.matchAll(/var\((--[a-z0-9-]+)\)/g)) out.add(tokenFamily(m[1]))
  return [...out]
}

function suggestToken(kind, px, namespaces = [], utility = null, families = []) {
  const all = PX_INDEX.get(px)
  if (!all || !all.length) return null
  const filter = KIND_FILTER[kind]
  const kindOk = (n) => (filter ? filter.test(n) : true)
  const axisOk = (n) => (utility ? matchesAxis(n, utility) : true)

  // tier1만 "확신" — 네임스페이스와 축이 모두 맞는 토큰
  const tier1 = all.filter((n) => inNamespace(n, namespaces) && axisOk(n) && kindOk(n))
  const tier2 = all.filter((n) => inNamespace(n, namespaces) && !(axisOk(n) && kindOk(n)))
  const tier3 = all.filter((n) => !inNamespace(n, namespaces) && axisOk(n) && kindOk(n))
  const tier4 = all.filter((n) => !inNamespace(n, namespaces) && !(axisOk(n) && kindOk(n)))

  const isSibling = (n) => families.includes(tokenFamily(n))
  const byName = (a, b) => {
    // 같은 줄에서 이미 쓰이는 토큰 가족이 최우선 — 한 요소의 속성들은 한 가족에서 와야 한다
    const as = isSibling(a) ? 0 : 1
    const bs = isSibling(b) ? 0 : 1
    if (as !== bs) return as - bs
    const ap = a.startsWith('--primitive') ? 1 : 0
    const bp = b.startsWith('--primitive') ? 1 : 0
    if (ap !== bp) return ap - bp
    return a.length - b.length
  }
  const pool = [
    ...tier1.sort(byName),
    ...tier2.sort(byName),
    ...tier3.sort(byName),
    ...tier4.sort(byName),
  ]
  return { tokens: pool.slice(0, 3), confident: tier1.length > 0 }
}

function suggestColor(hex) {
  const list = HEX_INDEX.get(normalizeHex(hex))
  if (!list || !list.length) return null
  const ranked = [...list].sort((a, b) => {
    const ap = a.startsWith('--primitive') ? 1 : 0
    const bp = b.startsWith('--primitive') ? 1 : 0
    if (ap !== bp) return ap - bp
    return a.length - b.length
  })
  return ranked.slice(0, 3)
}

/* ══════════════════════════════════════════════════════════
   2. 규칙 정의
   ══════════════════════════════════════════════════════════ */

const TW_PALETTE =
  'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose'
const TW_PROP =
  'text|bg|border|ring|from|via|to|fill|stroke|decoration|outline|shadow|accent|caret|divide|placeholder'

const RULES = [
  {
    id: 'raw-hex-color',
    severity: 'error',
    ref: 'CLAUDE.md §1 하드코딩 절대 금지',
    re: /#[0-9a-fA-F]{6,8}\b|#[0-9a-fA-F]{3}\b/g,
    describe: (m) => {
      const s = suggestColor(m)
      return s
        ? `hex 리터럴 — var(${s[0]}) 로 교체${s.length > 1 ? ` (후보: ${s.slice(1).join(', ')})` : ''}`
        : `hex 리터럴 — 대응 토큰 없음. src/tokens/colors.css 에 토큰을 먼저 추가할 것`
    },
  },
  {
    id: 'raw-color-function',
    severity: 'error',
    ref: 'CLAUDE.md §1 하드코딩 절대 금지',
    re: /\b(?:rgba?|hsla?)\s*\(/g,
    describe: () => 'rgb()/hsl() 리터럴 — 토큰 var(--color-*) 로 교체 (그라디언트는 전용 토큰 신설)',
  },
  {
    id: 'tailwind-literal-color',
    severity: 'error',
    ref: 'CLAUDE.md §1 Tailwind 리터럴 색상 금지',
    re: new RegExp(`\\b(?:${TW_PROP})-(?:${TW_PALETTE})-(?:50|[1-9]00|950)\\b`, 'g'),
    describe: (m) => `Tailwind 팔레트 색상 — text-[var(--color-*)] 형태로 교체 (${m})`,
  },
  {
    id: 'expiring-figma-asset',
    severity: 'error',
    ref: 'CLAUDE.md §3 Figma 충실도',
    re: /https?:\/\/[^\s'"`]*figma\.com\/api\/mcp\/asset\/[^\s'"`]*/g,
    describe: () =>
      'Figma MCP 임시 에셋 URL — 만료되면 이미지가 깨진다. 로컬 SVG(src/assets/)로 내려받아 교체할 것',
  },
  {
    id: 'arbitrary-px',
    severity: 'warn',
    ref: 'CLAUDE.md §1 간격/타이포 토큰 사용',
    re: /\b([a-z]+(?:-[a-z]+)?)-\[(-?\d+(?:\.\d+)?)px\]/g,
    // 커스텀 매처 — 캡처 그룹이 필요해서 별도 처리
    custom: true,
  },
  {
    id: 'inline-style-px',
    severity: 'warn',
    ref: 'CLAUDE.md §1 간격/타이포 토큰 사용',
    re: /:\s*'(-?\d+(?:\.\d+)?px)'|:\s*"(-?\d+(?:\.\d+)?px)"/g,
    describe: (m, ns = []) => {
      const px = parseFloat(m.replace(/[^\d.-]/g, ''))
      const s = suggestToken('spacing', px, ns)
      if (!s) return '인라인 px 리터럴 — 대응 토큰 없음'
      return s.confident
        ? `인라인 px 리터럴 — var(${s.tokens[0]}) 로 교체`
        : `인라인 px 리터럴 — var(${s.tokens[0]})는 값만 일치. 의미 확인 필요`
    },
  },
  {
    id: 'a11y-img-no-alt',
    severity: 'error',
    ref: 'CLAUDE.md §6 접근성 기준선',
    re: /<img(?![^>]*\balt\s*=)[^>]*>/g,
    describe: () =>
      'alt 속성 없는 <img> — 장식용이면 alt="" 와 aria-hidden 을, 의미가 있으면 설명을 넣을 것',
  },
  {
    id: 'a11y-focus-removed',
    severity: 'error',
    ref: 'CLAUDE.md §6 포커스 링 제거 금지',
    re: /\b(?:focus:)?outline-none\b/g,
    describe: () =>
      '포커스 아웃라인 제거 — focus-visible: 로 대체 링을 제공하지 않으면 키보드 사용자가 위치를 잃는다',
  },
  {
    id: 'tailwind-numeric-scale',
    severity: 'info',
    ref: 'CLAUDE.md §1 — Tailwind 기본 스케일은 OCB 스케일과 다름',
    re: new RegExp(
      `\\b(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|w|h|size|rounded|text)-(?:0\\.5|1\\.5|2\\.5|3\\.5|\\d{1,2})\\b`,
      'g'
    ),
    describe: (m) =>
      `Tailwind 기본 스케일 — OCB 토큰을 우회함 (${m}). 임의값 [var(--token)] 형태로 명시할 것`,
  },
]

/* ══════════════════════════════════════════════════════════
   3. 스캔
   ══════════════════════════════════════════════════════════ */

const SCAN_EXT = new Set(['.ts', '.tsx'])
const SKIP_DIR = new Set(['node_modules', '.git', 'dist', 'storybook-static', '.claude'])

function walk(dir, out = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const e of entries) {
    if (SKIP_DIR.has(e)) continue
    const abs = join(dir, e)
    const st = statSync(abs)
    if (st.isDirectory()) walk(abs, out)
    else if (SCAN_EXT.has(extname(e))) out.push(abs)
  }
  return out
}

/** 라인이 주석인지 (전부는 못 잡지만 명백한 건 거른다) */
function isComment(line) {
  const t = line.trim()
  // JSX 주석 {/* ... */} 도 주석이다. 이걸 빼먹어서 주석 안의 px가 결정 큐에 올라온 적이 있다.
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('{/*')
}

function scanFile(abs) {
  const rel = relative(ROOT, abs)
  const src = readFileSync(abs, 'utf8')
  const lines = src.split('\n')
  const findings = []
  const isStory = /\.stories\.tsx?$/.test(rel)
  const isTokenFile = /src\/tokens\//.test(rel)
  const namespaces = namespacesForFile(rel)

  lines.forEach((line, i) => {
    if (isComment(line)) return
    for (const rule of RULES) {
      const re = new RegExp(rule.re.source, rule.re.flags)
      let m
      while ((m = re.exec(line))) {
        if (rule.id === 'arbitrary-px') {
          const utility = m[1]
          const px = parseFloat(m[2])
          const kind = UTILITY_KIND[utility]
          if (!kind) continue
          let s = suggestToken(kind, px, namespaces, utility, familiesOnLine(line))

          // 타이포는 줄 단위로 스텝을 확정해 size/lh/tracking 짝을 맞춘다
          const TS_PROP = { text: 'size', leading: 'lh', tracking: 'tracking' }
          let offScale = false
          if (TS_PROP[utility]) {
            const step = typesetStepForLine(line)
            if (step === 'OFF_SCALE') {
              offScale = true
              if (s) s = { tokens: s.tokens, confident: false }
            } else {
              const want = step && TYPESET[step] && TYPESET[step][TS_PROP[utility]]
              if (step && want === `${px}px`) {
                s = { tokens: [`--typeset-${step}-${TS_PROP[utility]}`], confident: true }
              }
            }
          }

          const isFixedWidth = kind === 'sizing' && /^(w|min-w|max-w)$/.test(utility)
          let message
          if (isFixedWidth) {
            message = '고정 px 너비 — 컴포넌트는 w-full 이 기본. 너비는 부모가 결정 (§4)'
          } else if (!s) {
            message = `${kind} 하드코딩 ${px}px — 대응 토큰 없음. 디자이너 확인 후 토큰 신설 필요`
          } else if (offScale) {
            message = `${kind} 하드코딩 ${px}px — 이 size/line-height 조합은 typeset 스케일에 없음. 디자이너 확인 필요 (스케일에 추가할 값인지, 오기입인지)`
          } else if (s.confident) {
            const alt = s.tokens.length > 1 ? ` (후보: ${s.tokens.slice(1).join(', ')})` : ''
            message = `${kind} 하드코딩 ${px}px — [var(${s.tokens[0]})] 로 교체${alt}`
          } else {
            message = `${kind} 하드코딩 ${px}px — 네임스페이스·축이 맞는 토큰 없음. var(${s.tokens[0]})는 값만 일치 → 그대로 쓰지 말 것. Figma 원본 확인 후 토큰 신설 또는 기존 토큰 확인 필요`
          }
          findings.push({
            file: rel,
            line: i + 1,
            rule: isFixedWidth ? 'fixed-px-width' : rule.id,
            severity: isFixedWidth ? 'error' : downgrade(rule.severity, isStory),
            ref: isFixedWidth ? 'CLAUDE.md §4 고정 px 너비 금지' : rule.ref,
            match: m[0],
            confident: isFixedWidth ? false : !!(s && s.confident),
            message,
            snippet: line.trim().slice(0, 120),
          })
        } else {
          // 토큰 파일 안의 primitive hex는 정상
          if (isTokenFile && rule.id === 'raw-hex-color') continue
          // 같은 요소에 focus-visible 대체 링이 있으면 아웃라인 제거는 정당하다
          if (rule.id === 'a11y-focus-removed' && /focus-visible:/.test(line)) continue
          findings.push({
            file: rel,
            line: i + 1,
            rule: rule.id,
            severity: downgrade(rule.severity, isStory),
            ref: rule.ref,
            match: m[0],
            message: rule.describe(m[0], namespaces),
            snippet: line.trim().slice(0, 120),
          })
        }
        if (m.index === re.lastIndex) re.lastIndex++
      }
    }
  })
  return findings
}

/** stories 파일은 데모 데이터라 한 단계 낮춘다 */
function downgrade(sev, isStory) {
  if (!isStory) return sev
  if (sev === 'error') return 'warn'
  return 'info'
}

/* ══════════════════════════════════════════════════════════
   4. 기준선(baseline) — 기존 부채는 통과, 신규만 차단
   ══════════════════════════════════════════════════════════ */

function fingerprint(f) {
  return `${f.file}|${f.rule}|${f.match}`
}

function loadBaseline() {
  if (!existsSync(BASELINE_PATH)) return null
  try {
    return JSON.parse(readFileSync(BASELINE_PATH, 'utf8'))
  } catch {
    return null
  }
}

function toCounts(findings) {
  const counts = {}
  for (const f of findings) {
    const k = fingerprint(f)
    counts[k] = (counts[k] || 0) + 1
  }
  return counts
}

/**
 * 토큰화하지 않기로 확정한 값은 스캔 결과에서도 뺀다.
 * 기준선(baseline)이 "이미 있는 부채" 라면, 원장은 "부채가 아니라고 판단한 것" 이다.
 * 둘을 섞지 않는다 — 원장 항목은 기준선을 갱신해도 다시 올라오지 않는다.
 */
let DECIDED = null
function loadDecided() {
  if (DECIDED) return DECIDED
  DECIDED = []
  try {
    const raw = JSON.parse(readFileSync(join(ROOT, 'scripts', 'token-decisions.json'), 'utf8'))
    for (const d of raw.keep || []) for (const r of d.rules || []) DECIDED.push(r)
  } catch { /* 원장이 없으면 전부 보고한다 */ }
  return DECIDED
}
function filterDecided(findings) {
  const rules = loadDecided()
  if (!rules.length) return findings
  return findings.filter((f) => {
    const px = /(-?\d+(?:\.\d+)?)px/.exec(f.match || '')
    if (!px) return true
    return !rules.some(
      (r) => r.file === f.file && r.px.includes(px[1]) && (r.line == null || r.line === f.line)
    )
  })
}

function filterNew(findings, baseline) {
  if (!baseline) return findings
  const seen = {}
  const out = []
  for (const f of findings) {
    const k = fingerprint(f)
    seen[k] = (seen[k] || 0) + 1
    const allowed = baseline.counts[k] || 0
    if (seen[k] > allowed) out.push(f)
  }
  return out
}

/* ══════════════════════════════════════════════════════════
   5. CLI
   ══════════════════════════════════════════════════════════ */

const C = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
}

const SEV_LABEL = {
  error: C.red('error'),
  warn: C.yellow('warn '),
  info: C.gray('info '),
}

export function scan(targets) {
  const files = []
  for (const t of targets) {
    const abs = resolve(ROOT, t)
    if (!existsSync(abs)) continue
    const st = statSync(abs)
    if (st.isDirectory()) walk(abs, files)
    else if (SCAN_EXT.has(extname(abs))) files.push(abs)
  }
  return files.flatMap(scanFile)
}

function main() {
  const argv = process.argv.slice(2)
  const flags = new Set(argv.filter((a) => a.startsWith('--')))

  // 오타난 플래그를 조용히 무시하면 안 된다. `--update-baseline` 을 쳐놓고
  // 기준선을 갱신했다고 믿은 적이 있다 — 스캔은 돌고 파일은 그대로였다.
  const KNOWN = new Set(['--all', '--baseline', '--json', '--strict', '--write-baseline', '--lines'])
  const unknown = [...flags].filter((f) => !KNOWN.has(f.split('=')[0]))
  if (unknown.length) {
    console.error(`${C.red('✗')} 알 수 없는 옵션: ${unknown.join(', ')}`)
    console.error(C.gray(`   쓸 수 있는 옵션: ${[...KNOWN].join(' ')}`))
    return 2
  }
  const targets = argv.filter((a) => !a.startsWith('--'))
  if (!targets.length) targets.push('src')

  if (TOKEN_PROBLEMS.length) {
    console.log(C.red('✗ 토큰 소스가 깨져 있습니다 — 아래를 먼저 고치세요.'))
    console.log(C.gray('  파일에는 보이지만 브라우저는 무시하는 선언이 있습니다. 이 토큰을 참조한 코드는 조용히 깨집니다.\n'))
    for (const p of TOKEN_PROBLEMS) {
      console.log(`  ${C.cyan(p.file)}:${p.line}`)
      console.log(`     ${p.snippet}`)
      console.log(`     ${C.yellow(p.why)}`)
    }
    console.log('')
    return 1
  }

  const all = scan(targets)

  if (flags.has('--write-baseline')) {
    const full = scan(['src'])
    const payload = {
      generated: new Date().toISOString(),
      note: '기존 부채 스냅샷. 신규 위반만 차단하기 위한 기준선. 부채를 갚으면 --write-baseline 으로 갱신.',
      total: full.length,
      bySeverity: tally(full),
      counts: toCounts(full),
    }
    writeFileSync(BASELINE_PATH, JSON.stringify(payload, null, 2) + '\n')
    console.log(
      `${C.green('✓')} 기준선 저장: ${relative(ROOT, BASELINE_PATH)} (${full.length}건 기록)`
    )
    console.log(C.gray('  이제부터 --baseline 플래그로 신규 위반만 검사합니다.'))
    return 0
  }

  const baseline = flags.has('--baseline') ? loadBaseline() : null
  const findings = filterDecided(flags.has('--baseline') ? filterNew(all, baseline) : all)

  if (flags.has('--json')) {
    console.log(JSON.stringify({ findings, tally: tally(findings) }, null, 2))
  } else {
    report(findings, all, !!baseline, flags)
  }

  const errors = findings.filter((f) => f.severity === 'error').length
  const warns = findings.filter((f) => f.severity === 'warn').length
  if (errors > 0) return 1
  if (flags.has('--strict') && warns > 0) return 1
  return 0
}

function tally(findings) {
  return findings.reduce(
    (acc, f) => ((acc[f.severity] = (acc[f.severity] || 0) + 1), acc),
    { error: 0, warn: 0, info: 0 }
  )
}

function report(findings, all, usedBaseline, flags) {
  const showInfo = flags.has('--all') || flags.has('--strict')
  const shown = findings.filter((f) => showInfo || f.severity !== 'info')

  if (!shown.length) {
    const t = tally(all)
    console.log(`${C.green('✓')} 디자인 토큰 검사 통과${usedBaseline ? ' (신규 위반 없음)' : ''}`)
    if (usedBaseline && all.length) {
      console.log(
        C.gray(
          `  기존 부채 ${all.length}건은 기준선에 기록되어 있습니다 (error ${t.error} / warn ${t.warn} / info ${t.info}).`
        )
      )
    }
    return
  }

  const byFile = {}
  for (const f of shown) (byFile[f.file] ||= []).push(f)

  console.log('')
  for (const [file, list] of Object.entries(byFile)) {
    console.log(C.bold(C.cyan(file)))
    for (const f of list.sort((a, b) => a.line - b.line)) {
      console.log(
        `  ${String(f.line).padStart(4)}:  ${SEV_LABEL[f.severity]}  ${C.bold(f.match)}  ${C.gray(`[${f.rule}]`)}`
      )
      console.log(`        ${f.message}`)
      console.log(`        ${C.gray(f.ref)}`)
    }
    console.log('')
  }

  const t = tally(shown)
  const parts = []
  if (t.error) parts.push(C.red(`error ${t.error}`))
  if (t.warn) parts.push(C.yellow(`warn ${t.warn}`))
  if (t.info) parts.push(C.gray(`info ${t.info}`))
  console.log(
    `${usedBaseline ? '신규 위반' : '위반'} ${shown.length}건  —  ${parts.join('  ')}`
  )
  if (!showInfo) {
    const hidden = findings.length - shown.length
    if (hidden > 0) console.log(C.gray(`(info ${hidden}건 숨김 — --all 로 표시)`))
  }
}

// 경로에 공백이 있으면 file:// 문자열 비교가 깨진다 (예: 'Claude test' -> 'Claude%20test')
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  // process.exit()은 파이프로 나가는 stdout을 잘라먹는다. exitCode만 세팅하고 자연 종료.
  process.exitCode = main()
}
