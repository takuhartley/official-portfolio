import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { useDispatch } from 'react-redux'
import 'react-quill/dist/quill.snow.css'
import './BlogPostCreateComponent.scss'
import { createBlogPost } from '../../../Redux/Actions/blogPostActions.js'
const BlogPostCreateComponent = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    // Call the createBlogPost action and pass the title and content as a parameter
    dispatch(createBlogPost({ title, content }))
  }

  return (
    <div className='blog-post-create-component'>
      <h2>Create a new blog post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor='content'>Content:</label>
        <ReactQuill value={content} onChange={setContent} />

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default BlogPostCreateComponent
