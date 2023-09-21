import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Product from "./models/product.js"

const app = express()

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"))

app.use(cors())
app.use(express.json())

// create
app.post("/api/products", (req, res) => {
  const product = new Product({
    ...req.body,
  })
  product
    .save()
    .then((product) => res.status(201).json({ product }))
    .catch((error) => res.status(400).json({ error }))
})

// read
app.get("/api/products", (_, res) => {
  Product.find()
    .then((products) => res.status(200).json({ products }))
    .catch((error) => res.status(400).json({ error }))
})

// readOne
app.get("/api/products/:id", (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(400).json({ error }))
})

// update
app.put("/api/products/:id", (req, res) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }))
})

// delete
app.delete("/api/products/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted" }))
    .catch((error) => res.status(400).json({ error }))
})

app.listen(3000, () => console.log("Server is running on port 3000"))
