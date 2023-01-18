import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  listProjects,
  deleteProject
} from '../../Redux/Actions/projectActions.js'

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
  const { projects } = projectList
  const projectDelete = useSelector(state => state.projectDelete)
  const { success: successDelete } = projectDelete
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProjects())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, successDelete, navigate])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProject(id))
    }
  }
  const handleEdit = id => {
    navigate(`/projects/${id}/edit`)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID</TableCell>
            <TableCell align='left'>Project Name</TableCell>
            <TableCell align='left'>Published</TableCell>
            <TableCell align='left'>Likes</TableCell>
            <TableCell align='left'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(project => (
            <TableRow
              key={project._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>{project._id}</TableCell>
              <TableCell align='left'>{project.title}</TableCell>
              <TableCell align='left'>
                {project.published ? (
                  <CheckIcon color='primary' />
                ) : (
                  <ErrorIcon color='secondary' />
                )}
              </TableCell>
              <TableCell align='left'>{project.likes}</TableCell>
              <TableCell align='left'>
                <EditIcon onClick={() => handleEdit(project._id)} />

                <DeleteIcon onClick={() => deleteHandler(project._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectTable
