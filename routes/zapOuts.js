const express = require('express')
const router = express.Router()
const zapOuts = require('../services/zapOuts')
router.get(['/'], async (req, res, next) => {
  if (req.query.list) res.json(zapOuts().zapOuts)
  else res.json(zapOuts().aggregateZapOuts)
})

module.exports = router
