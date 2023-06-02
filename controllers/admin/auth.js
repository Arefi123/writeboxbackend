import User from "../../models/User.js"
import asyncHandler from "express-async-handler"

// @desc    Auth Admin & get token
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	// Check for Admin
	const admin = await Admin.findOne({ email }).select("+password")

	if (!admin) {
		res.status(403)
		return next(new Error("invalid credentials"))
	}

	// Check if password matches
	const isMatch = await admin.matchPassword(password)

	if (!isMatch) {
		return next(new Error("invalid credentials"))
	}

	const accessToken = await admin.generateAccessToken()
	const refreshToken = await admin.generateRefreshToken()

	const options = {
		httpOnly: true, //accessible only by web server
		secure: process.env.NODE_ENV === "production", //https
		sameSite: "Lax", //cross-site cookie
		maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
	}

	res.status(200).cookie("Admin_token", refreshToken, options).json({
		admin,
		accessToken,
	})
})

export default {
	login,
}
