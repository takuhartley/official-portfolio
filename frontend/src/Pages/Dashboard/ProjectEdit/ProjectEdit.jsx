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
  const projectId = id
  const navigate = useNavigate()
  // Define State
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subTitle, setSubTitle] = useState()
  const [published, setPublished] = useState()
  const [likes, setLikes] = useState()
  // Dispatch Redux
  const dispatch = useDispatch()
  // Define project details from state
  const projectDetails = useSelector(state => state.projectDetails)
  const { loading, error, project } = projectDetails
  // Define project update state
  const projectUpdate = useSelector(state => state.projectUpdate)
  const { success: successUpdate } = projectUpdate
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  console.log(project.title)
  console.log(typeof projectId)
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_RESET })
      navigate(`/project/${projectId}/edit`)
    } else {
      if (!project.title || project._id !== projectId) {
        dispatch(listProjectDetails(projectId))
      } else {
        setTitle(project.title)
        setDescription(project.description)
        setSubTitle(project.subTitle)
        setLikes(project.likes)
        setPublished(project.published)
      }
    }
  }, [dispatch, id, navigate, project, projectId, successUpdate, userInfo])
  useEffect(() => {
    if (successUpdate) {
      navigate(`/projects/${projectId}/edit`)
      dispatch({ type: PROJECT_UPDATE_RESET })
    }
  }, [successUpdate, dispatch, navigate])
  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateProject({
        _id: projectId,
        title,
        subTitle,
        description,
        published,
        likes
      })
    )
  }

  return (
    <>
      <Container>
        <form onSubmit={submitHandler}>
          <FormControl fullWidth>
            <InputLabel htmlFor='title'>Title</InputLabel>
            <Input
              id='title'
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='subTitle'>SubTitle</InputLabel>
            <Input
              id='subTitle'
              type='text'
              value={subTitle}
              onChange={e => setSubTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='description'>Description</InputLabel>
            <TextField
              id='description'
              multiline
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={published}
                    onChange={e => setPublished(e.target.checked)}
                  />
                }
                label='Published'
              />
            </FormGroup>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='likes'>Likes</InputLabel>
            <Input
              id='likes'
              type='number'
              value={likes}
              onChange={e => setLikes(e.target.value)}
            />
          </FormControl>

          <button type='submit'>Update Project</button>
        </form>
      </Container>
    </>
  )
}

export default ProjectEditPage
