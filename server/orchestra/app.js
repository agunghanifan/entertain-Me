const express = require('express')
const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const app = express()
const routes = require('./routes')
const port = 3999
const { connectMongodb } = require('./config/mongodb')
const movies = 'http://localhost:4001'
const tvSeries = 'http://localhost:4002'

const typeDefs = gql`

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TvSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input TvSerieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    Movies: [Movie]
    TvSeries: [TvSerie]
  }

  type Mutation {
    addMovie(newMovie: MovieInput): Movie
    addTvSerie(newTvSerie: TvSerieInput): TvSerie
  }
`;

const resolvers = {
  Query: {
    Movies: () => {
      return axios.get(movies + '/movies')
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          throw err
        })
    },
    TvSeries: () => {
      return axios.get(tvSeries + '/tvseries')
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          throw err
        })
    }
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
          return res.status
        })
        .catch((err) => {
          throw err
        })
    },
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
          return res.status
        })
        .catch((err) => {
          console.log(err)
          throw err
        })
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})


app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(routes)

connectMongodb((connected) => {
    if (connected) console.log('Connected to mongo')
    else console.log('Not connected to mongo')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})