const express = require('express')
const router = express.Router()
const tvSeriesController = require('../controllers/tvSeriesController');

router.get('/tvseries', tvSeriesController.showAll)
router.post('/addtvseries', tvSeriesController.addData)
router.get('/tvseries/:id', tvSeriesController.showEditData)
router.put('/tvseries/:id', tvSeriesController.submitEditData)
router.delete('/tvseries/:id', tvSeriesController.deleteData)

module.exports = router