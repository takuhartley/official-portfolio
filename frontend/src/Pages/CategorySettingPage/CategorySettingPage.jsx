import React from 'react'
import CategoryDropdown from '../../Components/CategoryComponents/CategoryDropdown/CategoryDropdown'
import CategoryNew from '../../Components/CategoryComponents/CategoryNew/CategoryNew'
import CategoriesTable from '../../Components/CategoryComponents/CategoriesTable/CategoriesTable'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import './CategorySettingPage.scss'
const CategoryComponent = () => {
  return (
    <>
      <Box className='category-settings-container'>
        <Container maxWidth='lg'>
          <div className='category-settings-header'>
            <h3 className='category-settings-title'>Category Settings ⚙️</h3>
          </div>
          <div className='category-settings-content'>
            <div className='category-new-container'>
              <CategoryNew />
            </div>
            <div className='category-dropdown-container'>
              <CategoryDropdown />
            </div>
            <div className='category-table-container'>
              <CategoriesTable />
            </div>
          </div>
        </Container>
      </Box>
    </>
  )
}

export default CategoryComponent
