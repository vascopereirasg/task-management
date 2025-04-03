// Export all middlewares from a single file for easier imports
import { authMiddleware } from "./auth.middleware"
import errorHandler from "./error.middleware"
import { validate } from "class-validator"

export { authMiddleware, errorHandler }

// You could also add middleware factory functions here
export const validateRequest = (dtoClass: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      const dto = new dtoClass(req.body)
      const errors = await validate(dto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }
      req.validatedData = dto
      next()
    } catch (error) {
      next(error)
    }
  }
}

