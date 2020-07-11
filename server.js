const express = require('express');
const path = require('path');
const dotenv = require('dotenv');



const app = express()


dotenv.config();

httpPort = process.env.APP_PORT;


app.use(express.static(path.join(__dirname, 'www')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'))
})

app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
})