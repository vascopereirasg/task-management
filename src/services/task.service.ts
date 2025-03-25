import { Task } from "../entities/task.entity"
import { User } from "../entities/user.entity"
import { Project } from "../entities/project.entity"
import { Tag } from "../entities/tag.entity"
import type { CreateTaskDto } from "../dtos/create-task.dto"
import type { UpdateTaskDto } from "../dtos/update-task.dto"
import AppDataSource from "../data-source"
import { In } from "typeorm"

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task)
  private userRepository = AppDataSource.getRepository(User)
  private projectRepository = AppDataSource.getRepository(Project)
  private tagRepository = AppDataSource.getRepository(Tag)

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    // Get user and project
    const user = await this.userRepository.findOne({ where: { id: userId } })
    const project = await this.projectRepository.findOne({ where: { id: createTaskDto.projectId } })

    if (!user || !project) {
      throw new Error("User or project not found")
    }

    // Get tags if provided
    let tags: Tag[] = []
    if (createTaskDto.tagIds && createTaskDto.tagIds.length > 0) {
      tags = await this.tagRepository.find({ where: { id: In(createTaskDto.tagIds) } })
    }

    // Create task
    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      user,
      project,
      tags,
    })

    return this.taskRepository.save(task)
  }

  async findById(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ["user", "project", "tags"],
    })
  }

  async findByProjectId(projectId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { project: { id: projectId } },
      relations: ["tags"],
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    await this.taskRepository.update(id, updateTaskDto)
    return this.findById(id)
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id)
  }

  async assignTags(taskId: number, tagIds: number[]): Promise<Task | null> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ["tags"],
    })

    if (!task) {
      throw new Error("Task not found")
    }

    const tags = await this.tagRepository.find({ where: { id: In(tagIds) } })
    task.tags = tags

    return this.taskRepository.save(task)
  }
}

