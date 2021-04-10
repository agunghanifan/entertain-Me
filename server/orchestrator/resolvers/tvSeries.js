const tvSeries = 'http://localhost:4002'
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const resolvers = {
  Query: {
    TvSeries: async () => {
      const allTvSerie = await redis.get('all:tvserie')
      if (!allTvSerie) {
        return await axios.get(tvSeries + '/tvseries')
          .then((res) => {
            redis.set('all:tvserie', JSON.stringify(res.data))
            return res.data
          })
          .catch((err) => {
            throw err
          })
      } else return JSON.parse(allTvSerie)
    },
    TvSerie: async (_, args) => {
      const { _id } = args
      let specifiedTvSerie = await redis.get('each:tvserie')
      specifiedTvSerie = JSON.parse(specifiedTvSerie)
      if (!specifiedTvSerie._id != _id) {
        return await axios.get(tvSeries + '/tvseries/' + _id)
          .then((res) => {
            redis.set('each:tvserie', JSON.stringify(res.data))
            return res.data
          })
          .catch((err) => {
            throw err
          })
      } else return specifiedTvSerie
    }
  },
  Mutation: {
    addTvSerie: (_, args) => {
      const newTvSerie = {
        title: args.newTvSerie.title,
        overview: args.newTvSerie.overview,
        poster_path: args.newTvSerie.poster_path,
        popularity: args.newTvSerie.popularity,
        tags: args.newTvSerie.tags
      }
      return axios({
        url: tvSeries + '/addtvseries',
        method: 'POST',
        data: newTvSerie
      })
        .then((res) => {
          console.log(res)
          redis.del('all:tvserie')
          return res.data[0]
        })
        .catch((err) => {
          console.log(err)
          throw err
        })
    },
    editTvSeries: (_, args) => {
      const { _id } = args
      const editExistingTvSeries = {
        title: args.editExistingTvSeries.title,
        overview: args.editExistingTvSeries.overview,
        poster_path: args.editExistingTvSeries.poster_path,
        popularity: args.editExistingTvSeries.popularity,
        tags: args.editExistingTvSeries.tags
      }
      return axios({
        url: tvSeries + `/tvseries/${_id}`,
        method: 'PUT',
        data: editExistingTvSeries
      })
        .then((res) => {
          console.log(res)
          redis.del('all:tvserie')
          return res
        })
        .catch((err) => {
          throw err
        })
    },
    deleteTvSeries: (_, args) => {
      const { _id } = args
      return axios({
        url: tvSeries + `/tvseries/${_id}`,
        method: 'DELETE'
      })
        .then(res => {
          console.log(res)
          redis.del('all:tvserie')
          return res
        })
        .catch((err) => {
          throw err
        })
    }
  }
}

module.exports = resolvers