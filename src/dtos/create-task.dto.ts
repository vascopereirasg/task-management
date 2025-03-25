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
}

