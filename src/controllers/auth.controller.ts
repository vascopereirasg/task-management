import type { Request, Response } from "express"
import { AuthService } from "../services/auth.service"
import { UserService } from "../services/user.service"
import { validate } from "class-validator"
import { RegisterDto } from "../dtos/register.dto"
import { LoginDto } from "../dtos/login.dto"

export class AuthController {
  private authService: AuthService
  private userService: UserService

  constructor() {
    this.authService = new AuthService()
    this.userService = new UserService()
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Create DTO instance and validate
      const registerDto = new RegisterDto()
      Object.assign(registerDto, req.body)

      const errors = await validate(registerDto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      // Check if user already exists
      const existingUser = await this.userService.findByEmail(registerDto.email)
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" })
      }

      // Create user and profile
      const user = await this.authService.register(registerDto)

      // Generate JWT token
      const token = this.authService.generateToken(user)

      return res.status(201).json({ ...user, token })
    } catch (error) {
      console.error("Registration error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Create DTO instance and validate
      const loginDto = new LoginDto()
      Object.assign(loginDto, req.body)

      const errors = await validate(loginDto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      // Authenticate user
      const { user, isValid } = await this.authService.validateUser(loginDto.email, loginDto.password)

      if (!user || !isValid) {
        return res.status(401).json({ message: "Invalid credentials" })
      }

      // Generate JWT token
      const token = this.authService.generateToken(user)

      return res.status(200).json({ ...user, token })
    } catch (error) {
      console.error("Login error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}

