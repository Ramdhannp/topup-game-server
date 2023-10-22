const express = require('express')
const router = express.Router()
const { index, actionStatus } = require('./controller')
const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin) // sebelum masuk kehalaman lain akan dicek dulu apakah sudah login oleh middleware
router.get('/', index)
router.put('/status/:id', actionStatus)

module.exports = router
