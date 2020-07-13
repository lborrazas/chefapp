'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
const db = require('./database');
const apiRouter = require('./routes/api');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})

dotenv.config();

const app = express()
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

let httpPort = process.env.APP_PORT;
let database = 'chefsapp';
let client = db.connect();

app.use(urlencodedParser)

app.use(express.static(path.join(__dirname, 'www')))

app.use(session({
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: 'REDIS-SESSION',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}, // Note that the cookie-parser module is no longer needed
    store: new redisStore({host: 'localhost', port: 6379, client: redisClient, ttl: 86400}),
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'))
})

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});

app.post('/login', jsonParser, function (req, res) {
    // when user login set the key to redis.
    console.log(req.body.email)
    req.session.key = req.body.email;
    res.end('done');
});

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.post('/users', async (req, res) => {
    let collection = 'usuarios';
    try {
        await db.insertOne(client, database, collection, req.body);
        res.status(200).end();
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
});

app.use('/api', apiRouter);

app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
});


