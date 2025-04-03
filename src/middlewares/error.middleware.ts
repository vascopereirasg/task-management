import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { authMiddleware, errorHandler } from "../middlewares"
import authRoutes from "../routes/auth.routes"
import userRoutes from "../routes/user.routes"
import projectRoutes from "../routes/project.routes"
import taskRoutes from "../routes/task.routes"
import tagRoutes from "../routes/tag.routes"
import { setupSwagger } from "../swagger"

// Initialize express app
const app = express()

// Apply global middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

// Setup Swagger
setupSwagger(app)

// Group routes by authentication requirement
const publicRouter = express.Router()
const protectedRouter = express.Router()

// Apply authentication middleware to all protected routes
protectedRouter.use(authMiddleware)

// Define route groups
publicRouter.use("/auth", authRoutes)

protectedRouter.use("/users", userRoutes)
protectedRouter.use("/projects", projectRoutes)
protectedRouter.use("/tasks", taskRoutes)
protectedRouter.use("/tags", tagRoutes)

// Mount route groups to the main app
app.use("/api", publicRouter)
app.use("/api", protectedRouter)

// Error handling middleware should be last
app.use(errorHandler)

export default app
