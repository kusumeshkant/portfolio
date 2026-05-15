/**
 * HeroScene
 * The 3D background for the Hero section.
 *
 * What's in it:
 *  1. Particle field  – 2000 floating dots, slow drift animation
 *  2. Wireframe sphere – rotating icosahedron, the "orb" branded element
 *  3. Ambient + directional lighting for the orb
 *
 * Performance notes:
 *  - Uses BufferGeometry (no per-particle overhead)
 *  - useFrame is called once per animation tick (no setState)
 *  - Camera is fixed; only the mesh and particles rotate
 */
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ── Particles ─────────────────────────────────────────────────────── */
function Particles({ count = 2000 }) {
  const mesh = useRef()

  // Build positions once — useMemo prevents recompute on every render
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20  // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20  // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20  // z
    }
    return pos
  }, [count])

  // Rotate slowly every frame
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * 0.012
      mesh.current.rotation.x = clock.elapsedTime * 0.006
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#4FC3F7"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ── Wireframe Orb ─────────────────────────────────────────────────── */
function WireOrb() {
  const mesh = useRef()

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.x = clock.elapsedTime * 0.18
    mesh.current.rotation.y = clock.elapsedTime * 0.24
    // Gentle float on the Y axis
    mesh.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.12
  })

  return (
    <mesh ref={mesh} position={[2.5, 0, -2]}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshStandardMaterial
        color="#4FC3F7"
        wireframe
        transparent
        opacity={0.18}
        emissive="#4FC3F7"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

/* ── Inner glow sphere ─────────────────────────────────────────────── */
function GlowCore() {
  const mesh = useRef()
  useFrame(({ clock }) => {
    if (!mesh.current) return
    // Pulse the emissive intensity
    mesh.current.material.emissiveIntensity =
      0.08 + Math.sin(clock.elapsedTime * 1.2) * 0.04
    mesh.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.12
  })

  return (
    <mesh ref={mesh} position={[2.5, 0, -2]}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshStandardMaterial
        color="#0D1117"
        emissive="#4FC3F7"
        emissiveIntensity={0.08}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

/* ── Scene root ─────────────────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{
        antialias: true,
        alpha: true,             // transparent canvas background
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}            // cap pixel ratio — large scenes don't need 2×
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={0.8} color="#4FC3F7" />
      <pointLight position={[-4, -4, -4]} intensity={0.3} color="#8B5CF6" />

      {/* Scene objects */}
      <Particles count={1800} />
      <WireOrb />
      <GlowCore />
    </Canvas>
  )
}
