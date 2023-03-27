import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogPost } from '../../Redux/Actions/blogPostActions.js'
import { styled, keyframes } from '@mui/system'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import moment from 'moment'
import './BlogPostReadOnePage.scss'
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const StyledPaper = styled(Paper)`
  animation: ${fadeIn} 1s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 10px;

  @media (max-width: 600px) {
    padding: 12px;
  }
`
const BlogPostReadOnePage = () => {
  const { id } = useParams()
  const blogPostId = id
  const dispatch = useDispatch()
  const blogPostReadOne = useSelector(state => state.blogPostReadOne)
  const { blogPost, loading, error } = blogPostReadOne

  useEffect(() => {
    if (!blogPost?._id || blogPost._id !== blogPostId) {
      dispatch(getBlogPost(blogPostId))
    }
  }, [dispatch, blogPost?._id, blogPostId])

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <Typography variant='h4'>Error: {error.message}</Typography>
      </Box>
    )
  }
  const formattedDate = moment(blogPost.createdAt).format('MMMM D, YYYY')
  return (
    <Box className='blog-post-read-one-page'>
      <StyledPaper>
        <Box className='blog-post-read-one-page__header'>
          <Typography variant='h4' className='blog-post-read-one-page__title'>
            {blogPost?.title ?? 'Untitled'}
          </Typography>
        </Box>

        <Box className='blog-post-read-one-page__author-info'>
          <Avatar src={blogPost?.author?.avatar} />
          <Typography
            variant='subtitle1'
            className='blog-post-read-one-page__author-name'
          >
            {blogPost?.author?.name ?? 'Unknown Author'}
          </Typography>
        </Box>
        <Typography
          variant='subtitle2'
          className='blog-post-read-one-page__date'
        >
          {formattedDate}
        </Typography>

        <Typography variant='body1' className='blog-post-read-one-page__body'>
          {blogPost?.body ?? 'No content available.'}
        </Typography>

        <Box className='blog-post-read-one-page__categories'>
          <Typography
            variant='subtitle1'
            className='blog-post-read-one-page__categories-title'
          >
            Categories:
          </Typography>
          {blogPost?.categories?.map((category, index) => (
            <Typography
              key={index}
              variant='subtitle2'
              className='blog-post-read-one-page__category'
            >
              {category.name}
            </Typography>
          ))}
        </Box>

        <Box className='blog-post-read-one-page__likes'>
          <Typography
            variant='subtitle1'
            className='blog-post-read-one-page__likes-title'
          >
            Likes:
          </Typography>
          <Typography
            variant='subtitle2'
            className='blog-post-read-one-page__likes-value'
          >
            {blogPost.likes}
          </Typography>
        </Box>
      </StyledPaper>
    </Box>
  )
}

export default BlogPostReadOnePage
