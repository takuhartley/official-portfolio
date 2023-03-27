import React from 'react'
import * as THREE from 'three'

const { meshStandardMaterial } = THREE

const Roads = () => {
  const streetWidth = 20
  const streetDepth = 2
  const streetColor = '#555'

  const street1 = (
    <mesh
      key='street1'
      position={[-50, 0.1, 0]}
      rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around x-axis to be parallel to ground
      receiveShadow
    >
      <planeGeometry attach='geometry' args={[100, streetWidth]} />
      <meshStandardMaterial attach='material' color={streetColor} />
    </mesh>
  )

  const street2 = (
    <mesh
      key='street2'
      position={[50, 0.1, 0]}
      rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around x-axis to be parallel to ground
      receiveShadow
    >
      <planeGeometry attach='geometry' args={[100, streetWidth]} />
      <meshStandardMaterial attach='material' color={streetColor} />
    </mesh>
  )

  const street3 = (
    <mesh
      key='street3'
      position={[0, 0.1, -50]}
      rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around x-axis to be parallel to ground
      receiveShadow
    >
      <planeGeometry attach='geometry' args={[100, streetWidth]} />
      <meshStandardMaterial attach='material' color={streetColor} />
    </mesh>
  )

  const street4 = (
    <mesh
      key='street4'
      position={[0, 0.1, 50]}
      rotation={[Math.PI / 2, 0, 0]} // Rotate 90 degrees around x-axis to be parallel to ground
      receiveShadow
    >
      <planeGeometry attach='geometry' args={[100, streetWidth]} />
      <meshStandardMaterial attach='material' color={streetColor} />
    </mesh>
  )

  return (
    <>
      {street1}
      {street2}
      {street3}
      {street4}
    </>
  )
}

export default Roads
