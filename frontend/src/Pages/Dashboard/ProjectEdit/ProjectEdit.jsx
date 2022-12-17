// Dependencies
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProjectDetails,
  updateProject
} from '../../../Redux/Actions/projectActions.js'
import { PROJECT_UPDATE_RESET } from '../../../Redux/Constants/projectConstants.js'
import {
  Input,
  InputLabel,
  Container,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  TextField
} from '@mui/material'

const ProjectEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // Get the Project ID
  const projectId = id
  // Define State
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [privateStatus, setPrivateStatus] = useState(false)
  const [published, setPublished] = useState(false)
  const [stack, setStack] = useState('')
  const [language, setLanguage] = useState([])
  const [database, setDatabase] = useState('')
  const [stateManagement, setStateManagement] = useState('')
  const [gitHub, setGitHub] = useState('')
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  // Dispatch Redux
  const dispatch = useDispatch()
  // Define project details from state
  const projectDetails = useSelector(state => state.projectDetails)
  const { loading, error, project } = projectDetails
  // Define project update state
  const projectUpdate = useSelector(state => state.projectUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = projectUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_RESET })
      navigate('/dashboard')
    } else {
      if (!project.title || project._id !== projectId) {
        dispatch(listProjectDetails(projectId))
      } else {
        setTitle(project.title)
        setSubTitle(project.subTitle)
        setImage(project.image)
        setDescription(project.description)
        setPrivateStatus(project.privateStatus)
        setLanguage(project.language)
        setStack(project.stack)
        setDatabase(project.database)
        setStateManagement(project.stateManagement)
        setGitHub(project.gitHub)
        setUrl(project.url)
      }
    }
  }, [dispatch, navigate, project, projectId, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateProject({
        _id: projectId,
        title,
        subTitle,
        description,
        image,
        published,
        privateStatus,
        stack,
        language,
        database,
        stateManagement,
        gitHub,
        url
      })
    )
  }

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  return <div className='project_edit'></div>
}

export default ProjectEditPage
