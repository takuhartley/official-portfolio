import axios from 'axios'
import {
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS
} from '../Constants/projectConstants'

export const listProjects = () => async dispatch => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST })
    const { data } = await axios.get('/api/projects')
    dispatch({
      type: PROJECT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
