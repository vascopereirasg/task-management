import type { Request, Response } from "express"
import { ProjectService } from "../services/project.service"
import { TaskService } from "../services/task.service"
import { validate } from "class-validator"
import { CreateProjectDto } from "../dtos/create-project.dto"

export class ProjectController {
  private projectService: ProjectService
  private taskService: TaskService

  constructor() {
    this.projectService = new ProjectService()
    this.taskService = new TaskService()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Create DTO instance and validate
      const createProjectDto = new CreateProjectDto()
      Object.assign(createProjectDto, req.body)

      const errors = await validate(createProjectDto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      // Create project
      const project = await this.projectService.create(createProjectDto)

      return res.status(201).json(project)
    } catch (error) {
      console.error("Create project error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Get all projects
      const projects = await this.projectService.findAll()

      return res.status(200).json(projects)
    } catch (error) {
      console.error("Find all projects error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  findTasksByProjectId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const projectId = Number.parseInt(req.params.projectId)

      // Check if project exists
      const project = await this.projectService.findById(projectId)
      if (!project) {
        return res.status(404).json({ message: "Project not found" })
      }

      // Get tasks for the project
      const tasks = await this.taskService.findByProjectId(projectId)

      return res.status(200).json(tasks)
    } catch (error) {
      console.error("Find tasks by project ID error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}

