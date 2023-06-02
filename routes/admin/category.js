import express from "express"
import User from "../../models/User.js"
import { authenticate } from "../../middleware/authMiddleware.js"
import categoryController from "../../controllers/client/category.js"
// import categoryValidator from "../middleware/validators/users/category.js";

const router = express.Router()

router.route("/").get(categoryController.getCategories)

router.route("/:id").get(categoryController.getCategory)

router.route("/").post(categoryController.createCategory)

router.route("/:id").put(categoryController.updateCategory)

router.route("/:id").delete(categoryController.deleteCategory)

export default router
