import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  listUsers,
  deleteUser,
  updateUserProfile
} from '../../Redux/Actions/userActions.js'

const UserTable = () => {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { users } = userList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userDelete = useSelector(state => state.userDelete)
  const { successUserDelete: successDelete } = userDelete
  const userEdit = useSelector(state => state.userUpdateProfile)
  const { successUserEdit: successEdit } = userEdit
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, successDelete, successEdit, navigate])

  const [editingUser, setEditingUser] = useState({})

  const editHandler = user => {
    setEditingUser(user)
  }
  const saveHandler = e => {
    e.preventDefault()
    const { _id, firstName, lastName, userName, email, isAdmin } = editingUser
    const userData = { _id, firstName, lastName, userName, email, isAdmin }
    dispatch(updateUserProfile(userData))
    setEditingUser({})
  }

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <>
      <div>
        <h2>User Table</h2>
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
                  {editingUser._id === user._id ? (
                    <>
                      <TableCell align='left'>
                        <TextField defaultValue={user._id} disabled />
                      </TableCell>
                      <TableCell align='left'>
                        <TextField
                          defaultValue={user.firstName}
                          onChange={e =>
                            setEditingUser({
                              ...editingUser,
                              firstName: e.target.value
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <TextField
                          defaultValue={user.lastName}
                          onChange={e =>
                            setEditingUser({
                              ...editingUser,
                              lastName: e.target.value
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <TextField
                          defaultValue={user.userName}
                          onChange={e =>
                            setEditingUser({
                              ...editingUser,
                              userName: e.target.value
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <TextField
                          defaultValue={user.email}
                          onChange={e =>
                            setEditingUser({
                              ...editingUser,
                              email: e.target.value
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <TextField
                          defaultValue={user.isAdmin}
                          onChange={e =>
                            setEditingUser({
                              ...editingUser,
                              isAdmin: e.target.value
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <Button onClick={saveHandler}>
                          <CheckIcon />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align='left'>{user._id}</TableCell>
                      <TableCell align='left'>{user.firstName}</TableCell>
                      <TableCell align='left'>{user.lastName}</TableCell>
                      <TableCell align='left'>{user.userName}</TableCell>
                      <TableCell align='left'>{user.email}</TableCell>
                      <TableCell align='left'>
                        {user.isAdmin ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell align='left'>
                        <Button onClick={() => editHandler(user)}>
                          <EditIcon />
                        </Button>
                        <Button onClick={() => deleteHandler(user._id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default UserTable
