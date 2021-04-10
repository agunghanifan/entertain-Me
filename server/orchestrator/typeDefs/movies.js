const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]
  }

  extend type Query {
    Movies: [Movie]
    Movie(_id: ID): Movie
  }

  extend type Mutation {
    addMovie(newMovie: MovieInput): Movie
    editMovie(_id: ID, editExistingMovie: MovieInput): Movie
    deleteMovie(_id: ID): Movie
  }
`

module.exports = typeDefs