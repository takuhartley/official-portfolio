import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'

import { useDispatch, useSelector } from 'react-redux'
import {
  listCategories,
  deleteCategory
} from '../../../Redux/Actions/categoryActions.js'
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

const CategoriesTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categoriesList = useSelector(state => state.categoriesList)
  const { loading, error, categories } = categoriesList
  const categoryDelete = useSelector(state => state.categoryDelete)
  const { success: successDelete } = categoryDelete
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCategories())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, successDelete, navigate])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCategory(id))
    }
  }
  const handleEdit = id => {
    navigate(`/categories/${id}/edit`)
  }

  return (
    <>
      <h1>Category Table</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>ID</TableCell>
              <TableCell align='left'>Category Name</TableCell>
              <TableCell align='left'>Category Sub Title</TableCell>
              <TableCell align='left'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow
                key={category._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>{category._id}</TableCell>
                <TableCell align='left'>{category.name}</TableCell>
                <TableCell align='left'>{category.description}</TableCell>
                <TableCell align='left'>
                  <EditIcon onClick={() => handleEdit(category._id)} />

                  <DeleteIcon onClick={() => deleteHandler(category._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CategoriesTable
