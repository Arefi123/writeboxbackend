import express from "express"
import clientController from "../../controllers/client/mentor.js"

const router = express.Router()

router.route("/").get(clientController.mentorProfile)

router.route("/specialization").get(clientController.specialization)

router.route("/professional").get(clientController.professional)

export default router
