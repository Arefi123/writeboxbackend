import { checkSchema, validationResult } from "express-validator"
import { existsSync, unlinkSync } from "fs"

const createSchema = checkSchema({
	name: {
		isEmpty: {
			negated: true,
			errorMessage: " name is required",
		},
	},
	slug: {
		isEmpty: {
			negated: true,
			errorMessage: "Slug is required",
		},
	},
	description: {
		isEmpty: {
			negated: true,
			errorMessage: "description is required",
		},
	},
})

const updateSchema = checkSchema({
	name: {
		isEmpty: {
			negated: true,
			errorMessage: " name is required",
		},
	},
	slug: {
		isEmpty: {
			negated: true,
			errorMessage: "slug is required",
		},
	},
	description: {
		isEmpty: {
			negated: true,
			errorMessage: "description  is required",
		},
	},
})

const errorHandler = (req, res, next) => {
	// handling validation errors
	const validationErrs = validationResult(req)
	if (!validationErrs.isEmpty()) {
		// removing uploaded files
		if (req.hasOwnProperty("file") && existsSync(req.file.path)) {
			unlinkSync(req.file.path)
		}
		return res.status(400).json({ errors: validationErrs.array() })
	}
	next()
}

export default {
	createCategory: [createSchema, errorHandler],
	updateCategory: [updateSchema, errorHandler],
}
