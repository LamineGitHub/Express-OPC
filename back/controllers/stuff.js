import Thing from "../models/things.js"
import fs from "fs"

export const createThing = (req, res) => {
  const thingObjet = JSON.parse(req.body.thing)

  delete thingObjet._id
  delete thingObjet._userId

  const thing = new Thing({
    ...thingObjet,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  })

  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => {
      res.status(400).json({ error })
    })
}

export const getAllThings = (_, res) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }))
}

export const getOneThing = (req, res) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }))
}

export const updateThing = (req, res) => {
  const thingObjet = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      }

  delete thingObjet._userId

  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId !== req.auth.userId) {
        return res.sendStatus(401)
      }

      Thing.updateOne(
        { _id: req.params.id },
        { ...thingObjet, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

export const deleteThing = (req, res) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId !== req.auth.userId) {
        return res.sendStatus(401)
      }

      const filename = thing.imageUrl.split("/images/")[1]

      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch((error) => res.status(500).json({ error }))
}
