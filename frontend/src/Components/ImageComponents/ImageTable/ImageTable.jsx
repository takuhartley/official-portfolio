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
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton
} from '@mui/material'

// Material UI Icons
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import './ImageTable.scss'

const ImageTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { images, loading, error } = useSelector(state => state.imageList)

  useEffect(() => {
    if (images.length === 0) {
      dispatch(listImages())
    }
  }, [dispatch, images.length])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteImage(id))
    }
  }

  return (
    <Box className='image-table' sx={{ marginTop: 4 }}>
      <Typography
        variant='h4'
        className='image-table__title'
        sx={{ marginBottom: 2 }}
      >
        Image List
      </Typography>
      {loading ? (
        <LoadingComponent className='image-table__loading' />
      ) : error ? (
        <AlertComponent
          className='image-table__alert'
          severity='info'
          error={error}
        />
      ) : images.length === 0 ? (
        <AlertComponent className='image-table__alert' severity='info'>
          No images found.
        </AlertComponent>
      ) : (
        <TableContainer className='image-table__container' component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='image-table__head-cell'>ID</TableCell>
                <TableCell className='image-table__head-cell'>Name</TableCell>
                <TableCell className='image-table__head-cell'>
                  Last Modified
                </TableCell>
                <TableCell className='image-table__head-cell'>
                  Thumbnail
                </TableCell>
                <TableCell className='image-table__head-cell'>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {images.map((image, index) => (
                <TableRow key={index} className='image-table__row'>
                  <TableCell className='image-table__cell'>
                    {image._id}
                  </TableCell>
                  <TableCell className='image-table__cell'>
                    {image.name}
                  </TableCell>
                  <TableCell className='image-table__cell'>
                    {new Date(image.lastModified).toLocaleString()}
                  </TableCell>
                  <TableCell className='image-table__cell'>
                    {image.url ? (
                      <img
                        src={image.url}
                        className='image-table__thumbnail'
                        alt={image.name}
                      />
                    ) : (
                      <Skeleton variant='rectangular' width={60} height={40} />
                    )}
                  </TableCell>
                  <TableCell className='image-table__cell'>
                    <IconButton
                      component={RouterLink}
                      to={`/images/${image._id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteHandler(image._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default ImageTable
