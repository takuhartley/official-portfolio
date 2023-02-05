import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'

import { useDispatch, useSelector } from 'react-redux'
import {
  listImages,
  deleteImage
} from '../../../Redux/Actions/imageUploadActions.js'

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
import './ImageTable.scss'

const ImageTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const imageList = useSelector(state => state.imageList)
  const { loading, error, images } = imageList
  const imageDelete = useSelector(state => state.imageDelete)
  const { success: successDelete } = imageDelete
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listImages())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, successDelete, navigate])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteImage(id))
    }
  }
  const handleEdit = id => {
    navigate(`/images/${id}/edit`)
  }

  return (
    <>
      {loading && <LoadingComponent></LoadingComponent>}
      {error && <AlertComponent severity='danger'>{error}</AlertComponent>}
      <h1>Image Table</h1>
      <TableContainer component={Paper} className='table-container'>
        <Table
          sx={{ minWidth: 650 }}
          aria-label='simple table'
          className='table'
        >
          <TableHead className='table-head'>
            <TableRow className='table-row'>
              <TableCell align='left' className='table-cell'>
                ID
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Image
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Image Name
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Description
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Mime Type
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Path
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Original Name
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Size
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Author
              </TableCell>
              <TableCell align='left' className='table-cell'>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {images.map(image => (
              <TableRow
                key={image._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className='table-row'
              >
                <TableCell align='left' className='table-cell'>
                  {image._id}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  <img
                    src={`/Images/${image.filename}`}
                    alt={image.name}
                    className='table-img'
                  />
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  {image.name}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  {image.desc}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  {image.mimetype}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  {image.path}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  {image.originalname}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  {image.size}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  {image.author}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  <EditIcon
                    onClick={() => handleEdit(image._id)}
                    className='table-icon'
                  />
                  <DeleteIcon
                    onClick={() => deleteHandler(image._id)}
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

export default ImageTable
