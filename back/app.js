import express from "express"
import cors from "cors"
import stuffRoutes from "./routes/stuff.js"
import userRoutes from "./routes/user.js"

import "./conectdb.js"

const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/stuff", stuffRoutes)
app.use("/api/auth", userRoutes)

export default app
