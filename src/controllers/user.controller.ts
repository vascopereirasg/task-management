import type { Request, Response } from "express"
import { UserService } from "../services/user.service"

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  getProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      // The user ID is attached to the request by the auth middleware
      const userId = req.user.id

      const user = await this.userService.findById(userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      return res.status(200).json(user)
    } catch (error) {
      console.error("Get profile error:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}

