import { Tag } from "../entities/tag.entity"
import { Task } from "../entities/task.entity"
import type { CreateTagDto } from "../dtos/create-tag.dto"
import AppDataSource from "../data-source"

export class TagService {
  private tagRepository = AppDataSource.getRepository(Tag)
  private taskRepository = AppDataSource.getRepository(Task)

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(createTagDto)
    return this.tagRepository.save(tag)
  }

  async findById(id: number): Promise<Tag | null> {
    return this.tagRepository.findOne({
      where: { id },
    })
  }

  async findByName(name: string): Promise<Tag | null> {
    return this.tagRepository.findOne({
      where: { name },
    })
  }

  async findTasksByTagId(tagId: number): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder("task")
      .innerJoinAndSelect("task.tags", "tag")
      .innerJoinAndSelect("task.project", "project")
      .where("tag.id = :tagId", { tagId })
      .getMany()
  }
}

