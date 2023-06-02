import User from "../../models/User.js"
import asyncHandler from "express-async-handler"

// // @desc    Signup Mentors
// // @route   POST /api/v1/mentee/auth/signup
// // @access  Public
const signup = asyncHandler(async (req, res) => {
	const { body } = req
	// Check for mentees-users
	const mentee = await User.create({
		email: body["email"],
		password: body["password"],
		userType: "mentee",
	})

	if (!mentee) {
		res.statusCode = 500
		throw new Error("Failed to create user.")
	}

	await mentee.sendEmailVerificationToken()

	res.json({
		id: mentee["_id"] || null,
		email: mentee["email"] || null,
	})
})

export default {
	signup,
}
