const { ApolloServer, gql } = require('apollo-server')
const { merge } = require('lodash')
const { connectMongodb } = require('./config/mongodb')
const moviesResolver = require('./resolvers/movies')
const tvSeriesResolver = require('./resolvers/tvSeries')
const moviesTypeDefs = require('./typeDefs/movies')
const tvSeriesTypeDefs = require('./typeDefs/tvSeries')

const typeDefs = gql`
  type Query {
    _empty: String
  },
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

const server = new ApolloServer({ 
  typeDefs: [typeDefs, moviesTypeDefs, tvSeriesTypeDefs], 
  resolvers : merge(resolvers, moviesResolver, tvSeriesResolver)
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

connectMongodb((connected) => {
    if (connected) console.log('Connected to mongo')
    else console.log('Not connected to mongo')
})