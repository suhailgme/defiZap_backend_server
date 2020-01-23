const express = require('express')
const router = express.Router()
const frontierZaps = require('../services/frontierIntegration')
router.get('/', async (req, res, next) =>{
    res.json(await frontierZaps())
})

module.exports = router