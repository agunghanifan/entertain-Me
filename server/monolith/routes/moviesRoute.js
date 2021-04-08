const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesController')


router.get('/movies', moviesController.showAll)
router.post('/addmovie', moviesController.addData)
router.get('/movie/:id', moviesController.showEditData)
router.post('/movie/:id', moviesController.submitEditData)
router.delete('/movie/:id', moviesController.deleteData)

module.exports = router