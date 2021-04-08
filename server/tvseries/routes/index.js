const express = require('express')
const router = express.Router()
const tvSeriesRouter = require('./tvSeriesRoute')

router.use ('/', tvSeriesRouter)

router.get('/', (req, res) => {
    res.send('Hello Tvseries!')
})

module.exports = router