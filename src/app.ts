import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import projectRoutes from "./routes/project.routes"
import taskRoutes from "./routes/task.routes"
import tagRoutes from "./routes/tag.routes"
import { setupSwagger } from "./swagger"

// Initialize express app
const app = express()

// Apply middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

// Setup Swagger
setupSwagger(app)

// Apply routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/tags", tagRoutes)

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: "Internal server error" })
})

export default app

