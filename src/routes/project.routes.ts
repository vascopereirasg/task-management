import { Router } from "express"
import { ProjectController } from "../controllers/project.controller"

const router = Router()
const projectController = new ProjectController()

router.post("/", projectController.create)
router.get("/", projectController.findAll)
router.get("/:projectId/tasks", projectController.findTasksByProjectId)

export default router

