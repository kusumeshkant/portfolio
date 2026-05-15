/**
 * FloatingShapes
 * The 3D interactive section — floating geometric objects that react to mouse.
 * Objects: tetrahedron, octahedron, torus, icosahedron
 * Mouse interaction: moves camera origin slightly → parallax feel
 */
import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMousePosition } from '@/hooks/useMousePosition'

/* ── Single floating shape ──────────────────────────────────────────── */
function FloatingShape({ geometry, position, speed, phase, color, scale = 1 }) {
  const mesh = useRef()

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.elapsedTime
    mesh.current.rotation.x = t * speed * 0.4
    mesh.current.rotation.y = t * speed * 0.6
    // Float up and down with individual phase offset
    mesh.current.position.y = position[1] + Math.sin(t * speed * 0.5 + phase) * 0.3
  })

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

/* ── Camera rig — follows mouse with spring ─────────────────────────── */
function CameraRig({ mouseX, mouseY }) {
  const { camera, size } = useThree()

  useFrame(() => {
    // Map mouse to small camera offset (max ±0.5 units)
    const targetX = (mouseX / size.width  - 0.5) * 1.2
    const targetY = (mouseY / size.height - 0.5) * -0.8

    // Lerp smoothly to target (factor 0.04 = slow, cinematic)
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ── Scene ──────────────────────────────────────────────────────────── */
function Scene({ mouseX, mouseY }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4FC3F7" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#8B5CF6" />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />

      <FloatingShape
        geometry={<octahedronGeometry args={[1.1]} />}
        position={[-2.5, 0.5, 0]}
        speed={0.5} phase={0} color="#4FC3F7" scale={1}
      />
      <FloatingShape
        geometry={<icosahedronGeometry args={[1, 0]} />}
        position={[2.8, -0.3, -1]}
        speed={0.35} phase={1.2} color="#8B5CF6" scale={0.9}
      />
      <FloatingShape
        geometry={<tetrahedronGeometry args={[1.2]} />}
        position={[0, 1.5, -1.5]}
        speed={0.6} phase={2.4} color="#4FC3F7" scale={0.7}
      />
      <FloatingShape
        geometry={<torusGeometry args={[0.9, 0.02, 8, 60]} />}
        position={[-1, -1.5, 0.5]}
        speed={0.4} phase={0.8} color="#8B5CF6" scale={1.1}
      />

      {/* Central holographic orb */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial
          color="#0D1117"
          emissive="#4FC3F7"
          emissiveIntensity={0.1}
          transparent
          opacity={0.85}
          roughness={0}
          metalness={0.3}
        />
      </mesh>

      {/* Outer glow ring around central orb */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.75, 0.005, 8, 100]} />
        <meshBasicMaterial color="#4FC3F7" transparent opacity={0.4} />
      </mesh>
    </>
  )
}

export default function FloatingShapes() {
  const { x: mouseX, y: mouseY } = useMousePosition()

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}
