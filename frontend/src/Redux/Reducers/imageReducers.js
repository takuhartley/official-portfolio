import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_DETAILS_REQUEST,
  IMAGE_DETAILS_SUCCESS,
  IMAGE_DETAILS_FAIL,
  IMAGE_DETAILS_CLEAR,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS,
  IMAGE_LIST_FAIL,
  IMAGE_UPDATE_REQUEST,
  IMAGE_UPDATE_SUCCESS,
  IMAGE_UPDATE_FAIL,
  IMAGE_DETAILS_RESET
} from '../Constants/imageConstants'
import axios from 'axios'

const initialState = {
  image: null,
  images: [],
  repos: [],
  loading: false,
  error: {}
}

export const imageUploadReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true }
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        images: payload
      }
    case IMAGE_UPLOAD_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export const imageListReducer = (state = { images: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case IMAGE_LIST_REQUEST:
      return { loading: true, images: [] }
    case IMAGE_LIST_SUCCESS:
      return {
        loading: false,
        images: payload.images
      }
    case IMAGE_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const imageDetailsReducer = (state = { images: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case IMAGE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case IMAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        image: payload
      }
    case IMAGE_DETAILS_FAIL:
      return { loading: false, error: payload }
    case IMAGE_DETAILS_RESET:
      return { image: {}, images: [] } //include images array
    default:
      return state
  }
}

export const imageUpdateReducer = (state = { images: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case IMAGE_UPDATE_REQUEST:
      return { ...state, loading: true }
    case IMAGE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...state.images, payload]
      }
    case IMAGE_UPDATE_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
export const imageDeleteReducer = (state = { images: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true }
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...state.images, payload]
      }
    case IMAGE_UPLOAD_FAIL:
      return { ...state, loading: false, error: payload }
    case IMAGE_DELETE_REQUEST:
      return { ...state, loading: true }
    case IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: state.images.filter(image => image.id !== payload)
      }
    case IMAGE_DELETE_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
