import { IsNotEmpty, IsString } from "class-validator"

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string

  constructor(data: Partial<CreateTagDto>) {
    this.name = data.name || ""
  }
}