const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const routes = require('./routes/index')
const zaps = require('./routes/zaps')
const aggregateZaps = require('./routes/aggregateZaps')
const zapDetails = require('./routes/zapDetails')
const frontierZaps = require('./routes/frontierZaps')
const zapAddresses = require('./routes/zapAddresses')
const zapUsers = require('./routes/zapUsers')
const allZapUsers = require('./routes/allZapUsers')
const defiSnap = require('./routes/defiSnap')




const app = express()
const port = process.env.PORT || "8000"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/images', express.static(path.join(__dirname, 'public/assets')) )
app.use(cors())

app.use('/', routes)
app.use('/zaps', zaps)
app.use('/aggregateZaps', aggregateZaps)
app.use('/zapDetails', zapDetails)
app.use('/frontierZaps', frontierZaps)
app.use('/zapAddresses', zapAddresses)
app.use('/zapUsers', zapUsers)
app.use('/allZapUsers', allZapUsers)
app.use('/defiSnap', defiSnap)






app.use((req,res,next) =>{
    let error = new Error('Not Found');
    error.status = 404
    next(error)
})


module.exports = app