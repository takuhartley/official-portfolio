import React, { useEffect, useState, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogPosts } from '../../Redux/Actions/blogPostActions.js'
import BlogPostCardComponent from '../../Components/BlogPostComponents/BlogPostCardComponent/BlogPostCardComponent'
import Container from '@mui/material/Container'
import InfiniteScroll from 'react-infinite-scroll-component'
import { styled, keyframes } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
import './BlogPostsReadAllPage.scss'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const StyledBlogPostsContainer = styled('div')`
  animation: ${fadeIn} 1s cubic-bezier(0.4, 0, 0.2, 1);
`

const BlogPostsReadAllPage = () => {
  const [hasMore, setHasMore] = useState(true)
  const isMobile = useMediaQuery('(max-width:600px)')
  const dispatch = useDispatch()
  const blogPostReadAll = useSelector(state => state.blogPostReadAll)
  const { blogPosts } = blogPostReadAll

  useEffect(() => {
    if (!blogPosts._id) {
      dispatch(getBlogPosts())
    }
  }, [blogPosts._id, dispatch])

  const fetchMoreData = useCallback(() => {
    // Implement logic to fetch more data
  }, [])

  return (
    <>
      <StyledBlogPostsContainer id='blog-posts-container'>
        <div id='blog-posts-header' className='blog-posts-header'>
          <h1 id='blog-posts-title' className='blog-posts-title'>
            Life's Musings & Discoveries
          </h1>
          <h2 className='blog-posts-subtitle'>By Robert</h2>
          <p className='blog-posts-description'>
            Explore a diverse collection of thoughts, experiences, and insights
            on a variety of topics. From technology and programming to travel
            and lifestyle, embark on a journey of learning and discovery with
            me.
          </p>
        </div>
        <Container maxWidth={isMobile ? '100%' : 'sm'}>
          <InfiniteScroll
            dataLength={blogPosts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <strong>Yay! You have seen it all.</strong>
              </p>
            }
          >
            <div id='blog-posts-list' className='blog-posts-list'>
              {blogPosts.map(blogPost => (
                <div id={`blog-post-${blogPost._id}`} className='blog-post'>
                  <BlogPostCardComponent
                    key={blogPost._id}
                    blogPost={blogPost}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </Container>
      </StyledBlogPostsContainer>
    </>
  )
}

export default BlogPostsReadAllPage
