import { checkSchema, validationResult } from "express-validator"
import { existsSync, unlinkSync } from "fs"
import User from "../../models/User.js"

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

const loginThirdSchema = checkSchema({
	email: {
		isEmail: {
			bail: true,
			errorMessage: "invalid email address.",
		},
		isEmpty: {
			negated: true,
			errorMessage: "email is required.",
		},
	},
})

const verifyEmailSchema = checkSchema({
	email: {
		in: "body",
		isEmail: {
			bail: true,
		},
		isEmpty: {
			negated: true,
			errorMessage: "email is required.",
		},
	},
	token: {
		in: "body",
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "token is required.",
		},
	},
})

const thirdPartySchema = checkSchema({
	email: {
		in: "body",
		isEmail: {
			bail: true,
		},
		isEmpty: {
			negated: true,
			errorMessage: "email is required.",
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
	thirdPartyId: {
		in: "body",
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "auth third party is required.",
		},
	},
})

const resendTokenSchema = checkSchema({
	email: {
		in: "body",
		isEmpty: {
			negated: true,
			errorMessage: "email is required.",
		},
		isEmail: {
			bail: true,
			errorMessage: "invalid email.",
		},
		custom: {
			options: async (email, { req }) => {
				const user = await User.findOne({ email })
				if (!user) {
					return Promise.reject("email not found.")
				}
				return Promise.resolve()
			},
		},
	},
})

const forgotPasswordSchema = checkSchema({
	email: {
		isEmail: {
			bail: true,
			errorMessage: "invalid email address.",
		},
		isEmpty: {
			negated: true,
			errorMessage: "Email is empty!",
		},
	},
})

const resetPasswordSchema = checkSchema({
	token: {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "token is required!",
		},
	},
	newPassword: {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "new password is required!",
		},
	},
	confirmPassword: {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "confirm password is required!",
		},
		custom: {
			options: (value, { req }) => {
				if (value === req.body.newPassword) {
					return Promise.resolve()
				}
			},
			errorMessage: "password and confirm password does not match",
		},
	},
})

export default {
	login: [loginSchema, errorHandler],
	login_thirdParty: [loginThirdSchema, errorHandler],
	verifyEmail: [verifyEmailSchema, errorHandler],
	resendToken: [resendTokenSchema, errorHandler],
	forgotPassword: [forgotPasswordSchema, errorHandler],
	resetPassword: [resetPasswordSchema, errorHandler],
	thirdParty: [thirdPartySchema, errorHandler],
}
