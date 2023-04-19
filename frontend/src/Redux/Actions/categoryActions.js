import axios from 'axios'
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_IMAGES_REQUEST,
  CATEGORY_IMAGES_SUCCESS,
  CATEGORY_IMAGES_FAIL
} from '../Constants/categoryConstants'
import { logout } from '../Actions/userActions'

export const listCategories = () => async dispatch => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })

    const { data } = await axios.get(`/api/categories`)
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listCategoryDetails = categoryId => async dispatch => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: categoryId })
    const { data } = await axios.get(`/api/CATEGORYs/${categoryId}`)
    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data
    }) //update payload to include images array
  } catch (error) {
    dispatch({ type: CATEGORY_DETAILS_FAIL, payload: error.message })
  }
}

export const deleteCategory = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/categories/${id}`, config)

    dispatch({
      type: CATEGORY_DELETE_SUCCESS
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
      type: CATEGORY_DELETE_FAIL,
      payload: message
    })
  }
}

export const createCategory = categoryData => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST
    })
    if (!categoryData.name) {
      throw new Error('Categpry name is required.')
    }
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(
      `/api/categories/new`,
      categoryData,
      config
    )

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response?.data?.message ?? error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message
    })
  }
}

export const getCategoryImage = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_IMAGES_REQUEST
    })

    const response = await axios.get(`/api/images/${id}`)
    dispatch({
      type: CATEGORY_IMAGES_SUCCESS,
      payload: response
    })
  } catch (error) {
    const message = error.response?.data?.message ?? error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CATEGORY_IMAGES_FAIL,
      payload: message
    })
  }
}

export const updateCategory =
  (id, updatedData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORY_UPDATE_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.patch(
        `/api/categories/${id}`,
        updatedData,
        config
      )

      dispatch({
        type: CATEGORY_UPDATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
