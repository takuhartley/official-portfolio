import React from 'react'
import * as THREE from 'three'
import Quadtree from 'quadtree-lib'

const Buildings = () => {
  const buildingGeometry = new THREE.BoxGeometry(50, 200, 50)
  const maxDistance = 2000
  const cellSize = 50
  const numCells = Math.floor(maxDistance / cellSize)
  const maxBuildings = 100

  const buildings = []
  const buildingPositions = []
  const quadtree = new Quadtree(
    { x: 0, y: 0, width: maxDistance, height: maxDistance },
    4,
    maxBuildings
  )

  const startingPosition = new THREE.Vector2(maxDistance / 2, maxDistance / 2)
  const activeList = [startingPosition]
  const radius = 50
  const minDistance = 30 // minimum distance between buildings

  while (activeList.length > 0 && buildings.length < maxBuildings) {
    const randomIndex = Math.floor(Math.random() * activeList.length)
    const currentPosition = activeList[randomIndex]
    let foundValidPosition = false
    let iterations = 0

    while (!foundValidPosition && iterations < 30) {
      iterations++
      const angle = Math.random() * Math.PI * 2
      const direction = new THREE.Vector2(Math.cos(angle), Math.sin(angle))
      const distance = Math.random() * radius + radius
      const newPosition = currentPosition
        .clone()
        .add(direction.multiplyScalar(distance))

      let overlaps = false
      // Check if the new building overlaps with existing buildings
      quadtree
        .get({
          x: newPosition.x - minDistance,
          y: newPosition.y - minDistance,
          width: 2 * minDistance,
          height: 2 * minDistance
        })
        .forEach(element => {
          const buildingPosition = buildingPositions[element.index]
          const distance = buildingPosition.distanceTo(newPosition)
          if (distance < minDistance) {
            overlaps = true
          }
        })

      if (
        newPosition.x >= 0 &&
        newPosition.x < maxDistance &&
        newPosition.y >= 0 &&
        newPosition.y < maxDistance &&
        !overlaps
      ) {
        const position = new THREE.Vector3(
          newPosition.x - maxDistance / 2,
          0,
          newPosition.y - maxDistance / 2
        )
        const height = Math.random() * 150 + 50

        const building = (
          <mesh
            key={buildings.length}
            position={position}
            geometry={buildingGeometry}
          >
            <meshStandardMaterial color={'#d7d7d7'} />
          </mesh>
        )

        buildings.push(building)

        const position3D = position.clone().setY(height / 2)
        buildingPositions.push(position3D)

        const element = {
          x: position.x,
          y: position.z,
          width: minDistance,
          height: minDistance,
          index: buildings.length - 1 // adjust index to match array index
        }
        quadtree.push(element, true)

        // Find all buildings within the search radius of the new building and add them to the active list
        const nearbyBuildings = buildings.filter(b => {
          const p = buildingPositions[b.key]
          return p.distanceTo(position) <= radius
        })
        nearbyBuildings.forEach(nearbyBuilding => {
          activeList.push(
            new THREE.Vector2(
              buildingPositions[nearbyBuilding.key].x,
              buildingPositions[nearbyBuilding.key].z
            )
          )
        })
        foundValidPosition = true
      }
    }

    if (!foundValidPosition) {
      activeList.splice(randomIndex, 1)
    }
  }

  return <>{buildings}</>
}

export default Buildings
