/**
 * Gera `src/components/map/nordesteMap.ts`: grade de pontos recortada pelos limites reais
 * dos estados (CE, RN e vizinhos) + contornos simplificados do CE e do RN.
 *
 * Uso: node scripts/build-map.mjs [caminho-ou-url-do-geojson]
 */
import { readFile, writeFile } from 'node:fs/promises'

const SOURCE =
  process.argv[2] ?? 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson'

// Enquadramento: Ceará + Rio Grande do Norte, com um pouco de PI/PB/PE e de mar ao norte
const BOX = { lonMin: -41.9, lonMax: -34.3, latMin: -8.3, latMax: -2.2 }
const WIDTH = 800
const STEP = 10 // distância entre pontos, em px do viewBox
const HIGHLIGHT = { CE: 1, RN: 2 }

const latMid = ((BOX.latMin + BOX.latMax) / 2) * (Math.PI / 180)
const k = WIDTH / ((BOX.lonMax - BOX.lonMin) * Math.cos(latMid))
const HEIGHT = Math.round((BOX.latMax - BOX.latMin) * k)

const project = ([lon, lat]) => [(lon - BOX.lonMin) * Math.cos(latMid) * k, (BOX.latMax - lat) * k]

function inRing(x, y, ring) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

// polígono = [anel externo, ...buracos]
const inPolygon = (x, y, poly) => inRing(x, y, poly[0]) && !poly.slice(1).some((h) => inRing(x, y, h))

function simplify(ring, minDist) {
  const out = [ring[0]]
  for (const p of ring) {
    const q = out[out.length - 1]
    if (Math.hypot(p[0] - q[0], p[1] - q[1]) >= minDist) out.push(p)
  }
  return out
}

const raw = SOURCE.startsWith('http') ? await (await fetch(SOURCE)).text() : await readFile(SOURCE, 'utf8')
const geo = JSON.parse(raw)

const states = geo.features.map((f) => {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates
  return { uf: f.properties.sigla, polys: polys.map((p) => p.map((ring) => ring.map(project))) }
})

const dots = []
for (let y = STEP / 2; y < HEIGHT; y += STEP) {
  // linhas alternadas deslocadas meio passo: padrão hexagonal, mais orgânico
  const offset = Math.round(y / STEP) % 2 ? STEP / 2 : 0
  for (let x = STEP / 2 + offset; x < WIDTH; x += STEP) {
    const st = states.find((s) => s.polys.some((p) => inPolygon(x, y, p)))
    if (st) dots.push(Math.round(x * 10) / 10, Math.round(y * 10) / 10, HIGHLIGHT[st.uf] ?? 0)
  }
}

const outline = (uf) =>
  states
    .find((s) => s.uf === uf)
    .polys.map((p) => simplify(p[0], 2.5))
    .filter((ring) => ring.length > 8)
    .map((ring) => 'M' + ring.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z')
    .join('')

const file = `// Arquivo gerado por scripts/build-map.mjs — não edite à mão.
// Fonte: ${SOURCE}

export const MAP_BOX = ${JSON.stringify(BOX)} as const
export const MAP_SIZE = { width: ${WIDTH}, height: ${HEIGHT} } as const
export const MAP_K = ${k.toFixed(4)}
export const MAP_COS = ${Math.cos(latMid).toFixed(6)}

/** Pontos em trios [x, y, estado] — estado: 0 = vizinho, 1 = CE, 2 = RN */
export const MAP_DOTS: readonly number[] = [${dots.join(',')}]

export const OUTLINE_CE = '${outline('CE')}'
export const OUTLINE_RN = '${outline('RN')}'

/** Converte [longitude, latitude] para coordenadas do viewBox */
export const projectLonLat = (lon: number, lat: number): [number, number] => [
  (lon - MAP_BOX.lonMin) * MAP_COS * MAP_K,
  (MAP_BOX.latMax - lat) * MAP_K,
]
`

await writeFile(new URL('../src/components/map/nordesteMap.ts', import.meta.url), file)
console.log(`viewBox ${WIDTH}x${HEIGHT} · ${dots.length / 3} pontos`)
