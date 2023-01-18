import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  listImages,
  deleteImage
} from '../../Redux/Actions/imageUploadActions.js'

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

const ImageTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const imageList = useSelector(state => state.imageList)
  const { images } = imageList
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID</TableCell>
            <TableCell align='left'>Image Name</TableCell>
            <TableCell align='left'>Description</TableCell>
            <TableCell align='left'>Mime Type</TableCell>
            <TableCell align='left'>Path</TableCell>
            <TableCell align='left'>Original Name</TableCell>
            <TableCell align='left'>Size</TableCell>
            <TableCell align='left'>Author</TableCell>
            <TableCell align='left'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {images.map(image => (
            <TableRow
              key={image._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>{image._id}</TableCell>
              <TableCell align='left'>{image.name}</TableCell>
              <TableCell align='left'>{image.desc}</TableCell>
              <TableCell align='left'>{image.mimetype}</TableCell>
              <TableCell align='left'>{image.path}</TableCell>
              <TableCell align='left'>{image.originalname}</TableCell>
              <TableCell align='left'>{image.size}</TableCell>
              <TableCell align='left'>{image.author}</TableCell>
              <TableCell align='left'>
                <EditIcon onClick={() => handleEdit(image.id)} />

                <DeleteIcon onClick={() => deleteHandler(image._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ImageTable
