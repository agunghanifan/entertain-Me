const express = require('express')
const router = express.Router()
const moviesRouter = require('./moviesRoute')
const tvSeriesRouter = require('./tvSeriesRoute')

router.use('/', moviesRouter)
router.use ('/', tvSeriesRouter)

router.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = router