import { checkSchema, validationResult } from "express-validator"
import { existsSync, unlinkSync } from "fs"

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

const loginSchema = checkSchema({
	email: {
		isEmail: {
			bail: true,
			errorMessage: "invalid email address.",
		},
		normalizeEmail: true,
		isEmpty: {
			negated: true,
			errorMessage: "email is required.",
		},
	},
	password: {
		isEmpty: {
			negated: true,
			errorMessage: "password is required.",
		},
	},
})

export default {
	login: [loginSchema, errorHandler],
}
