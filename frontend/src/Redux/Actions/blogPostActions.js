import axios from 'axios'
import {
  CREATE_BLOG_POST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILURE,
  GET_BLOG_POSTS,
  GET_BLOG_POSTS_SUCCESS,
  GET_BLOG_POSTS_FAILURE,
  GET_BLOG_POST,
  GET_BLOG_POST_SUCCESS,
  GET_BLOG_POST_FAILURE,
  UPDATE_BLOG_POST,
  UPDATE_BLOG_POST_SUCCESS,
  UPDATE_BLOG_POST_FAILURE,
  DELETE_BLOG_POST,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_FAILURE
} from '../Constants/blogPostConstants.js'

export const getBlogPosts = () => async dispatch => {
  dispatch({ type: GET_BLOG_POSTS })
  try {
    const { data } = await axios.get('/api/blog-posts')
    dispatch({ type: GET_BLOG_POSTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_BLOG_POSTS_FAILURE, payload: error })
  }
}
export const getBlogPost = id => async dispatch => {
  dispatch({ type: GET_BLOG_POST })
  try {
    const { data } = await axios.get(`/api/blog-posts/${id}`)
    dispatch({ type: GET_BLOG_POST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_BLOG_POST_FAILURE, payload: error })
  }
}
export const createBlogPost = post => async dispatch => {
  dispatch({ type: CREATE_BLOG_POST })
  try {
    const { data } = await axios.post('/api/blog-posts/new', post)
    dispatch({ type: CREATE_BLOG_POST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_POST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
export const updateBlogPost = (id, post) => async dispatch => {
  dispatch({ type: UPDATE_BLOG_POST })
  try {
    const { data } = await axios.put(`/api/blog-posts/${id}`, post)
    dispatch({ type: UPDATE_BLOG_POST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: UPDATE_BLOG_POST_FAILURE, payload: error })
  }
}
export const deleteBlogPost = id => async dispatch => {
  dispatch({ type: DELETE_BLOG_POST })
  try {
    await axios.delete(`/api/blog-posts/${id}`)
    dispatch({ type: DELETE_BLOG_POST_SUCCESS })
  } catch (error) {
    dispatch({ type: DELETE_BLOG_POST_FAILURE, payload: error })
  }
}
