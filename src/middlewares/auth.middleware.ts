import type { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

interface JwtPayload {
  id: number
  email: string
  username: string
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" })
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as JwtPayload

    // Attach user to request
    req.user = decoded

    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

