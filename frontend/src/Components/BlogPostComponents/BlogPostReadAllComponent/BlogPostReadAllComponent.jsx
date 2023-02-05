import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  getBlogPosts,
  deleteBlogPost
} from '../../../Redux/Actions/blogPostActions.js'
const BlogPostsReadAllComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogPostReadAll = useSelector(state => state.blogPostReadAll)
  const { loading, error, blogPosts } = blogPostReadAll
  const blogPostDelete = useSelector(state => state.blogPostDelete)
  const { success: successDelete } = blogPostDelete
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (!blogPosts._id) {
      dispatch(getBlogPosts())
    }
  }, [blogPosts._id, dispatch])
  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteBlogPost(id))
    }
  }
  const handleEdit = id => {
    navigate(`/blog-post/${id}/edit`)
  }
  return (
    <>
      <h1 id='table-title' className='table-title'>
        Blog Post Table
      </h1>
      <TableContainer
        component={Paper}
        id='table-container'
        className='table-container'
      >
        <Table
          id='project-table'
          className='project-table'
          sx={{ minWidth: 650 }}
          aria-label='simple table'
        >
          <TableHead className='table-head'>
            <TableRow className='table-row'>
              <TableCell align='left' id='table-cell-id' className='table-cell'>
                ID
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-name'
                className='table-cell'
              >
                Title
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-subtitle'
                className='table-cell'
              >
                Body
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-categories'
                className='table-cell'
              >
                Categories
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-published'
                className='table-cell'
              >
                Published
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-likes'
                className='table-cell'
              >
                Likes
              </TableCell>
              <TableCell
                align='left'
                id='table-cell-action'
                className='table-cell'
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {blogPosts.map(blogPost => (
              <TableRow
                key={blogPost._id}
                className='table-row'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  align='left'
                  id='table-cell-id-value'
                  className='table-cell'
                >
                  {blogPost._id}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-name-value'
                  className='table-cell'
                >
                  {blogPost.title}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-name-value'
                  className='table-cell'
                >
                  {blogPost.body}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-categories-value'
                  className='table-cell'
                >
                  {blogPost.categories.map((category, index) => (
                    <span key={index} className='category-name'>
                      {category.name}
                    </span>
                  ))}
                </TableCell>

                <TableCell
                  align='left'
                  id='table-cell-published'
                  className='table-cell'
                >
                  {blogPost.published ? (
                    <CheckIcon color='primary' className='table-icon' />
                  ) : (
                    <ErrorIcon color='secondary' className='table-icon' />
                  )}
                </TableCell>
                <TableCell
                  align='left'
                  id='table-cell-likes'
                  className='table-cell'
                >
                  {blogPost.likes}
                </TableCell>
                <TableCell align='left' className='table-cell'>
                  <EditIcon
                    onClick={() => handleEdit(blogPost._id)}
                    className='table-icon'
                  />
                  <DeleteIcon
                    onClick={() => deleteHandler(blogPost._id)}
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

export default BlogPostsReadAllComponent
