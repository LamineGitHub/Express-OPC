import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import stuffRoutes from "./routes/stuff.js"
import userRoutes from "./routes/user.js"

import "./conectdb.js"

const app = express()

app.use(express.json())
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/images", express.static(path.join(__dirname, "images")))

app.use("/api/stuff", stuffRoutes)
app.use("/api/auth", userRoutes)

export default app
