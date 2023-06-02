import { checkSchema, validationResult } from "express-validator"
import { existsSync, unlinkSync } from "fs"
import User from "../../../models/User.js"

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

const signUpSchema = checkSchema({
	email: {
		isEmail: {
			bail: true,
			errorMessage: "Invalid email address!",
		},
		isEmpty: {
			negated: true,
			errorMessage: "Email is empty!",
		},
		custom: {
			options: async (email, { req }) => {
				const findEmail = await User.findOne({ email })
				if (findEmail) {
					return Promise.reject("Email already-exists")
				}
				return Promise.resolve()
			},
		},
	},
	password: {
		isEmpty: {
			negated: true,
			errorMessage: "Password is required.",
		},
		// isStrongPassword: {
		//   negated: true,
		//   errorMessage: "Password is weak required.",
		// },
	},
})

export default {
	signup: [signUpSchema, errorHandler],
}
