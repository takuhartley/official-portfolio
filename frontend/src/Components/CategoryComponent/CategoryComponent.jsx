import React from 'react'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown'
import CategoryNew from '../CategoryNew/CategoryNew'
import CategoriesTable from '../CategoriesTable/CategoriesTable'
const CategoryComponent = () => {
  return (
    <>
      <h1>Category Settings</h1>
      <div>
        <CategoryNew />
      </div>
      <div>
        <CategoryDropdown />
      </div>
      <div>
        <CategoriesTable />
      </div>
    </>
  )
}

export default CategoryComponent
