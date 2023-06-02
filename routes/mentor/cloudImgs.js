import express from "express"
import User from "../../models/User.js"
import { authenticate } from "../../middleware/authMiddleware.js"
import { deleteCloudData } from "../../controllers/mentor/cloudImages.js"

const router = express.Router()

router.use(authenticate)

router.route("/").delete(deleteCloudData)

export default router
