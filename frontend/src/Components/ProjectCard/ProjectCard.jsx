import React from 'react'
import './ProjectCard.scss'
const ProjectCard = ({ project }) => {
  return (
    <>
      <div className='project-card'>{project.title}</div>
    </>
  )
}

export default ProjectCard
