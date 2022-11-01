import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectCard.scss'
const ProjectCard = ({ project }) => {
  console.log(project)
  return (
    <>
      <div className='project-card'>
        <Link to={`/project/${project._id}`}>
          <p>{project._id}</p>
          <h1>{project.title}</h1>
        </Link>
        <h3>{project.subTitle}</h3>
        <p>{project.description}</p>
        <img src={project.images.thumbnail} alt={project.title} />
        <p>Tags {project.tags}</p>
      </div>
    </>
  )
}

export default ProjectCard
