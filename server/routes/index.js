const express = require('express')
const router = express.Router()

router.all('/api/*', require('./api'), function(req, res, next) {
  next()
})

router.all('/*', require('./common'), function(req, res, next) {
  next()
})

module.exports = router
