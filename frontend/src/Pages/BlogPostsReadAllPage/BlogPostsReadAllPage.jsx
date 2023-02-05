import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import AlertComponent from '../../Components/AlertComponent/AlertComponent'
// import LoaderComponent from '../../Components/LoadingComponent/LoadingComponent'
import { getBlogPosts } from '../../Redux/Actions/blogPostActions.js'
import BlogPostCardComponent from '../../Components/BlogPostComponents/BlogPostCardComponent/BlogPostCardComponent'
import Container from '@mui/material/Container'
import './BlogPostsReadAllPage.scss'
const BlogPostsReadAllPage = () => {
  const dispatch = useDispatch()
  const blogPostReadAll = useSelector(state => state.blogPostReadAll)
  const { blogPosts } = blogPostReadAll
  useEffect(() => {
    if (!blogPosts._id) {
      dispatch(getBlogPosts())
    }
  }, [blogPosts._id, dispatch])

  return (
    <>
      <div id='blog-posts-container'>
        <div id='blog-posts-header' className='blog-posts-header'>
          <h1 id='blog-posts-title' className='blog-posts-title'>
            Robert's Thoughts 💭
          </h1>
        </div>
        <Container maxWidth='sm'>
          <div id='blog-posts-list' className='blog-posts-list'>
            {blogPosts.map(blogPost => (
              <div id={`blog-post-${blogPost._id}`} className='blog-post'>
                <BlogPostCardComponent key={blogPost._id} blogPost={blogPost} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  )
}

export default BlogPostsReadAllPage
