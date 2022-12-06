import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProjects,
  deleteProject
} from '../../Redux/Actions/projectActions.js'
// Material UI
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
// Material UI Icons
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ProjectTable = ({ history }) => {
  const dispatch = useDispatch()
  const projectList = useSelector(state => state.projectList)
  const { loading, error, projects } = projectList
  const projectDelete = useSelector(state => state.projectDelete)
  const { success: successDelete } = projectDelete
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProjects())
    } else {
      history.push('/login')
    }
  }, [userInfo, dispatch, history, successDelete])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProject(id))
    }
  }

  return (
    <div className='projectlist-container'>
      <h1>Projects</h1>
      <RouterLink to={`project/new`}>
        <Button variant='light'>New</Button>
      </RouterLink>
      <TableContainer component={Paper} size='small' className='user-list'>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID:</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Public</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project._id}>
                <TableCell>{project._id}</TableCell>
                <TableCell>
                  <RouterLink to={`/project/${project._id}`}>
                    {project.title}
                  </RouterLink>
                </TableCell>
                <TableCell>
                  {project.published ? (
                    <CheckIcon color='primary' />
                  ) : (
                    <ErrorIcon color='secondary' />
                  )}
                </TableCell>
                <TableCell>
                  <RouterLink to={`/admin/project/${project._id}/edit`}>
                    <Button variant='light'>
                      <EditIcon />
                    </Button>
                  </RouterLink>
                  <Button
                    variant='danger'
                    onClick={() => deleteHandler(project._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
    </div>
  )
}

export default ProjectTable
