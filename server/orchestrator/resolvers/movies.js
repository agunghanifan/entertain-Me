const movies = 'http://localhost:4001'
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const resolvers = {
  Query:{
    Movies: async () => {
      try {
        const allMovie = await redis.get('all:movie')
        if (!allMovie) {
          return await axios.get(movies + '/movies')
            .then((res) => {
              redis.set('all:movie', JSON.stringify(res.data))
              return res.data
            })
        } else return JSON.parse(allMovie)
      } catch(err) {
        console.log(err)
        throw err
      }
    },
    Movie: async (_, args) => {
      try {
        const { _id } = args
        let specifiedMovie = await redis.get('each:specifiedMovie')
        specifiedMovie = JSON.parse(specifiedMovie)
        if (specifiedMovie._id != _id) {
          return await axios.get(movies + '/movie/' + _id)
            .then((res) => {
              redis.set('each:specifiedMovie', JSON.stringify(res.data))
              return res.data
            })
        } else return specifiedMovie
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },
  Mutation: {
    addMovie: (_, args) => {
      const newMovie = {
        title: args.newMovie.title,
        overview: args.newMovie.overview,
        poster_path: args.newMovie.poster_path,
        popularity: args.newMovie.popularity,
        tags: args.newMovie.tags
      }
      return axios({
        url: movies + '/addmovie',
        method: 'POST',
        data: newMovie
      })
        .then((res) => {
          console.log(res)
          redis.del('all:movie')
          return res.data[0]
        })
        .catch((err) => {
          throw err
        })
    },
    editMovie: (_, args) => {
      const { _id } = args
      const editExistingMovie = {
        title: args.editExistingMovie.title,
        overview: args.editExistingMovie.overview,
        poster_path: args.editExistingMovie.poster_path,
        popularity: args.editExistingMovie.popularity,
        tags: args.editExistingMovie.tags
      }
      return axios({
        url: movies + `/movie/${_id}`,
        method: 'PUT',
        data: editExistingMovie
      })
        .then((res) => {
          console.log(res)
          redis.del('all:movie')
          return res
        })
        .catch((err) => {
          throw err
        })
    },
    deleteMovie: (_, args) => {
      const { _id } = args
      return axios({
        url: movies + `/movie/${_id}`,
        method: 'DELETE',
      })
        .then(res => {
          console.log(res)
          redis.del('all:movie')
          return res
        })
        .catch((err) => {
          throw err
        })
    }
  }
}

module.exports = resolvers