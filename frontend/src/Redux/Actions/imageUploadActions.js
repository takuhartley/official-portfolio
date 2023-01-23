import axios from 'axios'
import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_UPDATE_REQUEST,
  IMAGE_UPDATE_SUCCESS,
  IMAGE_UPDATE_FAIL,
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS,
  IMAGE_LIST_FAIL,
  IMAGE_DETAILS_REQUEST,
  IMAGE_DETAILS_SUCCESS,
  IMAGE_DETAILS_FAIL
} from '../Constants/imageConstants'
import { logout } from '../Actions/userActions.js'

export const uploadImage = imageData => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_UPLOAD_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/images/upload`, imageData, config)
    dispatch({
      type: IMAGE_UPLOAD_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: IMAGE_UPLOAD_FAIL,
      payload: message
    })
  }
}

export const listImages = () => async dispatch => {
  try {
    dispatch({ type: IMAGE_LIST_REQUEST })

    const { data } = await axios.get(`/api/images`)

    dispatch({
      type: IMAGE_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: IMAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listImageDetails = imageId => async dispatch => {
  try {
    dispatch({ type: IMAGE_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/images/${imageId}`)
    console.log('Redux Actions ' + JSON.stringify(data))
    dispatch({
      type: IMAGE_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: IMAGE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateImage = imageData => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_UPDATE_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `/api/images/${imageData.id}`,
      imageData,
      config
    )

    dispatch({
      type: IMAGE_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: IMAGE_UPDATE_FAIL,
      payload: message
    })
  }
}

export const deleteImage = id => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_DELETE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/images/${id}`, config)

    dispatch({
      type: IMAGE_DELETE_SUCCESS
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: IMAGE_DELETE_FAIL,
      payload: message
    })
  }
}
