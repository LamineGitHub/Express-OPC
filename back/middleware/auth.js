import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "Random_token")
    const userId = decodedToken.userId
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}

export default auth