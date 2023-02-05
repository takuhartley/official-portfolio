import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../../../Redux/Actions/categoryActions.js'

const CategoryDropdown = props => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categoriesList = useSelector(state => state.categoriesList)
  const { loading, error, categories } = categoriesList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCategories())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, navigate])
  const handleChange = e => {
    props.onChange(e.target.value)
  }
  return (
    <>
      {loading && <LoadingComponent></LoadingComponent>}
      {error && <AlertComponent severity='danger'>{error}</AlertComponent>}
      <div>CategoryDropdown</div>
      <div>
        <FormControl>
          <InputLabel id='image-select-label'>Category</InputLabel>
          <Select
            labelId='image-select-label'
            id='image-select'
            onChange={handleChange}
          >
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select a Category</FormHelperText>
        </FormControl>
      </div>
    </>
  )
}

export default CategoryDropdown
