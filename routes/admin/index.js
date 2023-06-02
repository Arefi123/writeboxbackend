import express from "express"
import mentor from "./mentor.js"
import cloudImgs from "./cloudImgs.js"
import { authenticate, authorize } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticate, authorize("admin"))

router.use("/mentor", mentor)

router.use("/cloud/img", cloudImgs)

export default router
