import { Project } from "../entities/project.entity"
import type { CreateProjectDto } from "../dtos/create-project.dto"
import AppDataSource from "../data-source"

export class ProjectService {
  private projectRepository = AppDataSource.getRepository(Project)

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto)
    return this.projectRepository.save(project)
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find()
  }

  async findById(id: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
    })
  }
}

