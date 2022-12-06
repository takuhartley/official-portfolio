import React from 'react'
import { Canvas } from '@react-three/fiber'
import Box from '../Box/Box'
import './Logo.scss'

const Logo = () => {
  return (
    <div className='logo'>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </div>
  )
}

export default Logo
