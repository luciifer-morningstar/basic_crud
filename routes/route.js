const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/home.controller')
const {createUser } = require('../middleware/validation-middleware');

router.get('/get', HomeController.index)
router.post('/create',createUser,HomeController.store)

module.exports = router
