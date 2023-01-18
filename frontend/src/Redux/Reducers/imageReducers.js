import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS,
  IMAGE_LIST_FAIL
} from '../Constants/imageConstants'

export const imageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true }
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...state.images, action.payload]
      }
    case IMAGE_UPLOAD_FAIL:
      return { ...state, loading: false, error: action.payload }
    case IMAGE_DELETE_REQUEST:
      return { ...state, loading: true }
    case IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: state.images.filter(image => image.id !== action.payload)
      }
    case IMAGE_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const imageListReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_LIST_REQUEST:
      return { loading: true, images: [] }
    case IMAGE_LIST_SUCCESS:
      return {
        loading: false,
        images: action.payload.images
      }
    case IMAGE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const imageDetailsReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true }
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...state.images, action.payload]
      }
    case IMAGE_UPLOAD_FAIL:
      return { ...state, loading: false, error: action.payload }
    case IMAGE_DELETE_REQUEST:
      return { ...state, loading: true }
    case IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: state.images.filter(image => image.id !== action.payload)
      }
    case IMAGE_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export const imageUpdateReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true }
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...state.images, action.payload]
      }
    case IMAGE_UPLOAD_FAIL:
      return { ...state, loading: false, error: action.payload }
    case IMAGE_DELETE_REQUEST:
      return { ...state, loading: true }
    case IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: state.images.filter(image => image.id !== action.payload)
      }
    case IMAGE_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export const imageDeleteReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true }
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...state.images, action.payload]
      }
    case IMAGE_UPLOAD_FAIL:
      return { ...state, loading: false, error: action.payload }
    case IMAGE_DELETE_REQUEST:
      return { ...state, loading: true }
    case IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: state.images.filter(image => image.id !== action.payload)
      }
    case IMAGE_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
