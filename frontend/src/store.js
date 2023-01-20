import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  projectListReducer,
  projectDetailsReducer,
  projectDeleteReducer,
  projectCreateReducer,
  projectUpdateReducer,
  projectImagesReducer
} from './Redux/Reducers/projectReducers'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './Redux/Reducers/userReducers'

import {
  imageUploadReducer,
  imageListReducer,
  imageDetailsReducer,
  imageUpdateReducer,
  imageDeleteReducer
} from './Redux/Reducers/imageReducers'

const reducer = combineReducers({
  projectList: projectListReducer,
  projectDetails: projectDetailsReducer,
  projectDelete: projectDeleteReducer,
  projectCreate: projectCreateReducer,
  projectUpdate: projectUpdateReducer,
  projectImages: projectImagesReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  imageUpload: imageUploadReducer,
  imageList: imageListReducer,
  imageDetails: imageDetailsReducer,
  imageUpdate: imageUpdateReducer,
  imageDelete: imageDeleteReducer
})
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const initialState = { userLogin: { userInfo: userInfoFromStorage } }
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
