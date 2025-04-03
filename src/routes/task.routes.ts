import { Router } from "express"
import { TaskController } from "../controllers/task.controller"

const router = Router()
const taskController = new TaskController()

router.post("/", taskController.create)
router.put("/:id", taskController.update)
router.delete("/:id", taskController.delete)
router.post("/:id/tags", taskController.assignTags)

export default router

