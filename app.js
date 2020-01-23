const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const routes = require('./routes/index')
const zaps = require('./routes/zaps')
const aggregateZaps = require('./routes/aggregateZaps')
const zapDetails = require('./routes/zapDetails')
const frontierZaps = require('./routes/frontierZaps')


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


app.use((req,res,next) =>{
    let error = new Error('Not Found');
    error.status = 404
    next(error)
})


module.exports = app