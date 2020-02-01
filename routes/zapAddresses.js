const express = require('express')
const router = express.Router()
const addressService = require('../services/addressService')

router.get('/', async (req, res, next) =>{
    const zapAddresses = addressService.getAllAddresses()
    const zapAddressReturn = zapAddresses.map(address =>{
        return {name:address.name, address:address.address[0]}
    })
    res.json(zapAddressReturn)
})

module.exports = router