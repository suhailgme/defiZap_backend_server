const express = require('express')
const router = express.Router()
const zapDetails = require('../constants/zaps')
router.get('/', async (req, res, next) =>{
    res.json(zapDetails())
})

module.exports = router