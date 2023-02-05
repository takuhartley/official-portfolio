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

const initialState = {
  loading: false,
  blogPosts: [],
  blogPost: {},
  error: null
}

export const blogPostReadAllReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOG_POSTS:
      return {
        ...state,
        loading: true
      }
    case GET_BLOG_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogPosts: action.payload
      }
    case GET_BLOG_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const blogPostReadOneReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOG_POST:
      return {
        ...state,
        loading: true
      }
    case GET_BLOG_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        blogPost: action.payload
      }
    case GET_BLOG_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const blogPostCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BLOG_POST:
      return {
        ...state,
        loading: true
      }
    case CREATE_BLOG_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        blogPosts: [...state.blogPosts, action.payload]
      }
    case CREATE_BLOG_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const blogPostUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BLOG_POST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_BLOG_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        blogPosts: state.blogPosts.map(blogPost =>
          blogPost._id === action.payload._id ? action.payload : blogPost
        )
      }
    case UPDATE_BLOG_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const blogPostDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_BLOG_POST:
      return {
        ...state,
        loading: true
      }
    case DELETE_BLOG_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        blogPosts: state.blogPosts.filter(
          blogPost => blogPost._id !== action.payload
        )
      }
    case DELETE_BLOG_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
