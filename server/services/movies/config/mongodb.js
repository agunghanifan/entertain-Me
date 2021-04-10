const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'
let database = null


function connectMongodb (cb) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  client.connect()
    .then(() => {
      database = client.db('entertainMeOne')
      cb(true)
    })
  
    .catch(err => {
      cb(false)
      console.log(err)
    })
}

function getDatabase () {
  return database
}

module.exports = {
  connectMongodb,
  getDatabase
}

