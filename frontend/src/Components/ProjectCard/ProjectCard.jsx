import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectCard.scss'
const ProjectCard = ({ project }) => {
  const image = project.images.thumbnail.image
  console.log(image)
  return (
    <>
      <div className='project-card'>
        <Link to={`/projects/${project._id}`}>
          <h1 className='project-card-title'>{project.title}</h1>
        </Link>
        <h3 className='project-card-sub_title'>{project.subTitle}</h3>
        <img src={project.images.thumbnail.image} alt={project.title} />
      </div>
    </>
  )
}

export default ProjectCard
