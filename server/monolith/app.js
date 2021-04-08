const express = require('express')
const app = express()
const port = 3000
const connectMongoDB = require('./config/mongodb')

connectMongoDB((connected) => {
    if (connected) console.log('Connected to mongo')
    else console.log('Not connected to mongo')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})