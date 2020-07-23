//'use strict';
/*
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const app = express()
var urlencodedParser = bodyParser.urlencoded({extended: false})

dotenv.config();
(async function () {
    let httpPort = process.env.APP_PORT;

    app.use(urlencodedParser)
    app.use(express.static(path.join(__dirname, 'www')))

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'www/index.html'))
    })
        app.use(bodyParser.json());
        app.use((req, res, next) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
            next();
        })
        app.listen(httpPort, function () {
            console.log(`Listening on port ${httpPort}!`)
        });

}*/
//)()