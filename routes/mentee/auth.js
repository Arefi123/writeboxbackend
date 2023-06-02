import express from "express"
import authController from "../../controllers/mentee/auth.js"
import authValidator from "../../middleware/validators/mentee/auth.js"

const router = express.Router()

router.post("/sign-up", authValidator.signup, authController.signup)

export default router
