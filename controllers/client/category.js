import asyncHandler from "express-async-handler"
import Category from "../../models/Category.js"
import mongoose from "mongoose"

// @desc    Get all categories
// @route   GET /api/v1/admin/blog/categories
// @access  private/admin
const getCategories = asyncHandler(async (req, res, next) => {
	const categories = await Category.find({})

	res.json(categories)
})

// @desc    Get single category
// @route   GET /api/v1/admin/category/:id
// @access  private/admin
const getCategory = asyncHandler(async ({ params: { id }, t }, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(id)) return next()

	const category = await Category.findOne({ _id: id })

	if (!category) {
		res.status(400)
		throw new Error("category not found")
	}

	res.json(category)
})

// @desc    Create an  category
// @route   POST /api/v1/admin/category
// @access  private/admin
// @validator createSchema middleware/validators/category
const createCategory = asyncHandler(async (req, res) => {
	const { user, body } = req
	body.img = req.body.images[0]
	body.creatorId = user?.id
	const category = await Category.create(body)

	res.status(201).json(category)
})

// @desc    Update an existing  category
// @route   PUT /api/v1/admin/category/:id
// @access  private/admin
// @validator updateSchema middleware/validators/category
const updateCategory = asyncHandler(
	async ({ params, body, user }, res, next) => {
		if (!mongoose.Types.ObjectId.isValid(params.id)) return next()

		body.updatorId = user?.id

		const category = await Category.findByIdAndUpdate(
			params.id,
			{
				body,
			},
			{ new: true }
		)

		if (!category) {
			res.status(400)
			throw new Error("category not found")
		}

		res.status(200).json(category)
	}
)

// @desc    Delete an existing  category
// @route   DELETE /api/v1/admin/category/:id
// @access  private/admin
// @validator deleteSchema middleware/validators/category
const deleteCategory = asyncHandler(async ({ params }, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(params.id)) return next()

	const category = await Category.findByIdAndDelete(params.id)

	if (!category) {
		res.status(400)
		throw new Error("category was not found")
	}

	res.status(200).json({})
})

export default {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
}
