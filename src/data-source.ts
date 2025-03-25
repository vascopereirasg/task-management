import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
import { User } from "./entities/user.entity"
import { Profile } from "./entities/profile.entity"
import { Project } from "./entities/project.entity"
import { Task } from "./entities/task.entity"
import { Tag } from "./entities/tag.entity"

// Load environment variables
dotenv.config()

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "task_management",
  entities: [User, Profile, Project, Task, Tag],
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
  migrations: [__dirname + "/migrations/*.{ts,js}"],
})

export default AppDataSource

