import asyncHandler from "express-async-handler"
import User from "../../models/User.js"
import mongoose from "mongoose"

const getMentors = asyncHandler(async (req, res) => {
	res.status(200).json(res.advancedResults)
})

const activeMentors = asyncHandler(async (req, res) => {
	const active = await User.find({ status: "approved" }).populate(
		"mentorshipFor"
	)
	res.status(200).json(active)
})

const pendingMentors = asyncHandler(async (req, res) => {
	const pending = await User.find({ status: "pending" }).populate(
		"mentorshipFor"
	)
	res.status(200).json(pending)
})

const mentorStatus = asyncHandler(async (req, res) => {
	const { user, body } = req

	if (!mongoose.Types.ObjectId.isValid(body.id)) {
		res.status(400)
		throw new Error("is not an id")
	}

	body.updaterId = user?.id

	const mentor = await User.findByIdAndUpdate(
		body.id,
		{
			status: body.status,
			updaterId: user?.id,
		},
		{ new: true }
	).populate("mentorshipFor")

	if (!mentor) {
		res.status(400)
		throw new Error("no mentor was found")
	}

	mentor.sendStatusEmail(body.status, body?.message, body?.process)

	res.status(200).json(mentor)
})

const mentorDelete = asyncHandler(async (req, res) => {
	const { user, body } = req

	if (!mongoose.Types.ObjectId.isValid(body.id)) {
		res.status(400)
		throw new Error("is not an id")
	}

	body.updaterId = user?.id

	const mentor = await User.findByIdAndDelete(body.id).populate("mentorshipFor")

	if (!mentor) {
		res.status(400)
		throw new Error("no mentor was found")
	}

	res.status(200).json(mentor)
})

export default {
	getMentors,
	mentorStatus,
	activeMentors,
	pendingMentors,
	mentorDelete,
}
