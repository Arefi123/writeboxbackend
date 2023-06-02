import express from "express"
import User from "../../models/User.js"
import { deleteCloudData } from "../../controllers/admin/cloudImages.js"
import { authenticate } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticate)

router.route("/").delete(deleteCloudData)

export default router
