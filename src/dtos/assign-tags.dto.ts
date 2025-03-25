import { IsNotEmpty, IsArray, IsNumber } from "class-validator"

export class AssignTagsDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds: number[]
}

