import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled, keyframes } from '@mui/system'

import './BlogPostCardComponent.scss'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

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
`

const categories = [
  {
    name: 'Lifestyle',
    color: 'pink',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Travel',
    color: 'blue',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Tech',
    color: 'green',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Personal Finance',
    color: 'yellow',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Health and Fitness',
    color: 'orange',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Education',
    color: 'purple',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Art and Culture',
    color: 'red',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Environment',
    color: 'brown',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'News and Politics',
    color: 'grey',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Sports',
    color: 'black',
    image: 'https://via.placeholder.com/150x150'
  }
]

const getCategoryColor = name => {
  const category = categories.find(cat => cat.name === name)
  return category ? category.color : 'grey'
}

const getCategoryImage = name => {
  const category = categories.find(cat => cat.name === name)
  return category ? category.image : 'https://via.placeholder.com/150x150'
}

const BlogPostCardComponent = ({ blogPost }) => {
  const [liked, setLiked] = useState(false)
  const date = new Date(blogPost.createdAt)
  const formattedDate = date.toLocaleDateString()

  const handleLikeClick = () => {
    setLiked(!liked)
    // Implement the logic to increment the like count
  }

  const getCategoryColor = categoryName => {
    switch (categoryName) {
      case 'Lifestyle':
        return '#ff80ab'
      case 'Travel':
        return '#2196f3'
      case 'Tech':
        return '#4caf50'
      case 'Personal Finance':
        return '#ffff00'
      case 'Health and Fitness':
        return '#ff9800'
      case 'Education':
        return '#9c27b0'
      case 'Art and Culture':
        return '#f44336'
      case 'Environment':
        return '#795548'
      case 'News and Politics':
        return '#607d8b'
      case 'Sports':
        return '#000000'
      default:
        return '#ffffff'
    }
  }

  return (
    <StyledPaper
      variant='outlined'
      className='blog-post-card'
      style={{
        backgroundColor:
          blogPost.categories.length > 0
            ? getCategoryColor(blogPost.categories[0].name)
            : 'grey'
      }}
    >
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
          {liked ? (
            <FavoriteIcon
              className='blog-post-card__favorite-icon'
              onClick={handleLikeClick}
            />
          ) : (
            <FavoriteBorderIcon
              className='blog-post-card__favorite-border-icon'
              onClick={handleLikeClick}
            />
          )}
          <Typography variant='caption' className='blog-post-card__likes'>
            {blogPost.likes}
          </Typography>
        </Box>
      </Box>
      <Box p={2} className='blog-post-card__content'>
        <Box
          className='blog-post-card__thumbnail'
          style={{backgroundImage: `url(${blogPost.thumbnail})`}}
        />
        <Link to={`/blog-posts/${blogPost._id}`}>
          <Typography variant='h6' className='blog-post-card__title'>
            {blogPost.title}
          </Typography>
          <Typography
            variant='body1'
            className='blog-post-card__body'
            paragraph
          >
            {blogPost.body}
          </Typography>
        </Link>
        <Box display='flex' alignItems='center'>
          <Typography variant='caption' className='blog-post-card__categories'>
            {blogPost.categories.map(category => category.name).join(', ')}
          </Typography>
        </Box>
      </Box>
    </StyledPaper>
  )
}

export default BlogPostCardComponent
