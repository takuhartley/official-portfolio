import React, { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const { meshStandardMaterial } = THREE
const Cars = forwardRef((props, ref) => {
  const carGeometry = new THREE.BoxGeometry(2, 2, 5)

  const speed = useRef(Math.random() * 0.4 + 0.1)
  const direction = useRef(Math.random() > 0.5 ? 1 : -1)
  const turning = useRef(0)
  const turnSpeed = useRef(Math.random() * 0.01 + 0.005)

  useFrame(() => {
    if (ref.current.position.z > 20) {
      ref.current.position.z = -20
      ref.current.position.x = Math.random() * 10 - 5
    } else {
      ref.current.position.z += speed.current * direction.current
      turning.current += turnSpeed.current
      ref.current.position.x = Math.sin(turning.current) * 5
    }
  })

  return (
    <>
      <mesh position={[5, 0, -10]} ref={ref} geometry={carGeometry}>
        <meshStandardMaterial color={'#e74c3c'} />
      </mesh>
    </>
  )
})

export default Cars
