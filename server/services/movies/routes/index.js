const express = require('express')
const router = express.Router()
const moviesRouter = require('./moviesRoute')

router.use('/', moviesRouter)

router.get('/', (req, res) => {
    res.send('Hello Movies!')
})

module.exports = router