import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsArray } from "class-validator"
import { TaskStatus } from "../entities/task.entity"

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsNotEmpty()
  @IsNumber()
  projectId: number

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[]

  constructor(data: Partial<CreateTaskDto>) {
    this.title = data.title || ""
    this.description = data.description
    this.status = data.status
    this.projectId = data.projectId || 0
    this.tagIds = data.tagIds
  }
}

