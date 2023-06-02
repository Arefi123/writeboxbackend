import jwt from "jsonwebtoken"
import User from "../../models/User.js"
import asyncHandler from "express-async-handler"

// @desc    Auth Mentor & get token
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	// Check for Mentor
	const user = await User.findOne({ email })
		.select("+password")
		.populate("mentorshipFor")
	if (!user) {
		res.status(403)
		return next(new Error("invalid credentials"))
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password)

	if (!isMatch) {
		return next(new Error("invalid credentials"))
	}

	if (!user.verifiedAt) {
		return next(new Error("user not verified!"))
	}

	const accessToken = await user.generateAccessToken()
	const refreshToken = await user.generateRefreshToken()

	const options = {
		httpOnly: true, //accessible only by web server
		secure: process.env.NODE_ENV === "production", //https
		sameSite: "Lax", //cross-site cookie
		maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
	}

	res.status(200).cookie("user_token", refreshToken, options).json({
		user,
		accessToken,
	})
})

// @desc    Auth  get token
// @route   POST /api/v1/auth/login-third-party
// @access  Public
const loginThirdParty = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	// Check for Mentor
	const user = await User.findOne({ email })
		.select("+password")
		.populate("mentorshipFor")

	if (!user) {
		res.status(403)
		return next(new Error("invalid credentials"))
	}

	if (!user.verifiedAt) {
		return next(new Error("user not verified!"))
	}

	const accessToken = await user.generateAccessToken()
	const refreshToken = await user.generateRefreshToken()

	const options = {
		httpOnly: true, //accessible only by web server
		secure: process.env.NODE_ENV === "production", //https
		sameSite: "Lax", //cross-site cookie
		maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
	}

	res.status(200).cookie("user_token", refreshToken, options).json({
		user,
		accessToken,
	})
})

// // @desc    Signup Mentors
// // @route   POST /api/v1/mentor/auth/signup-google
// // @access  Public
const signThirdParty = asyncHandler(async (req, res) => {
	const { body } = req
	const lastIndex = body.fullName?.lastIndexOf(" ")
	const firstName = body.fullName.slice(0, lastIndex)
	const lastName = body.fullName.slice(lastIndex + 1)
	// Check for mentors-users
	const user = await User.create({
		email: body["email"],
		profileImg: body["profileImg"],
		thirdPartyId: body["thirdPartyId"],
		firstName: firstName,
		lastName: lastName,
		userType: body["userType"],
		verifiedAt: new Date(),
	})

	if (!user) {
		res.statusCode = 500
		throw new Error("Failed to create user.")
	}

	const accessToken = await user.generateAccessToken()

	res.status(200).json({
		user,
		accessToken,
	})
})

// // @desc      Log Mentor out / clear cookie
// // @route     GET /api/v1/mentor/auth/logout
// // @access    Private
const refresh = (req, res) => {
	const cookies = req.cookies

	if (!cookies?.user_token)
		return res.status(401).json({ message: "no cookie Unauthorized" })

	const refreshToken = cookies.user_token

	jwt.verify(
		refreshToken,
		process.env.JWT_REFRESH_SECRET,
		async (err, decoded) => {
			if (err) return res.status(403).json({ message: "Forbidden" })

			const foundMentor = await Mentor.findById(decoded.id).exec()

			if (!foundMentor) return res.status(401).json({ message: "Unauthorized" })

			const accessToken = await foundMentor.generateAccessToken()

			res.json({
				id: foundMentor._id,
				accessToken,
			})
		}
	)
}

// // @desc      Verify Email token
// // @route     PUT /api/v1/mentor/auth/verify
// // @access    Public
const verifyEmail = asyncHandler(async (req, res) => {
	const { body } = req

	const user = await User.findOne({ email: body.email })
		.select("+update_secret")
		.exec()

	if (!user) {
		throw new Error("Email not found!")
	}

	if (user.verifiedAt) {
		throw new Error("Email already verified")
	}

	const verify = user.verifyEmailVerificationToken(body.token)

	if (!verify) {
		throw new Error("Invalid Token!")
	}

	user.verifiedAt = new Date()

	await user.save()

	const accessToken = await user.handleLogin()

	return res.json({
		id: user["_id"] || null,
		email: user["email"] || null,
		verifiedAt: user["verifiedAt"] || null,
		accessToken,
	})
})

// // @desc    resend token to user
// // @route   POST /api/v1/mentor/auth/resend-token
// // @access  Public
const resendToken = asyncHandler(async (req, res) => {
	const { body } = req
	const user = await User.findOne({ email: body.email }).select(
		"+update_secret"
	)

	if (user.verifiedAt) {
		throw new Error("Email already verified")
	}

	await user.sendEmailVerificationToken()

	res.json({
		id: user["_id"] || null,
		email: user["email"] || null,
	})
})

// // @desc      Forgot password
// // @route     POST /api/v1/auth/forgot-password
// // @access    Public
const forgotPassword = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email })
		.select("+update_secret")
		.populate("mentorshipFor")

	if (!user) {
		res.statusCode = 404
		throw new Error("mentor not registered!")
	}
	await user.sendEmailVerificationToken()

	res.json({
		id: user["_id"] || null,
		email: user["email"] || null,
	})
})

// // @desc      Reset password
// // @route     PUT /api/v1/mentor/reset-password
// // @access    Public
const resetPassword = asyncHandler(async (req, res) => {
	const { token, newPassword, email } = req.body

	const user = await User.findOne({ email: email })
		.select("+update_secret")
		.populate("mentorshipFor")

	const verify = user.verifyEmailVerificationToken(token)

	if (!user || !verify) {
		res.statusCode = 400
		throw new Error("token is in correct!")
	}

	user.password = newPassword
	user.resetPasswordToken = undefined

	await user.save()

	return res.status(200).json({ success: true })
})

export default {
	login,
	// logout,
	signThirdParty,
	loginThirdParty,
	refresh,
	verifyEmail,
	resendToken,
	resetPassword,
	forgotPassword,
}
