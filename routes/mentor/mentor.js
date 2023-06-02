import express from "express"
import User from "../../models/User.js"
import imgUploader from "../../utils/imgUploader.js"
import videoUploader from "../../utils/videoUploader.js"
import videoToCloud from "../../utils/videoToCloudinary.js"
import uploadToCloud from "../../utils/uploadCloudinary.js"
import advancedResults from "../../middleware/advancedResult.js"
import mentorController from "../../controllers/mentor/mentor.js"
import mentorValidator from "../../middleware/validators/mentor/mentor.js"

const router = express.Router()

router.get(
	"/mentor-profile",
	advancedResults(User, "mentorshipFor", "approved"),
	mentorController.getMentorProfile
)

router.get("/user-data", mentorController.getData)

router.get("/about", mentorController.getAbout)

router.get("/profile", mentorController.getProfile)

router.route("/video").get(mentorController.getVideo)

router.route("/description").get(mentorController.getDescription)

router.route("/subject").get(mentorController.getSubject)

router.route("/pricing").get(mentorController.getPricing)

router.route("/background").get(mentorController.getBackground)

router.route("/about").put(mentorValidator.about, mentorController.about)

router
	.route("/profile")
	.put(
		imgUploader([{ name: "profileImg" }]),
		uploadToCloud,
		mentorValidator.profileImg,
		mentorController.profile
	)

router
	.route("/education")
	.put(
		imgUploader([{ name: "localProofs" }, { name: "diploma" }]),
		uploadToCloud,
		mentorValidator.education,
		mentorController.education
	)

router
	.route("/description")
	.put(mentorValidator.description, mentorController.description)

router
	.route("/skill")
	.put(
		videoUploader,
		mentorValidator.video,
		videoToCloud,
		mentorController.videoLink
	)

router
	.route("/availability")
	.put(mentorValidator.availability, mentorController.availability)

router.route("/pricing").put(mentorValidator.pricing, mentorController.pricing)

export default router
