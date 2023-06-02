import { checkSchema, validationResult } from "express-validator"
import { existsSync, unlinkSync } from "fs"

const aboutSchema = checkSchema({
	firstName: {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "First name is required",
		},
	},

	lastName: {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "Last name is required",
		},
	},

	country: {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "Country is required",
		},
	},

	languages: {
		isEmpty: {
			negated: true,
			errorMessage: "Languages is required",
		},
	},

	age: {
		isEmpty: {
			negated: true,
			errorMessage: " Age is required",
		},
	},

	mentorshipFor: {
		isEmpty: {
			negated: true,
			errorMessage: " Mentorship for is required",
		},
	},

	"provideMentorship[*].name": {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "Provide mentorship name is required",
		},
	},

	"provideMentorship[*].level": {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "Provide mentorship level is required",
		},
	},

	mentorExperience: {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "Mentor Experience is required",
		},
	},

	mentorSituation: {
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: "Mentor situation is required",
		},
	},
})

const profileImgSchema = checkSchema({
	profileImg: {
		escape: true,
		trim: true,
		custom: {
			escape: true,
			trim: true,
			options: (_, { req }) => {
				if (!req.body.images[0].name === "profileImg") {
					return Promise.reject("profileImg is required!")
				}
				return Promise.resolve()
			},
		},
	},
})

const educationSchema = checkSchema({
	name: {
		isLength: { max: 20 },
	},
	specialization: {
		isLength: { max: 50 },
	},
})

const descriptionSchema = checkSchema({
	headline: {
		isLength: { max: 100 },
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: " Headline is required",
		},
	},

	introduction: {
		isLength: { max: 100 },
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: " introduction is required",
		},
	},

	workExperience: {
		isLength: { max: 100 },
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: " workExperience is required",
		},
	},

	mentorshipProgram: {
		isLength: { max: 100 },
		escape: true,
		trim: true,
		isEmpty: {
			negated: true,
			errorMessage: " mentorshipProgram is required",
		},
	},
})

const videoLinkSchema = checkSchema({
	videoLink: {
		trim: true,
		custom: {
			escape: true,
			trim: true,
			options: (_, { req }) => {
				if (req?.file && req.body.videoLink !== "") {
					return Promise.reject(
						"Please select only a video file or video link."
					)
				} else if (req?.file && req.body.videoLink === "") {
					return Promise.resolve()
				} else if (!req?.file && req.body.videoLink !== "") {
					return Promise.resolve()
				} else {
					return Promise.reject("Please provide a video file or video link.")
				}
			},
		},
	},
})

const availabilitySchema = checkSchema({
	availability: {
		isEmpty: {
			negated: true,
			errorMessage: "availability is required",
		},
	},

	timeZone: {
		isEmpty: {
			negated: true,
			errorMessage: "Time zone is required",
		},
	},
})

const timeZoneSchema = checkSchema({
	zone: {
		escape: true,
		isEmpty: {
			negated: true,
			errorMessage: "zone is required",
		},
	},

	day: {
		escape: true,
		isEmpty: {
			negated: true,
			errorMessage: "day is required",
		},
	},

	date: {
		escape: true,
		isEmpty: {
			negated: true,
			errorMessage: "date is required",
		},
	},
})

const pricingSchema = checkSchema({
	hourlyRate: {
		escape: true,
		isEmpty: {
			negated: true,
			errorMessage: "hourly price is required",
		},
	},

	serviceFee: {
		escape: true,
		isEmpty: {
			negated: true,
			errorMessage: "services fee is required",
		},
	},

	discount: {
		escape: true,
	},
	totalPayment: {
		escape: true,
		isEmpty: {
			negated: true,
			errorMessage: "total is required",
		},
	},
})

const mentorStatusSchema = checkSchema({
	status: {
		isEmpty: {
			negated: true,
			errorMessage: "status is required",
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
	availability: [availabilitySchema, errorHandler],
	description: [descriptionSchema, errorHandler],
	education: [educationSchema, errorHandler],
	profileImg: [profileImgSchema, errorHandler],
	timeZone: [timeZoneSchema, errorHandler],
	video: [videoLinkSchema, errorHandler],
	pricing: [pricingSchema, errorHandler],
	about: [aboutSchema, errorHandler],
	mentorStatus: [mentorStatusSchema, errorHandler],
}
