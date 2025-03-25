import { Router } from "express"
import { TagController } from "../controllers/tag.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
const tagController = new TagController()

router.post("/", authMiddleware, tagController.create)
router.get("/:id/tasks", authMiddleware, tagController.findTasksByTagId)

export default router

