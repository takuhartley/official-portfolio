import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
// Material UI
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'

// Material UI Icons
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// Actions
import { listUsers, deleteUser } from '../../Redux/Actions/userActions.js'

// SCSS

const UserTable = ({ history }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { users } = userList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userDelete = useSelector(state => state.userDelete)
  const { successUserDelete: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, history, successDelete, navigate])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div className='user-table-container'>
      <h1>Users</h1>
      <TableContainer component={Paper} size='small' className='user-list'>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID:</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <CheckIcon color='primary' />
                  ) : (
                    <ErrorIcon color='secondary' />
                  )}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light'>
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    onClick={() => deleteHandler(user._id)}
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

export default UserTable
