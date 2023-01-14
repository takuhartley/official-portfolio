import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProject } from '../../../Redux/Actions/projectActions.js'

const NewProjectPage = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [published, setPublished] = useState(false)
  const [likes, setLikes] = useState(0)
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState([])

  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    const projectData = {
      author,
      title,
      description,
      published,
      likes,
      images,
      categories
    }
    dispatch(createProject(projectData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder='Author'
      />
      <input
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title'
      />
      <input
        type='text'
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder='Description'
      />
      <input
        type='checkbox'
        checked={published}
        onChange={() => setPublished(!published)}
      />
      <input
        type='number'
        value={likes}
        onChange={e => setLikes(e.target.value)}
        placeholder='Likes'
      />
      <input
        type='text'
        value={images}
        onChange={e => setImages(e.target.value)}
        placeholder='Images'
      />
      <input
        type='text'
        value={categories}
        onChange={e => setCategories(e.target.value)}
        placeholder='Categories'
      />
      <button type='submit'>Create Project</button>
    </form>
  )
}

export default NewProjectPage
