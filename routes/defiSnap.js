const express = require('express')
const router = express.Router()
const ethers = require('ethers')
const zaps = require('../services/zapStats')
router.get('/', async (req, res, next) => {
  try {
    const address = ethers.utils.getAddress(req.query.address)
    console.log('Getting', address, 'Statistics')
    const users = zaps.getZapUsers()
    const user = users.find(user => user.user === address)
    if (user) res.json(user.data)
    else res.sendStatus(404)
  } catch (e) {
    res.sendStatus(404)
  }
})

module.exports = router
