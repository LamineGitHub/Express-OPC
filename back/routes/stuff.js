import { Router } from "express"
import {
  createThing,
  deleteThing,
  getAllThings,
  getOneThing,
  updateThing,
} from "../controllers/stuff.js"
import { auth, updateImage } from "../middleware/index.js"

const router = Router()

// create
router.post("/", auth, updateImage, createThing)

// read
router.get("/", auth, getAllThings)

// readOne
router.get("/:id", auth, getOneThing)

// update
router.put("/:id", auth, updateImage, updateThing)

// delete
router.delete("/:id", auth, deleteThing)

export default router
