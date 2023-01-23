import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  listProjects,
  deleteProject
} from '../../Redux/Actions/projectActions.js'
import './ProjectTable.scss'
// Material UI
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// Material UI Icons
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ProjectTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const projectList = useSelector(state => state.projectList)
  const { loading, error, projects } = projectList
  const projectDelete = useSelector(state => state.projectDelete)
  const { success: successDelete } = projectDelete
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (!projects._id) {
      dispatch(listProjects())
    }
  }, [dispatch, projects._id])
  console.log(projects)
  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProject(id))
    }
  }
  const handleEdit = id => {
    navigate(`/projects/${id}/edit`)
  }
  return (
    <>
      <h1 id='table-title' className='table-title'>
        Project Table
      </h1>
      <TableContainer
        component={Paper}
        id='table-container'
        className='table-container'
      >
        <Table
          id='project-table'
          className='project-table'
          sx={{ minWidth: 650 }}
          aria-label='simple table'
        >
          <TableHead className='table-head'>
            <TableRow className='table-row'>
              <TableCell align='left' id='table-cell-id' className='table-cell'>
                ID
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-thumbnail'
                className='table-cell'
              >
                Project Thumbnail
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-name'
                className='table-cell'
              >
                Project Name
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-subtitle'
                className='table-cell'
              >
                Project Sub Title
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-description'
                className='table-cell'
              >
                Project Description
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-categories'
                className='table-cell'
              >
                Project Categories
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-images'
                className='table-cell'
              >
                Project Images
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-published'
                className='table-cell'
              >
                Published
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-likes'
                className='table-cell'
              >
                Likes
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-action'
                className='table-cell'
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {projects.map(project => (
              <TableRow
                key={project._id}
                className='table-row'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  align='left'
                  id='table-cell-id-value'
                  className='table-cell'
                >
                  {project._id}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-thumbnail-image'
                  className='table-cell'
                >
                  <img
                    className='project-thumbnail'
                    src={`/Images/${project.thumbnail.filename}`}
                    alt={project.thumbnail.name}
                  />
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-name-value'
                  className='table-cell'
                >
                  {project.title}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-subtitle-value'
                  className='table-cell'
                >
                  {project.subTitle}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-description-value'
                  className='table-cell'
                >
                  {project.description}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-categories-value'
                  className='table-cell'
                >
                  {project.categories.map((category, index) => (
                    <span key={index} className='category-name'>
                      {category.name}
                    </span>
                  ))}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-images'
                  className='table-cell'
                >
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      className='project-image'
                      src={`/Images/${image.filename}`}
                      alt={image.name}
                    />
                  ))}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-published'
                  className='table-cell'
                >
                  {project.published ? (
                    <CheckIcon color='primary' className='table-icon' />
                  ) : (
                    <ErrorIcon color='secondary' className='table-icon' />
                  )}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-likes'
                  className='table-cell'
                >
                  {project.likes}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  <EditIcon
                    onClick={() => handleEdit(project._id)}
                    className='table-icon'
                  />
                  <DeleteIcon
                    onClick={() => deleteHandler(project._id)}
                    className='table-icon'
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProjectTable
