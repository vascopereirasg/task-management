import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  constructor(data: Partial<LoginDto>) {
    this.email = data.email || ""
    this.password = data.password || ""
  }
}