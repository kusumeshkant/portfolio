/**
 * TechGlobe
 * A rotating wireframe globe with labelled technology nodes.
 * Used in the Skills section to add 3D depth.
 *
 * Architecture:
 *  - Sphere geometry (wireframe) as the globe skeleton
 *  - Billboard <Html> nodes placed at lat/long positions for tech labels
 *  - Auto-rotates on Y axis, pauses on hover
 */
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sphere } from '@react-three/drei'
import * as THREE from 'three'

/** Convert lat/long degrees → 3D point on a sphere of radius r */
function latLongToVec3(lat, lon, r = 2.2) {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

const NODES = [
  { tech: 'Flutter',    lat:  30, lon:  -30, color: '#54C5F8' },
  { tech: 'React',      lat:  50, lon:   60, color: '#61DAFB' },
  { tech: 'Node.js',    lat: -20, lon:  120, color: '#68A063' },
  { tech: 'Firebase',   lat: -40, lon:  -60, color: '#FFA000' },
  { tech: 'GraphQL',    lat:  10, lon: -120, color: '#E10098' },
  { tech: 'AWS',        lat:  70, lon:  150, color: '#FF9900' },
  { tech: 'Docker',     lat: -60, lon:   30, color: '#2496ED' },
  { tech: 'MongoDB',    lat:  20, lon:   -5, color: '#4DB33D' },
  { tech: 'Azure',      lat: -10, lon:   90, color: '#0089D6' },
]

function Globe({ paused }) {
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (!groupRef.current || paused) return
    groupRef.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={groupRef}>
      {/* Globe skeleton */}
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial
          color="#4FC3F7"
          wireframe
          transparent
          opacity={0.06}
        />
      </Sphere>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.005, 8, 120]} />
        <meshBasicMaterial color="#4FC3F7" transparent opacity={0.15} />
      </mesh>

      {/* Tech nodes */}
      {NODES.map(({ tech, lat, lon, color }) => {
        const pos = latLongToVec3(lat, lon, 2.2)
        return (
          <group key={tech} position={pos}>
            {/* Glowing dot */}
            <mesh>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>

            {/* HTML label — always faces the camera */}
            <Html
              center
              distanceFactor={5}
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '9px',
                  color: color,
                  background: 'rgba(8,11,20,0.7)',
                  border: `1px solid ${color}40`,
                  borderRadius: '4px',
                  padding: '2px 6px',
                  letterSpacing: '0.05em',
                  marginTop: '-16px',
                  display: 'block',
                }}
              >
                {tech}
              </span>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

export default function TechGlobe() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="w-full h-[420px] md:h-[520px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#4FC3F7" />
        <Globe paused={paused} />
      </Canvas>
    </div>
  )
}
