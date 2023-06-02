import express from "express"
import userController from "../../controllers/admin/mentor.js"
import { authenticate, authorize } from "../../middleware/authMiddleware.js"
import userValidator from "../../middleware/validators/mentor/mentor.js"
import advancedResults from "../../middleware/advancedResult.js"
import User from "../../models/User.js"

const router = express.Router()

router.use(authenticate, authorize(User, "admin"))

router
	.route("/")
	.get(advancedResults(User, "mentorshipFor"), userController.getMentors)

router.route("/active").get(userController.activeMentors)

router.route("/pending").get(userController.pendingMentors)

router
	.route("/change-status")
	.put(userValidator.mentorStatus, userController.mentorStatus)

router.route("/").delete(userController.mentorStatus)

export default router
