import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Box = props => {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.y += 0.01))
  return (
    <>
      <mesh
        className='box'
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={event => click(!clicked)}
        onPointerOver={event => hover(true)}
        onPointerOut={event => hover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
      </mesh>
    </>
  )
}

export default Box
