import "reflect-metadata"
import * as dotenv from "dotenv"
import app from "./app"
import AppDataSource from "./data-source"

// Load environment variables
dotenv.config()

// Start server
const PORT = process.env.PORT || 3000

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Error connecting to database:", error)
  })

