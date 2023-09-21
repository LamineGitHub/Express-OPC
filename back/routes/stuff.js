import { Router } from "express"
import {
  createThing,
  deleteThing,
  getAllThings,
  getOneThing,
  updateThing,
} from "../controllers/stuff.js"
import auth from '../middleware/auth.js';


const router = Router()

// create
router.post("/", auth,  createThing)

// read
router.get("/", auth, getAllThings)

// readOne
router.get("/:id", auth, getOneThing)

// update
router.put("/:id", auth,  updateThing)

// delete
router.delete("/:id", auth, deleteThing)

export default router
