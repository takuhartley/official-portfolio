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

const UserTable = () => {
  // Hook for accessing the dispatch function to dispatch actions
  const dispatch = useDispatch()
  // Hook for accessing the `userList` slice of state
  const userList = useSelector(state => state.userList)
  // Destructuring `users` from `userList`
  const { users } = userList
  // Hook for accessing the `userLogin` slice of state
  const userLogin = useSelector(state => state.userLogin)
  // Destructuring `userInfo` from `userLogin`
  const { userInfo } = userLogin
  // Hook for accessing the `userDelete` slice of state
  const userDelete = useSelector(state => state.userDelete)
  // Destructuring `successUserDelete` from `userDelete` and renaming it to `successDelete`
  const { successUserDelete: successDelete } = userDelete

  // Hook for accessing the `navigate` function to navigate to different routes
  const navigate = useNavigate()

  // Use effect hook to perform the `listUsers` action if the user is an admin
  // and navigate to the login page if the user is not an admin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, successDelete, navigate])

  // Function for deleting a user with a given `id`
  const deleteHandler = id => {
    // Confirm with the user before deleting the user
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }
  console.log(users)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>ID</TableCell>
              <TableCell align='left'>First Name</TableCell>
              <TableCell align='left'>Last Name</TableCell>
              <TableCell align='left'>User Name</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='left'>Admin</TableCell>
              <TableCell align='left'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>{user._id}</TableCell>
                <TableCell align='left'>{user.firstName}</TableCell>
                <TableCell align='left'>{user.lastName}</TableCell>
                <TableCell align='left'>{user.userName}</TableCell>
                <TableCell align='left'>{user.email}</TableCell>
                <TableCell align='left'>
                  {user.isAdmin ? (
                    <>
                      <CheckIcon />
                    </>
                  ) : (
                    <>
                      <ErrorIcon />
                    </>
                  )}
                </TableCell>
                <TableCell align='left'>
                  <RouterLink to={`users/${user._id}/edit`}>
                    <EditIcon />
                  </RouterLink>
                  <DeleteIcon onClick={() => deleteHandler(user._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserTable
