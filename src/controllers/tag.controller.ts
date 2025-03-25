import type { Request, Response } from "express"
import { TagService } from "../services/tag.service"
import { validate } from "class-validator"
import { CreateTagDto } from "../dtos/create-tag.dto"

export class TagController {
  private tagService: TagService

  constructor() {
    this.tagService = new TagService()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Create DTO instance and validate
      const createTagDto = new CreateTagDto()
      Object.assign(createTagDto, req.body)

      const errors = await validate(createTagDto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      // Check if tag already exists
      const existingTag = await this.tagService.findByName(createTagDto.name)
      if (existingTag) {
        return res.status(400).json({ message: "Tag with this name already exists" })
      }

      // Create tag
      const tag = await this.tagService.create(createTagDto)

      return res.status(201).json(tag)
    } catch (error) {
      console.error("Create tag error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  findTasksByTagId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tagId = Number.parseInt(req.params.id)

      // Check if tag exists
      const tag = await this.tagService.findById(tagId)
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" })
      }

      // Get tasks for the tag
      const tasks = await this.tagService.findTasksByTagId(tagId)

      return res.status(200).json(tasks)
    } catch (error) {
      console.error("Find tasks by tag ID error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}

