import React, { useRef, useState, useCallback } from 'react'
import { animated, useSpring } from 'react-spring'

const useAnimatedProps = () => {
  const [animatedProps, setAnimatedProps] = useSpring({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
  })
  return [animatedProps, setAnimatedProps]
}

const Card = ({ children }) => {
  const ref = useRef()
  const [isHovered, setHovered] = useState(false)
  const [animatedProps, setAnimatedProps] = useAnimatedProps()
  const dampen = 50

  const handleMouseEnter = () => setHovered(true)

  const handleMouseLeave = () => {
    setHovered(false)
    setAnimatedProps({ xys: [0, 0, 1] })
  }

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const x = clientX - left - width / 2
      const y = clientY - top - height / 2
      setAnimatedProps({ xys: [-y / dampen, x / dampen, 1.07] })
    },
    [dampen, setAnimatedProps]
  )

  return (
    <animated.div
      ref={ref}
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: animatedProps.xys.to(
          (x, y, s) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        )
      }}
    >
      {children}
    </animated.div>
  )
}

export default Card
