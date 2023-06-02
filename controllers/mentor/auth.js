import jwt from "jsonwebtoken"
import User from "../../models/User.js"
import asyncHandler from "express-async-handler"

// // @desc    Signup Mentors
// // @route   POST /api/v1/mentor/auth/signup
// // @access  Public
const signup = asyncHandler(async (req, res) => {
	const { body } = req
	// Check for mentors-users
	const mentor = await User.create({
		email: body["email"],
		password: body["password"],
		userType: "mentor",
	})

	if (!mentor) {
		res.statusCode = 500
		throw new Error("Failed to create user.")
	}

	await mentor.sendEmailVerificationToken()

	res.json({
		id: mentor["_id"] || null,
		email: mentor["email"] || null,
	})
})

export default {
	signup,
}
