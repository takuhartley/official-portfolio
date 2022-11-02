import React from 'react'
import { useParams } from 'react-router-dom'
import projects from '../../Data/projects.js'

const Project = () => {
  const { id } = useParams()
  const project = projects.find(project => project._id === parseInt(id))
  return (
    <>
      <h1>{project.title}</h1>
      <h3>{project.subTitle}</h3>
      <p>{project.description}</p>
      <p>{project.published}</p>
    </>
  )
}

export default Project
