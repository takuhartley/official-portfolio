import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Project = () => {
  const { id } = useParams()
  const [project, setProject] = useState([])
  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await axios.get(`/api/projects/${id}`)
      setProject(data)
    }
    fetchProject()
  }, [id])
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
