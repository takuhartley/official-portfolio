import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three' // Importing THREE module
import { Text } from '@react-three/drei'
import Box from '../Box/Box'
import './Logo.scss'

const AnimatedBox = animated(Box)

const Logo = () => {
  const { color } = useSpring({
    from: { color: '#f0f' },
    to: { color: '#0ff' },
    loop: { reverse: true },
    config: { duration: 2000 }
  })

  return (
    <div className='logo'>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <AnimatedBox
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
          onClick={() => console.log('clicked')}
        >
          <meshStandardMaterial attach='material' color={color} />
        </AnimatedBox>
        <Text
          position={[0, 0, 0]}
          fontSize={1}
          font='https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf'
        >
          React 3D
        </Text>
      </Canvas>
    </div>
  )
}

export default Logo
