import express from "express"
import { authenticate, authorize } from "../../middleware/authMiddleware.js"
import categoryController from "../../controllers/client/category.js"
import categoryValidator from "../../middleware/validators/category/category.js"
import imgUploader from "../../utils/imgUploader.js"
import uploadToCloud from "../../utils/uploadCloudinary.js"

const router = express.Router()

router.route("/").get(categoryController.getCategories)

router.route("/:id").get(categoryController.getCategory)

router.use(authenticate, authorize("admin"))

router
	.route("/")
	.post(
		imgUploader([{ name: "categoryImg" }]),
		uploadToCloud,
		categoryValidator.createCategory,
		categoryController.createCategory,
		categoryController.createCategory
	)

router.route("/:id").put(categoryController.updateCategory)

router.route("/:id").delete(categoryController.deleteCategory)

export default router
