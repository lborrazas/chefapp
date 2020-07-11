const express = require('express')
const path = require('path')

const httpPort = 8000

const app = express()

app.use(express.static(path.join(__dirname, 'www')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'))
})

app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
})