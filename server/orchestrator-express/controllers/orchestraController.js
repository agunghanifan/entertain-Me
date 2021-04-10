const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const movies = 'http://localhost:4001'
const tvSeries = 'http://localhost:4002'

class OrchestraController {
  static async showAll (req, res, next) {
    try {
      const allData = await redis.get('all:data')
      if(!allData) {
        await Promise.all([
          axios.get(movies + '/movies'),
          axios.get(tvSeries + '/tvseries')
        ])
          .then(values => values.map(value => {
            return value.data
          }))
          .then(data => {
            redis.set('all:data', JSON.stringify(data))
            res.status(200).json(data)
          })
      } else {
        res.status(200).json(JSON.parse(allData))
      }
    } catch(err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async showAllMovie(req, res, next) {
    try {
      const allMovie = await redis.get('all:movie')
      if(!allMovie) {
        await axios.get(movies + '/movies')
          .then(response => {
            redis.set('all:movie', JSON.stringify(response.data))
            res.status(200).json(response.data)
          })
      } else res.status(200).json(JSON.parse(allMovie))
    } catch(err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async showAllTvSeries(req, res, next) {
    try {
      const allTvSeries = await redis.get('all:tvSeries')
      if (!allTvSeries) {
        await axios.get(tvSeries + '/tvseries')
          .then(response => {
            redis.set('all:tvSeries', JSON.stringify(response.data)) 
            res.status(200).json(response.data)
          })
      } else res.status(200).json(JSON.parse(allTvSeries))
    } catch(err) {
      console.log(err)
      res.status(500).json(err)
    }
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
      .then(response => res.status(201).json(response.ops))
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

  static async showEditMovie(req, res, next) {
    try {
      let specifiedMovie = await redis.get('each:movie')
      specifiedMovie = JSON.parse(specifiedMovie)

      if (specifiedMovie._id != req.params.id) {
        await axios.get(movies + `/movie/${req.params.id}`)
        .then(response => {
          if(!response.data) throw Error('id not found')
          else {
            redis.set('each:movie', response.data)
            res.status(200).json(response.data)
          } 
        })
        
      } else res.status(200).json(specifiedMovie)

    } catch (err) {
      if (err.message == 'id not found') res.status(404).json({ message: 'Movie not Found'})
      else {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      }
    }
  }

  static async showEditTvSeries(req, res, next) {
    try {
      let specifiedTvSerie = await redis.get('each:tvserie')
      specifiedTvSerie = JSON.parse(specifiedTvSerie)
  
      if (specifiedTvSerie._id != req.params.id) {
        await axios.get(tvSeries + `/tvseries/${req.params.id}`)
          .then(response => {
            if(!response.data) throw Error('id not found')
            else res.status(200).json(response.data)
          })

      } else res.status(200).json(specifiedTvSerie)
    
    } catch (err) {
      if (err.message == 'id not found') res.status(404).json({ message: 'Movie not Found'})
      else {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
      }
    }
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