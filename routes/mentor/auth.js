import express from "express"
import authController from "../../controllers/mentor/auth.js"
import authValidator from "../../middleware/validators/mentor/auth.js"

const router = express.Router()

router.post("/sign-up", authValidator.signup, authController.signup)

export default router
