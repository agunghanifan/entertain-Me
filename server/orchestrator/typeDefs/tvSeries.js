const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type TvSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input TvSerieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  extend type Query {
    TvSeries: [TvSerie]
    TvSerie(_id: ID): TvSerie
  }

  extend type Mutation {
    addTvSerie(newTvSerie: TvSerieInput): TvSerie
    editTvSeries(_id: ID, editExistingTvSeries: TvSerieInput): TvSerie
    deleteTvSeries(_id: ID): TvSerie
  }
`

module.exports = typeDefs