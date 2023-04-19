import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Category from '../models/categoriesModel.js'

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { name, description, color } = req.body

  // Check if a category with the same name already exists
  const existingCategory = await Category.findOne({ name })
  if (existingCategory) {
    return res.status(400).json({ error: 'Category already exists' })
  }

  // Create a new category
  const newCategory = new Category({
    name,
    description,
    color
  })

  // Save the category to the database
  await newCategory.save()

  // Send a response with a success message and the new category
  res.json({ message: 'Category added successfully', category: newCategory })
})

const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, color } = req.body // Add 'color' here

  // Find the category by its ID
  const category = await Category.findById(req.params.id)
  if (!category) {
    // If the category does not exist, send a response with an error message
    return res.status(404).json({ error: 'Category not found' })
  }

  // Update the category with the new data
  category.name = name
  category.description = description
  category.color = color // Add this line

  // Save the updated category to the database
  await category.save()

  // Send a response with the updated category
  res.json({ message: 'Category updated successfully', category })
})

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    // Find all categories in the database
    const categories = await Category.find()

    // If no categories are found, send an error message
    if (!categories.length) {
      return res.status(404).json({ message: 'No categories found' })
    }

    // Send the categories as a response
    res.json({ categories })
  } catch (err) {
    // If there was an error connecting to the database, send a message and the error
    res
      .status(500)
      .json({ message: "Couldn't retrieve categories", error: err })
  }
})
const getCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id

  try {
    // Make the API call to retrieve the category by ID
    const category = await Category.findById(id)

    // Send the response with the retrieved category
    res.json(category)
  } catch (error) {
    // If there is an error, send a response with the error status code
    res.status(error.status || 500).send(error.message)
  }
})

const deleteCategory = asyncHandler(async (req, res) => {
  // Find the category by its ID
  const category = await Category.findById(req.params.id)
  if (!category) {
    // If the category does not exist, send a response with an error message
    return res.status(404).json({ error: 'Category Not Found Boss' })
  }
  // Delete the category
  await category.remove()
  // Send a response with a success message
  res.json({ message: 'Category Deletion Succeeded Daddy' })
})

export {
  createCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  deleteCategory
}
