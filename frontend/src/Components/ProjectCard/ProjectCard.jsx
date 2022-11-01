import React from 'react'
import './ProjectCard.scss'
const ProjectCard = ({ project }) => {
  console.log(project)
  return (
    <>
      <div className='project-card'>
        <p>{project._id}</p>
        <h1>{project.title}</h1>
        <h3>{project.subTitle}</h3>
        <p>{project.description}</p>
        <img src={project.images.thumbnail} alt={project.title} />
        <a href={project.links.websiteUrl}>{project.links.websiteUrl}</a>
        <p>Tags {project.tags}</p>
      </div>
    </>
  )
}

export default ProjectCard
