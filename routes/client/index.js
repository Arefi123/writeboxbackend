import express from "express"
import discovery from "./discovery.js"
import auth from "./auth.js"
import category from "./category.js"

const router = express.Router()

router.use("/category", category)

router.use("/discovery", discovery)

router.use("/auth", auth)

export default router
