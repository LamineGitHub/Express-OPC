import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })

      user
        .save()
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400))
    })
    .catch(() => res.sendStatus(500))
}

export const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.sendStatus(401)
        // .json({ message: "Email ou mot de passe incorrect !" })
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.sendStatus(401)
            // .json({ message: "Email ou mot de passe incorrect !" })
          }
          // res.status(200).json(user)
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "Random_token", {
              expiresIn: "24h",
            }),
          })
        })
        .catch(() => res.sendStatus(500))
    })
    .catch(() => res.sendStatus(500))
}
