const axios = require('axios')
const movies = 'http://localhost:4001'
const tvSeries = 'http://localhost:4002'

class OrchestraController {
  static showAll(req, res, next) {
    Promise.all([
      axios.get(movies + '/movies'),
      axios.get(tvSeries + '/tvseries')
    ])
      .then(values => values.map(value => {
        return value.data
      }))
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => console.log(err))
  }

  static showAllMovie(req, res, next) {
    axios.get(movies + '/movies')
      .then(response => res.status(200).json(response.data))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static showAllTvSeries(req, res, next) {
    axios.get(tvSeries + '/tvseries')
      .then(response => res.status(200).json(response.data))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static addMovie(req, res, next) {
    axios({
      url: movies + '/addmovie',
      method: 'post',
      data: {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
    })
      .then(response => res.status(201).json(response.statusText))
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      })
  }

  static addTvSeries(req, res, next) {
    axios({
      url: tvSeries + '/addtvseries',
      method: 'post',
      data: {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
    })
      .then(response => res.status(201).json(response.statusText))
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      })
  }

  static showEditMovie(req, res, next) {
    axios.get(movies + `/movie/${req.params.id}`)
    .then(response => {
      if(!response.data) throw Error('id not found')
      else res.status(200).json(response.data)
    })
    .catch(err => {
      if (err.message == 'id not found') res.status(404).json({ message: 'Movie not Found'})
      else {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      }
    })
  }

  static showEditTvSeries(req, res, next) {
    axios.get(tvSeries + `/tvseries/${req.params.id}`)
      .then(response => {
        if(!response.data) throw Error('id not found')
        else res.status(200).json(response.data)
      })
      .catch(err => {
        if (err.message == 'id not found') res.status(404).json({ message: 'Movie not Found'})
        else {
          console.log(err)
          res.status(500).json({ message: "Internal Server Error"})
        }
      })
  }

  static submitEditMovie(req, res, next) {
    axios({
      url: movies + `/movie/${req.params.id}`,
      method: "put",
      data: {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
    })
      .then(response => {
        if (response.data.n == 0) throw Error('id not found')
        else res.status(200).json(response.data.n)
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

  static submitEditTvSeries(req, res, next) {
    axios({
      url: tvSeries + `/tvseries/${req.params.id}`,
      method: "put",
      data: {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
    })
      .then(response => {
        if (response.data.n == 0) throw Error('id not found')
        else res.status(200).json(response.data.n)
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

  static deleteMovie(req, res, next) {
    axios.delete(movies + `/movie/${req.params.id}`)
    .then(response => {
      if(response.deletedCount == 0) throw Error('id not found')
      else res.status(200).json(response.deletedCount)
    })
    .catch(err => {
      console.log(err)
      if (err.response.data.message == 'Movie not Found') {
        res.status(404).json({ message: "Movie not Found" })
      } else res.status(500).json({ message: "Internal Server Error"})
    })
  }

  static deleteTvSeries(req, res, next) {
    axios.delete(tvSeries + `/tvseries/${req.params.id}`)
    .then(response => {
      if(response.deletedCount == 0) throw Error('id not found')
      else res.status(200).json(response.deletedCount)
    })
    .catch(err => {
      console.log(err)
      if (err.response.data.message == 'Movie not Found') {
        res.status(404).json({ message: "Movie not Found" })
      } else res.status(500).json({ message: "Internal Server Error"})
    })
  }  

}

module.exports = OrchestraController