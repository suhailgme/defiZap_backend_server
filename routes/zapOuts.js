const express = require('express')
const router = express.Router()
const zapOuts = require('../services/zapOuts')
router.get('/', async (req, res, next) =>{
    res.json(zapOuts())
})

module.exports = router