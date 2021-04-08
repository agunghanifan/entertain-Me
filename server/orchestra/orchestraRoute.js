const express = require('express')
const router = express.Router()
const OrchestraController = require('../controllers/orchestraController');

router.get('/all', OrchestraController.showAll)
router.get('/all-movie', OrchestraController.showAll)
router.get('/all-tvseries', OrchestraController.showAll)

router.post('/add-movie', OrchestraController.addData)
router.post('/add-tvseries', OrchestraController.addData)

router.get('/each-movie/:id', OrchestraController.showEditData)
router.get('/each-tvseries/:id', OrchestraController.showEditData)

router.put('/each-movie/:id', OrchestraController.showEditData)
router.put('/each-tvseries/:id', OrchestraController.showEditData)

router.delete('/each-movie/:id', OrchestraController.showEditData)
router.delete('/each-tvseries/:id', OrchestraController.showEditData)



module.exports = router