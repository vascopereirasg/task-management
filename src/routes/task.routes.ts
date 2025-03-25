import { Router } from "express"
import { TaskController } from "../controllers/task.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
const taskController = new TaskController()

router.post("/", authMiddleware, taskController.create)
router.put("/:id", authMiddleware, taskController.update)
router.delete("/:id", authMiddleware, taskController.delete)
router.post("/:id/tags", authMiddleware, taskController.assignTags)

export default router

