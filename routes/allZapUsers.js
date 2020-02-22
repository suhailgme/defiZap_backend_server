const express = require('express')
const router = express.Router()
const zaps = require('../services/zapStats')

router.get('/', async (req, res, next) => {
  res.json(zaps.getZapUsers())
})

module.exports = router
