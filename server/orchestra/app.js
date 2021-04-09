const express = require('express')
const { ApolloServer, gql } = require('apollo-server');
const app = express()
const routes = require('./routes')
const port = 4000
const { connectMongodb } = require('./config/mongodb')
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Movies {
    title: String
    overview: String
    poster_path: String
    popularity: Double
    tags: [String]
  }

  type TvSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Double
    tags: [String]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;



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