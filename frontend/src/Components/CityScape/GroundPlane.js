import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'

import grassTexture from './textures/grassy_cobblestone_diff_4k.jpg'
import {
  TextureLoader,
  RepeatWrapping,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh
} from 'three'

const GroundPlane = () => {
  const texture = useLoader(TextureLoader, grassTexture)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(100, 100)

  const geometry = new PlaneGeometry(1000, 1000)
  const material = new MeshStandardMaterial({ map: texture })
  const meshRef = useRef()

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <primitive object={geometry} attach='geometry' />
      <primitive object={material} attach='material' />
    </mesh>
  )
}

export default GroundPlane
