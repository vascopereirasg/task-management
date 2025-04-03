import { IsOptional, IsString, IsEnum } from "class-validator"
import { TaskStatus } from "../entities/task.entity"

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  constructor(data: Partial<UpdateTaskDto>) {
    this.title = data.title
    this.description = data.description
    this.status = data.status
  }
}