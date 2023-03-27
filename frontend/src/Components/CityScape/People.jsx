import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useFBX, useAnimations } from '@react-three/drei'
import { Text } from '@react-three/drei'
import RobotoRegular from './Fonts/Roboto-Regular.ttf'

const People = ({ position, buildings, cars }) => {
  const model = useFBX('/Assets/Models/Walking.fbx')
  const { animations } = model
  const { actions } = useAnimations(animations)
  const ref = useRef()

  const { name, walkingSpeed, angleOffset } = useMemo(() => {
    const randomName = () => {
      const names = [
        'Alice',
        'Bob',
        'Charlie',
        'David',
        'Eve',
        'Frank',
        'Grace',
        'Heidi',
        'Ivan',
        'Jasmine',
        'Kate',
        'Leo',
        'Molly',
        'Nate',
        'Olivia',
        'Pam',
        'Quinn',
        'Ralph',
        'Sarah',
        'Tina',
        'Ursula',
        'Victor',
        'Wendy',
        'Xander',
        'Yara',
        'Zoe'
      ]
      return names[Math.floor(Math.random() * names.length)]
    }
    return {
      name: randomName(),
      walkingSpeed: 0.02 + 0.05 * Math.random(),
      angleOffset: Math.random() * Math.PI * 2
    }
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.position.x += walkingSpeed * Math.cos(t + angleOffset)
      ref.current.position.z += walkingSpeed * Math.sin(t + angleOffset)

      // Avoid collisions with buildings and cars
      buildings.concat(cars).forEach(object => {
        const distance = ref.current.position.distanceTo(object.position)
        if (distance < 3) {
          const direction = ref.current.position
            .clone()
            .sub(object.position)
            .normalize()
          ref.current.position.add(direction.multiplyScalar(3 - distance))
        }
      })
    }
  })

  useEffect(() => {
    console.log(animations) // Log animations to the console
    if (actions['mixamo.com']) {
      actions['mixamo.com'].play()
    }
  }, [actions, animations])

  const modelScale = 0.025
  return (
    <group
      ref={ref}
      position={[position.x, position.y, position.z]}
      scale={[modelScale, modelScale, modelScale]}
    >
      {model.children.map((child, index) => (
        <mesh key={index} geometry={child.geometry} material={child.material} />
      ))}
      <mesh position={[0, 3 / modelScale, 0]}>
        <Text
          color='#ffffff'
          font={RobotoRegular}
          fontSize={0.3 / modelScale}
          anchorX='center'
          anchorY='middle'
        >
          {name}
        </Text>
      </mesh>
    </group>
  )
}

export default People
