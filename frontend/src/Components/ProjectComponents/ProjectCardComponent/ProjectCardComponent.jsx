import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import './ProjectCardComponent.scss'

const ProjectCardComponent = ({ project }) => {
  return (
    <div className='project-card-container'>
      <Card key={project._id} className='project-card'>
        <img
          src={project.thumbnail.url}
          alt={project.title}
          className='project-card-thumbnail'
        />
        <CardContent className='project-card-content'>
          <Typography
            variant='h5'
            component='h2'
            className='project-card-title'
          >
            {project.title}
          </Typography>
          <Typography variant='subtitle1' className='project-card-subtitle'>
            {project.subTitle}
          </Typography>
          <Typography variant='body2' className='project-card-description'>
            {project.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectCardComponent
