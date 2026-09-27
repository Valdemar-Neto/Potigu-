import { Canvas } from '@react-three/fiber'
import { OceanWaves } from './OceanWaves'
import { ShrimpParticles } from './ShrimpParticles'

type Props = {
  progress: React.RefObject<number>
  active: boolean
}

/** Carregado sob demanda (React.lazy) — mantém three.js fora do bundle inicial. */
export default function HeroScene({ progress, active }: Props) {
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.2, 6.5], fov: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <OceanWaves />
      <ShrimpParticles progress={progress} count={isSmall ? 3200 : 6500} />
    </Canvas>
  )
}
