import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogPost } from '../../Redux/Actions/blogPostActions.js'

import './BlogPostReadOnePage.scss'
const BlogPostReadOnePage = () => {
  const { id } = useParams()
  const blogPostId = id
  const dispatch = useDispatch()
  const blogPostReadOne = useSelector(state => state.blogPostReadOne)
  const { blogPost } = blogPostReadOne
  useEffect(() => {
    if (!blogPost._id || blogPost._id !== blogPostId)
      dispatch(getBlogPost(blogPostId))
  }, [dispatch, blogPost._id, blogPostId])
  return (
    <div className='blog-post-read-one-page'>
      <h2 className='blog-post-read-one-page__title'>{blogPost.title}</h2>
      <p className='blog-post-read-one-page__body'>{blogPost.body}</p>
      <div className='blog-post-read-one-page__categories'>
        <h4 className='blog-post-read-one-page__categories-title'>
          Categories:
        </h4>
      </div>
      <div className='blog-post-read-one-page__likes'>
        <h4 className='blog-post-read-one-page__likes-title'>Likes:</h4>
        <span className='blog-post-read-one-page__likes-value'>
          {blogPost.likes}
        </span>
      </div>
    </div>
  )
}
export default BlogPostReadOnePage
