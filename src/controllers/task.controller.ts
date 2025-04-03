import type { Request, Response } from "express"
import { TaskService } from "../services/task.service"
import { TagService } from "../services/tag.service"
import { validate } from "class-validator"
import { CreateTaskDto } from "../dtos/create-task.dto"
import { UpdateTaskDto } from "../dtos/update-task.dto"
import { AssignTagsDto } from "../dtos/assign-tags.dto"

export class TaskController {
  private taskService: TaskService
  private tagService: TagService

  constructor() {
    this.taskService = new TaskService()
    this.tagService = new TagService()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Create DTO instance using constructor
      const createTaskDto = new CreateTaskDto(req.body)

      const errors = await validate(createTaskDto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      // Add user ID from authenticated user
      const userId = req.user.id

      // Create task
      const task = await this.taskService.create(createTaskDto, userId)

      return res.status(201).json(task)
    } catch (error) {
      console.error("Create task error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const taskId = Number.parseInt(req.params.id)

      // Create DTO instance using constructor
      const updateTaskDto = new UpdateTaskDto(req.body)

      const errors = await validate(updateTaskDto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      // Check if task exists
      const existingTask = await this.taskService.findById(taskId)
      if (!existingTask) {
        return res.status(404).json({ message: "Task not found" })
      }

      // Update task
      const task = await this.taskService.update(taskId, updateTaskDto)

      return res.status(200).json(task)
    } catch (error) {
      console.error("Update task error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const taskId = Number.parseInt(req.params.id)

      // Check if task exists
      const existingTask = await this.taskService.findById(taskId)
      if (!existingTask) {
        return res.status(404).json({ message: "Task not found" })
      }

      // Delete task
      await this.taskService.delete(taskId)

      return res.status(200).json({ message: "Task deleted successfully" })
    } catch (error) {
      console.error("Delete task error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  assignTags = async (req: Request, res: Response): Promise<Response> => {
    try {
      const taskId = Number.parseInt(req.params.id)

      // Create DTO instance using constructor
      const assignTagsDto = new AssignTagsDto(req.body)

      const errors = await validate(assignTagsDto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      // Check if task exists
      const existingTask = await this.taskService.findById(taskId)
      if (!existingTask) {
        return res.status(404).json({ message: "Task not found" })
      }

      // Assign tags to task
      const task = await this.taskService.assignTags(taskId, assignTagsDto.tagIds)

      return res.status(200).json(task)
    } catch (error) {
      console.error("Assign tags error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}

