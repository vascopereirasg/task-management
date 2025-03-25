import { User } from "../entities/user.entity"
import { Profile } from "../entities/profile.entity"
import type { RegisterDto } from "../dtos/register.dto"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import AppDataSource from "../data-source"
import { instanceToPlain } from "class-transformer"

export class AuthService {
  private userRepository = AppDataSource.getRepository(User)
  private profileRepository = AppDataSource.getRepository(Profile)

  async register(registerDto: RegisterDto): Promise<Partial<User>> {
    // Create profile
    const profile = this.profileRepository.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      bio: registerDto.bio,
    })

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10)

    // Create user with profile
    const user = this.userRepository.create({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
      profile,
    })

    // Save user (cascade will save profile too)
    await this.userRepository.save(user)

    // Convert to plain object and exclude password
    return instanceToPlain(user) as Partial<User>
  }

  async validateUser(email: string, password: string): Promise<{ user: Partial<User> | null; isValid: boolean }> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ["profile"],
    })

    if (!user) {
      return { user: null, isValid: false }
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (isValid) {
      // Convert to plain object to exclude password
      return { user: instanceToPlain(user) as Partial<User>, isValid }
    }

    return { user: null, isValid: false }
  }

  generateToken(user: Partial<User>): string {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    const secret = process.env.JWT_SECRET || "your_jwt_secret"

    // Handle JWT expiration properly
    let expiresIn: string | number = "1d" // Default to 1 day

    if (process.env.JWT_EXPIRATION) {
      // Try to parse as a number (seconds)
      const parsedExpiration = Number.parseInt(process.env.JWT_EXPIRATION)
      if (!isNaN(parsedExpiration)) {
        expiresIn = parsedExpiration
      } else {
        // Keep as string if it's not a valid number (e.g., "1d", "2h")
        expiresIn = process.env.JWT_EXPIRATION
      }
    }

    // Use type assertion to tell TypeScript this is a valid configuration
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions)
  }
}

