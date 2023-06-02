import mongoose from "mongoose"
import asyncHandler from "express-async-handler"
import User from "../../models/User.js"
import Category from "../../models/Category.js"

const mentorProfile = asyncHandler(async (req, res) => {
	const {
		mentorshipFor,
		minRate,
		maxRate,
		startTime,
		endTime,
		level,
		provideMetorName,
		day,
		country,
	} = req.query

	if (minRate && maxRate) {
		const mentors = await User.aggregate([
			{
				$match: {
					country: { $regex: country || "", $options: "i" },
					"availability.day": { $regex: day || "", $options: "i" },
					"provideMentorship.name": {
						$regex: provideMetorName || "",
						$options: "i",
					},
					"provideMentorship.level": { $regex: level || "", $options: "i" },
					"availability.endTime": { $regex: endTime || "", $options: "i" },
					"availability.startTime": { $regex: startTime || "", $options: "i" },
					$and: [
						{ "hourlyRate.minRate": { $gte: +minRate } },
						{ "hourlyRate.maxRate": { $lte: +maxRate } },
					],
					mentorshipFor: { $eq: mongoose.Types.ObjectId(mentorshipFor) },
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "mentorshipFor",
					foreignField: "_id",
					as: "mentorshipFor",
				},
			},
		])

		res.status(200).json({ count: mentors.length, mentors })
	} else {
		const mentors = await User.aggregate([
			{
				$match: {
					country: { $regex: country || "", $options: "i" },
					"availability.day": { $regex: day || "", $options: "i" },
					"provideMentorship.name": {
						$regex: provideMetorName || "",
						$options: "i",
					},
					"provideMentorship.level": { $regex: level || "", $options: "i" },
					"availability.endTime": { $regex: endTime || "", $options: "i" },
					"availability.startTime": { $regex: startTime || "", $options: "i" },
					mentorshipFor: { $eq: mongoose.Types.ObjectId(mentorshipFor) },
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "mentorshipFor",
					foreignField: "_id",
					as: "mentorshipFor",
				},
			},
		])

		res.status(200).json({ count: mentors.length, mentors })
	}
})
const getCategories = asyncHandler(async (req, res, next) => {
	const categories = await Category.find({})

	res.status(200).json(categories)
})

const specialization = asyncHandler(async (req, res, next) => {
	const mentors = await User.find({ status: "approved" })
		.populate("mentorshipFor", "name slug")
		.select("mentorshipFor")

	const specialization = mentors[0]?.mentorshipFor

	res.status(200).json(specialization)
})

const professional = asyncHandler(async (req, res, next) => {
	const professional = await User.find({ status: "approved" }).distinct(
		"provideMentorship"
	)

	res.status(200).json(professional)
})

export default {
	specialization,
	mentorProfile,
	getCategories,
	professional,
}
