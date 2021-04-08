const express = require('express')
const router = express.Router()
const OrchestraController = require('../controllers/orchestraController');

router.get('/all', OrchestraController.showAll)
router.get('/allmovies', OrchestraController.showAllMovie)
router.get('/alltvseries', OrchestraController.showAllTvSeries)

router.post('/addmovie', OrchestraController.addMovie)
router.post('/addtvseries', OrchestraController.addTvSeries)

router.get('/movie/:id', OrchestraController.showEditMovie)
router.get('/tvseries/:id', OrchestraController.showEditTvSeries)

router.put('/movie/:id', OrchestraController.submitEditMovie)
router.put('/tvseries/:id', OrchestraController.submitEditTvSeries)

router.delete('/movie/:id', OrchestraController.deleteMovie)
router.delete('/tvseries/:id', OrchestraController.deleteTvSeries)



module.exports = router