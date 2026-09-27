/**
 * Gera as nuvens de pontos da cena do hero:
 * - `shrimp`: silhueta estilizada do camarão (corpo curvado, cabeça, antenas, patas e leque da cauda)
 * - `powder`: monte de pó para onde as partículas "caem" com o scroll
 */

type Vec2 = [number, number]

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function spine(s: number): { p: Vec2; n: Vec2; w: number } {
  // corpo em "C" aberto para a direita: de 80° (topo) até 320° (base direita)
  const a0 = (80 * Math.PI) / 180
  const a1 = (320 * Math.PI) / 180
  const a = a0 + (a1 - a0) * s
  const r = 1.3 * (1 - 0.25 * s)
  const p: Vec2 = [Math.cos(a) * r, Math.sin(a) * r]
  const n: Vec2 = [Math.cos(a), Math.sin(a)]
  // afina em direção à cauda, com leve ondulação que sugere os segmentos
  const w = 0.5 * (1 - 0.65 * s) * (0.88 + 0.12 * Math.cos(s * Math.PI * 14))
  return { p, n, w }
}

function quad(p0: Vec2, c: Vec2, p1: Vec2, t: number): Vec2 {
  const u = 1 - t
  return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]
}

function sampleShrimpPoint(): Vec2 {
  const k = Math.random()
  if (k < 0.62) {
    const s = Math.pow(Math.random(), 0.9)
    const { p, n, w } = spine(s)
    const u = rand(-1, 1)
    return [p[0] + n[0] * u * w, p[1] + n[1] * u * w]
  }
  if (k < 0.8) {
    // cabeça (carapaça) — elipse inclinada partindo do topo do corpo para a direita
    const t = Math.random() * Math.PI * 2
    const r = Math.sqrt(Math.random())
    const x = Math.cos(t) * 0.62 * r
    const y = Math.sin(t) * 0.3 * r
    const rot = -0.12
    return [0.72 + x * Math.cos(rot) - y * Math.sin(rot), 1.3 + x * Math.sin(rot) + y * Math.cos(rot)]
  }
  if (k < 0.9) {
    // antenas
    const t = Math.random()
    const a = Math.random() < 0.5
    const p = a ? quad([1.25, 1.36], [2.1, 1.95], [3.1, 1.25], t) : quad([1.25, 1.24], [2.2, 1.2], [2.9, 0.55], t)
    return [p[0] + rand(-0.015, 0.015), p[1] + rand(-0.015, 0.015)]
  }
  if (k < 0.96) {
    // patas: pequenos traços na parte interna do corpo
    const leg = Math.floor(Math.random() * 6)
    const s = 0.08 + leg * 0.07
    const { p, n, w } = spine(s)
    const t = Math.random()
    const len = 0.35
    return [p[0] - n[0] * (w + t * len) + rand(-0.01, 0.01), p[1] - n[1] * (w + t * len) - t * 0.08]
  }
  // leque da cauda
  const { p } = spine(1)
  const ang = rand(-0.2, 1.1)
  const r = Math.sqrt(Math.random()) * 0.55
  return [p[0] + Math.cos(ang) * r, p[1] + Math.sin(ang) * r * 0.8]
}

export function createPointClouds(count: number) {
  const shrimp = new Float32Array(count * 3)
  const powder = new Float32Array(count * 3)
  const random = new Float32Array(count * 4)

  for (let i = 0; i < count; i++) {
    const [x, y] = sampleShrimpPoint()
    shrimp.set([x, y, rand(-0.12, 0.12)], i * 3)

    // monte de pó (cone achatado)
    const R = 2.3
    const r = R * Math.sqrt(Math.random())
    const a = Math.random() * Math.PI * 2
    const h = 0.95 * (1 - r / R)
    powder.set([0.4 + Math.cos(a) * r, -1.75 + h * rand(0.85, 1), Math.sin(a) * r * 0.45], i * 3)

    random.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
  }

  return { shrimp, powder, random }
}
