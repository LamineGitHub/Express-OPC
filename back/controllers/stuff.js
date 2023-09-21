import Thing from "../models/things.js"

export const createThing = (req, res) => {
  delete req.body._id

  const thing = new Thing({
    ...req.body,
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
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }))
}

export const deleteThing = (req, res) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }))
}
