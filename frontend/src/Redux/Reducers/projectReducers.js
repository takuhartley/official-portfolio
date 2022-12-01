import {
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_DETAIL_FAIL,
  PROJECT_DETAIL_REQUEST,
  PROJECT_DETAIL_SUCCESS
} from '../Constants/projectConstants'
export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true, projects: [] }
    case PROJECT_LIST_SUCCESS:
      return { loading: false, projects: action.payload }
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const projectDetailsReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_DETAIL_REQUEST:
      return { loading: true, ...state }
    case PROJECT_DETAIL_SUCCESS:
      return { loading: false, project: action.payload }
    case PROJECT_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
