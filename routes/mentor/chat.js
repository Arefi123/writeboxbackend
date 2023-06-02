import express from "express"
import imgUploader from "../../utils/imgUploader.js"
import uploadToCloud from "../../utils/uploadCloudinary.js"
import chatController from "../../controllers/mentor/chat.js"
import { authenticate, authorize } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticate, authorize)

router.route("/").get(chatController.getChats)

router.route("/:id").get(chatController.getMessages)

router
	.route("/:id")
	.post(
		imgUploader([{ name: "media" }]),
		uploadToCloud,
		chatController.createMessage
	)

router
	.route("/:chatId/message/:msgId")
	.put(
		imgUploader([{ name: "media" }]),
		uploadToCloud,
		chatController.replyMessage
	)

router.route("/:chatId/message/:msgId").delete(chatController.replyMessage)

export default router
