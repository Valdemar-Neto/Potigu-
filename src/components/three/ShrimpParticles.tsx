import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createPointClouds } from './shrimpShape'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aTarget;
  attribute vec4 aRandom;
  varying float vMix;
  varying float vTone;
  varying float vAlpha;

  float easeInOut(float t) { return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0; }

  void main() {
    // cada partícula começa a cair em um momento diferente
    float p = clamp((uProgress * 1.7 - aRandom.x * 0.7), 0.0, 1.0);
    float e = easeInOut(p);
    vec3 pos = mix(position, aTarget, e);
    // arco lateral durante a queda
    pos.x += sin(p * 3.14159) * (aRandom.y - 0.5) * 1.4;
    pos.z += sin(p * 3.14159) * (aRandom.z - 0.5) * 1.2;
    // flutuação suave
    float f = 1.0 - e * 0.85;
    pos.x += sin(uTime * 0.6 + aRandom.w * 6.28) * 0.025 * f;
    pos.y += cos(uTime * 0.8 + aRandom.y * 6.28) * 0.03 * f;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = uSize * (0.55 + aRandom.z * 0.9) * mix(1.0, 0.75, e);
    gl_PointSize = size * uPixelRatio * (1.0 / -mv.z);
    vMix = e;
    vTone = aRandom.w;
    vAlpha = 0.65 + aRandom.y * 0.35;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uCoral;
  uniform vec3 uCoralDark;
  uniform vec3 uSand;
  uniform vec3 uPowder;
  varying float vMix;
  varying float vTone;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.1, d);
    vec3 shrimp = mix(uCoral, vTone > 0.85 ? uSand : uCoralDark, vTone > 0.85 ? 0.6 : vTone * 0.35);
    vec3 powder = mix(uPowder, uCoral, vTone * 0.5);
    gl_FragColor = vec4(mix(shrimp, powder, vMix), soft * vAlpha);
    #include <colorspace_fragment>
  }
`

type Props = {
  progress: React.RefObject<number>
  count?: number
}

export function ShrimpParticles({ progress, count = 6000 }: Props) {
  const group = useRef<THREE.Group>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const { viewport, gl } = useThree()

  const geometry = useMemo(() => {
    const { shrimp, powder, random } = createPointClouds(count)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(shrimp, 3))
    g.setAttribute('aTarget', new THREE.BufferAttribute(powder, 3))
    g.setAttribute('aRandom', new THREE.BufferAttribute(random, 4))
    return g
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: 42 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
      uCoral: { value: new THREE.Color('#E87945') },
      uCoralDark: { value: new THREE.Color('#A94D24') },
      uSand: { value: new THREE.Color('#E9DFC9') },
      uPowder: { value: new THREE.Color('#C9793F') },
    }),
    [gl],
  )

  useFrame((state, delta) => {
    if (!material.current || !group.current) return
    const u = material.current.uniforms
    u.uTime.value += delta
    // suaviza o valor vindo do ScrollTrigger
    u.uProgress.value += (progress.current - u.uProgress.value) * Math.min(1, delta * 6)
    const g = group.current
    g.rotation.y += (state.pointer.x * 0.25 - g.rotation.y) * 0.04
    g.rotation.x += (-state.pointer.y * 0.12 - g.rotation.x) * 0.04
  })

  // no desktop o camarão ocupa a metade direita; no mobile fica acima do texto, menor.
  // A silhueta vai de x≈-1.3 a x≈3.1 (centro ≈ 0.9), por isso o deslocamento de -0.9·scale.
  const wide = viewport.width > 6
  // (no mobile o topo da silhueta, y≈1.95, fica logo abaixo do header e o texto vai para baixo)
  const scale = wide ? Math.min(0.8, viewport.width / 10) : viewport.width / 6
  const x = wide ? viewport.width * 0.25 - 0.9 * scale : -0.9 * scale
  const y = wide ? 0.2 : viewport.height / 2 - 0.35 - 1.95 * scale

  return (
    <group ref={group} position={[x, y, 0]} scale={scale}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  )
}
