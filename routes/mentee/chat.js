import express from "express"
import imgUploader from "../../utils/imgUploader.js"
import uploadToCloud from "../../utils/uploadCloudinary.js"
import chatController from "../../controllers/mentee/chat.js"
import { authenticate, authorize } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticate, authorize('mentee'))

// add valdation

router.route("/").get(chatController.createChat)

router.route("/:id")
    .get(chatController.getMessages)

router.route("/:id")
    .post(
        imgUploader([{ name: "media" }]),
        uploadToCloud,
        chatController.createMessage
    )

router.route("/:id/message/:msgId")
    .put(
        imgUploader([{ name: "media" }]),
        uploadToCloud,
        chatController.updateMessage
    )

router.route("/:id/message/:msgId")
    .delete(chatController.deleteMessage)

export default router
