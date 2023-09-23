import multer from "multer"

const MULTER_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images")
  },

  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_")
    const extention = MULTER_TYPES[file.mimetype]
    callback(null, name + "_" + Date.now() + "." + extention)
  },
})

const uploadImage = multer({ storage: storage }).single("image")

export default uploadImage
