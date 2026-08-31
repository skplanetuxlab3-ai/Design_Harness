#!/usr/bin/env node
/**
 * list-figma-assets — 코드에 박힌 Figma 임시 에셋 URL을 전수 조사한다.
 *
 * 이 URL들은 Figma MCP가 발급한 7일 만료 링크라 이미 전부 404다.
 * 코드에는 node ID가 남아 있지 않아 역추적이 불가능하므로,
 * 변수명 + 사용 문맥 + (토큰에서 가져온) 컴포넌트 Figma node를 묶어
 * Figma에서 다시 export하기 위한 체크리스트를 만든다.
 *
 * 사용법:
 *   node scripts/list-figma-assets.mjs              # 표로 출력
 *   node scripts/list-figma-assets.mjs --md         # 마크다운
 *   node scripts/list-figma-assets.mjs --json       # JSON
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const URL_RE = /https?:\/\/www\.figma\.com\/api\/mcp\/asset\/([a-f0-9-]+)/

/* 컴포넌트 → Figma node : 토큰 CSS 주석에서 수집 */
function loadNodeMap() {
  const map = {}
  for (const f of ['src/tokens/spacing.css', 'src/tokens/colors.css', 'src/tokens/typography.css']) {
    let src
    try { src = readFileSync(join(ROOT, f), 'utf8') } catch { continue }
    for (const m of src.matchAll(/\/\*+\s*([^*\n]*?)\s*\(?(?:Figma )?node:? ?([0-9]+[-:][0-9]+)/g)) {
      const label = m[1].replace(/[—\-–]\s*(컴포넌트|공통)?\s*스펙.*$/, '').trim()
      if (label) map[label] = m[2].replace(':', '-')
    }
  }
  return map
}
const NODE_MAP = loadNodeMap()

/* 컴포넌트 파일 → 토큰 주석의 라벨 (이름이 다른 경우만 명시) */
const COMPONENT_ALIAS = {
  BrandsFilter: ['BrandBar', 'BrandScrollBar'],
  CategoryFilter: ['CategoryBar'],
  Chip: ['CategoryBar', 'EventChip'],
  ChipMenu: ['EventChip', 'Chip menu 배치'],
  BottomNavBar: ['BottomAppbar'],
  SocialDealCard: ['SocialDeal 카드'],
  GroupbuyingHome: ['Groupbuying List 배치', '공동구매 화면'],
  TodayDealHome: ['오늘특가 화면'],
  TopBanner: ['Top Banner 배치'],
  EcouponHome: ['e쿠폰 화면'],
  CategorySheet: ['카테고리별 브랜드 바텀시트'],
  OrderHistoryCard: ['Order History 카드'],
  CheckoutPanel: ['Checkout 결제 화면'],
}

function nodesFor(component) {
  const labels = COMPONENT_ALIAS[component] || [component]
  const out = []
  const seen = new Set()
  for (const l of labels) {
    for (const [k, v] of Object.entries(NODE_MAP)) {
      if ((k === l || k.startsWith(l)) && !seen.has(v)) {
        seen.add(v)
        out.push({ label: k, node: v })
      }
    }
  }
  return out
}

/* 스캔 */
const files = []
;(function walk(d) {
  for (const e of readdirSync(d)) {
    if (['node_modules', '.git', 'dist'].includes(e)) continue
    const p = join(d, e)
    statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(e) && files.push(p)
  }
})(join(ROOT, 'src'))

const assets = []
for (const abs of files.sort()) {
  const rel = relative(ROOT, abs)
  const component = /components\/([^/]+)\//.exec(rel)?.[1] || 'App'
  const lines = readFileSync(abs, 'utf8').split('\n')
  let objName = null

  lines.forEach((line, i) => {
    const objStart = /^\s*const\s+([A-Za-z_][\w]*)\s*(?::[^=]+)?=\s*\{/.exec(line)
    if (objStart) objName = objStart[1]
    if (/^\s*\}/.test(line)) objName = null
    const m = URL_RE.exec(line)
    if (!m) return

    const c = /^\s*(?:export\s+)?const\s+([A-Za-z_][\w]*)\s*(?::[^=]+)?=\s*['"]/.exec(line)
    const k = /^\s*['"]?([A-Za-z_][\w]*)['"]?\s*:\s*['"]/.exec(line)
    const name = c ? c[1] : k ? (objName ? objName + '.' : '') + k[1] : '(인라인)'

    // 사용 문맥
    const bare = name.split('.').pop()
    let hint = null
    for (let j = 0; j < lines.length; j++) {
      if (j === i || !new RegExp('\\b' + bare + '\\b').test(lines[j])) continue
      const alt = /alt=["']([^"']+)["']/.exec(lines[j])
      const prop = new RegExp('(\\w+)=\\{[^}]*\\b' + bare + '\\b').exec(lines[j])
      const mask = /mask|Mask/.test(lines[j]) ? 'CSS mask' : null
      hint = alt ? `alt="${alt[1]}"` : mask || (prop ? `<${prop[1]}>` : null)
      if (hint) break
    }

    // 종류 추정
    const n = name.toLowerCase()
    const type = /mask/.test(n) ? 'mask' : /icon|ico_/.test(n) ? 'icon'
      : /banner|img|image/.test(n) ? 'image' : /line|vector|ellipse|circle/.test(n) ? 'shape' : '?'

    assets.push({ component, file: rel, line: i + 1, name, uuid: m[1], type, hint, nodes: nodesFor(component) })
  })
}

/* 출력 */
const argv = process.argv.slice(2)
if (argv.includes('--json')) {
  console.log(JSON.stringify(assets, null, 2))
} else if (argv.includes('--md')) {
  console.log('# Figma 에셋 현황\n')
  console.log('> **결정 (2026-08-31)**: 남은 항목은 디자인 시스템 에셋이 아니라 **예시/더미 이미지**다.')
  console.log('> 복구하지 않는다. 디자인 시스템 구성요소(아이콘·로고·마스크)는 모두 `src/assets/`로 옮겼다.\n')
  console.log(`> 코드에 박힌 Figma MCP 임시 에셋 URL **${assets.length}개**. 전부 만료(404)되어 이미지가 깨진 상태다.`)
  console.log('> URL의 UUID는 MCP가 그때그때 발급한 임시 ID라 Figma 노드로 역추적이 **불가능**하다.')
  console.log('> 아래 변수명과 사용 문맥을 단서로 Figma에서 다시 찾아 `src/assets/`로 export할 것.\n')
  console.log('> 파일명에 node ID를 넣어두면 다음엔 출처가 끊기지 않는다 — `icon-fire_20312-39355.svg`\n')
  const byComp = {}
  for (const a of assets) (byComp[a.component] ??= []).push(a)
  for (const [comp, list] of Object.entries(byComp)) {
    const nodes = list[0].nodes
    console.log(`\n## ${comp} (${list.length}개)\n`)
    if (nodes.length) {
      console.log('Figma 참고 노드: ' + nodes.map((n) => `\`${n.node}\` (${n.label})`).join(', ') + '\n')
    } else {
      console.log('_토큰에 대응 node 주석 없음 — Figma에서 직접 탐색 필요_\n')
    }
    console.log('| ☐ | 변수명 | 종류 | 사용 문맥 | 위치 |')
    console.log('|---|--------|------|-----------|------|')
    for (const a of list) {
      console.log(`| ☐ | \`${a.name}\` | ${a.type} | ${a.hint || '—'} | ${a.file.replace('src/components/', '')}:${a.line} |`)
    }
  }
} else {
  console.log(`Figma 임시 에셋 ${assets.length}개 (전부 만료됨)\n`)
  const byComp = {}
  for (const a of assets) (byComp[a.component] ??= []).push(a)
  for (const [comp, list] of Object.entries(byComp)) {
    const nodes = list[0].nodes
    console.log(`── ${comp}  (${list.length})` + (nodes.length ? '   node: ' + nodes.map((n) => n.node).join(', ') : '   node 없음'))
    for (const a of list) {
      console.log('     ' + a.name.padEnd(28) + a.type.padEnd(7) + (a.hint || '—'))
    }
  }
}
