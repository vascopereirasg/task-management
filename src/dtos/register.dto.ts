import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from "class-validator"

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string

  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsOptional()
  @IsString()
  bio?: string

  constructor(data: Partial<RegisterDto>) {
    this.username = data.username || ""
    this.email = data.email || ""
    this.password = data.password || ""
    this.firstName = data.firstName || ""
    this.lastName = data.lastName || ""
    this.bio = data.bio
  }
}

