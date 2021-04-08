const TvSeries = require("../models/tvSeries")

class TvSeriesController {
  static showAll (req, res, next) {
    TvSeries.findAllSeries()
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      })
  }

  static addData(req, res, next) {
    TvSeries.addOneSeries(req.body)
      .then(response => res.status(201).json(response.data))
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      })
  }

  static showEditData (req, res, next) {
    const { id } = req.params
    TvSeries.findOneSeries(id)
      .then(response => {
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

  static submitEditData (req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body 
    TvSeries.updateOneSeries(id, {
      title,
      overview,
      poster_path,
      popularity,
      tags
    })
      .then(response => {
        if (response.n == 0) throw Error('id not found')
        else res.status(200).json(response)
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
    TvSeries.deleteOneSeries(req.params.id)
      .then(response => {
        if(response.deletedCount === 0) throw Error('id not found')
        else res.status(200).json(response)
      })
      .catch(err => {
        console.log(err)
        if (err.message == 'id not found') {
          res.status(404).json({ message: "Movie not Found" })
        } else res.status(500).json({ message: "Internal Server Error"})
      })
  }
}

module.exports = TvSeriesController