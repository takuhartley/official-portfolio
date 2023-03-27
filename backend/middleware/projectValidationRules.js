import { check } from 'express-validator'
import { validationResult } from 'express-validator'

// Validation rules
const projectValidationRules = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  check('subTitle')
    .notEmpty()
    .withMessage('SubTitle is required')
    .isLength({ min: 3 })
    .withMessage('SubTitle must be at least 3 characters long'),
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  check('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required'),
  check('links.*.url')
    .optional({ checkFalsy: true }) // Allow empty strings or null values
    .isURL()
    .withMessage('Invalid URL format')
]

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

export { projectValidationRules, validate }
