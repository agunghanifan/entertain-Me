const Movies = require("../models/movies")

class MoviesController {

  static showAll(req, res, next) {
    Movies.findAllMovie()
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      })
  }

  static addData(req, res, next) {
    Movies.addOneMovie(req.body)
      .then(response => {
        console.log(response)
        res.status(201).json(response.ops)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      })
  }

  static showEditData(req, res, next) {
    const { id } = req.params
    Movies.findOneMovie(id)
      .then(response => {
        console.log(response)
        if (!response) throw Error('id not found')
        else res.status(200).json(response)
      })
      .catch(err => {
        if (err.message == 'id not found') res.status(404).json({ message: 'Movie not Found'})
        else {
          console.log(err)
          res.status(500).json({ message: "Internal Server Error"})
        }
      })
  }

  static submitEditData(req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body 
    Movies.updateOneMovie(id, {
      title,
      overview,
      poster_path,
      popularity,
      tags
    })
      .then(response => {
        if (response.n == 0) throw Error('id not found')
        else res.status(200).json({ message: `Success edited details movie at id = ${id}`})
      })
      .catch(err => {
        if (err.message == 'id not found') {
          res.status(404).json({ message: "Movie not found"})
        } else {
          console.log(err)
          res.status(500).json("Internal Server Error")
        }
      })
  }

  static deleteData(req, res, next) {
    Movies.deleteOneMovie(req.params.id)
      .then(response => {
        if(response.deletedCount === 0) throw Error('id not found')
        else res.status(200).json({ message: `Success deleted movie at id ${req.params.id}`})
      })
      .catch(err => {
        console.log(err)
        if (err.message == 'id not found') {
          console.log('masuk err id not found')
          res.status(404).json({ message: "Movie not Found" })
        } else res.status(500).json({ message: "Internal Server Error"})
      })
  }
}

module.exports = MoviesController