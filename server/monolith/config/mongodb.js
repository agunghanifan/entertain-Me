const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'


function connectMongoDB(cb) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  client.connect()
    .then(() => {
      cb(true)
    })
  
    .catch(err => {
      cb(false)
      console.log(err)
    })
}

module.exports = connectMongoDB
