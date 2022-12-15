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
  }, [userInfo, dispatch, successDelete, navigate])

  const deleteHandler = id => {
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
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserTable
