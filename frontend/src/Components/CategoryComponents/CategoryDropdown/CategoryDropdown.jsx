import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../../../Redux/Actions/categoryActions.js'
import {
  Button,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel
} from '@mui/material'

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
  const [selectedCategory, setSelectedCategory] = useState('')
  const handleAddCategory = () => {
    props.handleImageSelect(selectedCategory)
  }
  const handleChange = e => {
    setSelectedCategory(e.target.value)
  }
  return (
    <>
      {loading && <LoadingComponent></LoadingComponent>}
      {error && <AlertComponent severity='danger'>{error}</AlertComponent>}
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
      <div>
        <Button variant='contained' color='primary' onClick={handleAddCategory}>
          Add
        </Button>
      </div>
      <div>{selectedCategory}</div>
    </>
  )
}

export default CategoryDropdown
