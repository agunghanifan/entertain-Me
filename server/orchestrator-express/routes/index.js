const express = require('express')
const router = express.Router()
const orchestraRoute = require('./orchestraRoute')

router.use ('/', orchestraRoute)

router.get('/', (req, res) => {
    res.send('Hello Orchestra!')
})

module.exports = router