import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  listCategories,
  deleteCategory,
  updateCategory
} from '../../../Redux/Actions/categoryActions.js'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridCellModesModel } from '@mui/x-data-grid'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'
import './CategoriesTable.scss'
const CategoriesTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categoriesList = useSelector(state => state.categoriesList)
  const { loading, error, categories } = categoriesList
  const categoryDelete = useSelector(state => state.categoryDelete)
  const { success: successDelete } = categoryDelete
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const categoryUpdate = useSelector(state => state.categoryUpdate)
  const { success: successUpdate, error: errorUpdate } = categoryUpdate
  const [cellModesModel, setCellModesModel] = React.useState({})
  const columns = [
    { field: '_id', headerName: 'ID', minWidth: 100 },
    {
      field: 'name',
      headerName: 'Category Name',
      minWidth: 200,
      editable: true // Make this column editable
    },
    {
      field: 'description',
      headerName: 'Category Description',
      minWidth: 300,
      editable: true // Make this column editable
    },
    {
      field: 'color',
      headerName: 'Category Color',
      minWidth: 150,
      editable: true // Make this column editable
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      renderCell: params => (
        <div>
          <button onClick={() => deleteHandler(params.row._id)}>Delete</button>
        </div>
      )
    }
  ]
  const handleEdit = (id, field, value) => {
    dispatch(
      updateCategory(id, {
        [field]: value
      })
    )
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCategories())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, successDelete, successUpdate, navigate])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCategory(id))
    }
  }
  const getRowClassName = params => {
    return `border-${params.row.color.toLowerCase()}`
  }
  const EditToolbar = props => {
    const { cellModesModel, setCellModesModel } = props

    const handleSave = () => {
      Object.keys(cellModesModel).forEach(id => {
        Object.keys(cellModesModel[id]).forEach(field => {
          if (cellModesModel[id][field].mode === 'edit') {
            const value = cellModesModel[id][field].value
            handleEdit(id, field, value)
          }
        })
      })
      setCellModesModel({})
    }

    return (
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          p: 1
        }}
      >
        <Button onClick={handleSave} variant='outlined'>
          Save
        </Button>
      </Box>
    )
  }
  return (
    <>
      <div className='categories-table'>
        <h1>Category Table</h1>
        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <AlertComponent severity='error' message={error} />
        ) : (
          <>
            {successUpdate && (
              <AlertComponent
                severity='success'
                message='Category updated successfully'
              />
            )}
            {errorUpdate && (
              <AlertComponent severity='error' message={errorUpdate} />
            )}
            <div className='data-grid'>
              <DataGrid
                rows={categories}
                columns={columns}
                pageSize={5}
                getRowId={row => row._id}
                rowClassName={getRowClassName}
                cellModesModel={cellModesModel}
                onCellModesModelChange={model => setCellModesModel(model)}
                slots={{
                  toolbar: EditToolbar
                }}
                slotProps={{
                  toolbar: {
                    cellModesModel,
                    setCellModesModel
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CategoriesTable
