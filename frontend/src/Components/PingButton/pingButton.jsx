import React, { useState } from 'react'
import Ping from '../../Audio/Ping.mp3'
const PingButton = () => {
  const play = () => {
    new Audio(Ping)
  }

  const rainbowColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet'
  ]
  let colorIndex = 0
  const changeColor = () => {
    if (colorIndex === rainbowColors.length - 1) {
      colorIndex = 0
    } else {
      colorIndex++
    }
    return rainbowColors[colorIndex]
  }

  return (
    <div>
      <button onClick={play}>Ping</button>
    </div>
  )
}

export default PingButton
