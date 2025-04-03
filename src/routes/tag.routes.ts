import { Router } from "express"
import { TagController } from "../controllers/tag.controller"

const router = Router()
const tagController = new TagController()

router.post("/", tagController.create)
router.get("/:id/tasks", tagController.findTasksByTagId)

export default router

