import express from "express"
import auth from "./auth.js"
import chat from "./chat.js"
import mentor from "./mentor.js"
import cloudImgs from "./cloudImgs.js"
import { authenticate, authorize } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.use("/auth", auth)

router.use(authenticate, authorize("mentor", "admin"))

router.use("/", mentor)

router.use("/cloud", cloudImgs)

export default router
