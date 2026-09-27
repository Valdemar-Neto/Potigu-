import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    float h = sin(p.x * 0.55 + uTime * 0.7) * 0.18
            + sin(p.x * 1.3 - uTime * 1.1 + p.y * 0.8) * 0.07
            + sin(p.y * 1.6 + uTime * 0.5) * 0.09;
    p.z += h;
    vHeight = h;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uCrest;
  varying float vHeight;
  varying vec2 vUv;

  void main() {
    float t = smoothstep(-0.25, 0.3, vHeight);
    vec3 col = mix(uDeep, uMid, t);
    col = mix(col, uCrest, smoothstep(0.24, 0.36, vHeight) * 0.15);
    // funde com o fundo nas bordas
    float fade = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.55, vUv.y) * smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
    gl_FragColor = vec4(col, fade * 0.95);
    #include <colorspace_fragment>
  }
`

export function OceanWaves() {
  const material = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#0B2B30') },
      uMid: { value: new THREE.Color('#2A6B72') },
      uCrest: { value: new THREE.Color('#82977A') },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta
  })

  return (
    <mesh rotation={[-Math.PI / 2.25, 0, 0]} position={[0, -2.35, -2]}>
      <planeGeometry args={[22, 9, 160, 60]} />
      <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  )
}
