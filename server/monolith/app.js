const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000
const { connectMongodb } = require('./config/mongodb')


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