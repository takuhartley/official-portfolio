import React from 'react'
import { Link } from 'react-router-dom'

import './BlogPostCardComponent.scss'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import FavoriteIcon from '@mui/icons-material/Favorite'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
const BlogPostCardComponent = ({ blogPost }) => {
  const date = new Date(blogPost.createdAt)
  const formattedDate = date.toLocaleDateString()

  return (
    <Paper variant='outlined' className='blog-post-card'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        p={2}
        className='blog-post-card__content'
      >
        <Typography variant='subtitle2' className='blog-post-card__author'>
          Author: {blogPost.author.firstName}
        </Typography>
        <Typography variant='caption' className='blog-post-card__created-at'>
          Created: {formattedDate}
        </Typography>
        <Box display='flex' alignItems='center'>
          <FavoriteBorderIcon className='blog-post-card__favorite-border-icon' />
          <Typography variant='caption' className='blog-post-card__likes'>
            {blogPost.likes}
          </Typography>
        </Box>
      </Box>
      <Box p={2} className='blog-post-card__content'>
        <Link to={`/blog-posts/${blogPost._id}`}>
          <Typography variant='h6' className='blog-post-card__title'>
            {blogPost.title}
          </Typography>
          <Typography variant='body1' className='blog-post-card__body'>
            {blogPost.body}
          </Typography>
        </Link>
        <Typography variant='caption' className='blog-post-card__categories'>
          {blogPost.categories.map(category => category.name).join(', ')}
        </Typography>
      </Box>
    </Paper>
  )
}

export default BlogPostCardComponent
