import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  constructor(data: Partial<CreateProjectDto>) {
    this.name = data.name || ""
    this.description = data.description
  }
}

