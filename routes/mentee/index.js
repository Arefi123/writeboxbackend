import express from "express"
import auth from "./auth.js"
import chat from "./chat.js"

const router = express.Router()

router.use("/auth", auth)

router.use("/chat", chat)

export default router
