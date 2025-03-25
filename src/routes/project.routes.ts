import { Router } from "express"
import { ProjectController } from "../controllers/project.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
const projectController = new ProjectController()

router.post("/", authMiddleware, projectController.create)
router.get("/", authMiddleware, projectController.findAll)
router.get("/:projectId/tasks", authMiddleware, projectController.findTasksByProjectId)

export default router

