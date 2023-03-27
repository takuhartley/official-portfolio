import React, { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stats, Text } from '@react-three/drei'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Sky } from '@react-three/drei'
import * as THREE from 'three'
import GroundPlane from './GroundPlane.js'
import Buildings from './Buildings'
import Cars from './Cars'
import Roads from './Roads'
import People from './People'

const CityScape = () => {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
      }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[0, 10, 20]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Suspense fallback={null}>
        <Sky />
        <CityContent />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

const CityContent = () => {
  const carRef = useRef()
  const { camera } = useThree()

  // Set camera position and rotation
  camera.position.set(0, 3, 15)
  camera.rotation.set(-Math.PI / 12, 0, 0)

  // Generate array of 50 people with random positions
  const people = useMemo(() => {
    return Array.from({ length: 50 }, () => ({
      position: {
        x: Math.random() * 100 - 50,
        y: 0,
        z: Math.random() * -50 - 10
      }
    }))
  }, [])

  // Get building and car positions
  const buildings = useMemo(() => {
    // Replace with your logic for generating building positions
    return []
  }, [])

  const cars = useMemo(() => {
    // Replace with your logic for generating car positions
    return []
  }, [])

  return (
    <>
      <group position={[0, -2, 0]}>
        <GroundPlane />

        <Roads />
        {people.map((person, i) => (
          <People
            key={i}
            position={person.position}
            buildings={buildings}
            cars={cars}
          />
        ))}
        <Cars ref={carRef} />
      </group>
    </>
  )
}

export default CityScape
