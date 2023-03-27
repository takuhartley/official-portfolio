import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial } from '@react-three/drei'

const Box = props => {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.y += 0.01))

  const colors = ['#008CBA', '#F44336', '#4CAF50', '#FFEB3B', '#9C27B0']

  const randomColor = () => {
    const color = colors[Math.floor(Math.random() * colors.length)]
    return color
  }

  return (
    <>
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={event => {
          click(!clicked)
          event.stopPropagation()
        }}
        onPointerOver={event => hover(true)}
        onPointerOut={event => hover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <MeshWobbleMaterial
          attach='material'
          color={clicked ? randomColor() : hovered ? '#00FF7F' : '#D3D3D3'}
          speed={2}
          factor={clicked ? 1.2 : hovered ? 0.6 : 0.4}
        />
      </mesh>
    </>
  )
}

export default Box
