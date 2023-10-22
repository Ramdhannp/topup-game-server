const express = require('express')
const router = express.Router()
const { index } = require('./controller')
const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin) // sebelum masuk kehalaman lain akan dicek dulu apakah sudah login oleh middleware
router.get('/', index)

module.exports = router
