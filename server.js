'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
const db = require('./mongoose');
const apiRouter = require('./routes/api');
var urlencodedParser = bodyParser.urlencoded({ extended: false, limit: '100mb' })

dotenv.config();

const app = express();
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

;
(async function () {
    let httpPort = process.env.APP_PORT;

    app.use(urlencodedParser);
    app.use(bodyParser.json({ limit: '100mb' }));


    app.use(express.static(path.join(__dirname, 'www')))

    app.use(session({
        secret: 'ThisIsHowYouUseRedisSessionStorage',
        name: 'REDIS-SESSION',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
        store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
    }));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'www/index.html'))
    })

    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        next();
    })

    app.post('/login', async function (req, res) {
        // when user login set the key to redis.
        let collection = 'usuarios';
        let filters = {
            email: req.body.email
        }

        let user = await db.getUser(null, filters);
        if(!user){
            res.status('400').json({message: "usuario no encontrado"});
        }
        if (user.password == req.body.password) {
            req.session.key = req.body.email;
            req.session.user = user;
            res.end('done');
        } else {
            req.session.key = req.body.email;
            console.log(req.session);
            res.status('400').json({message: "los datos no son validos"});
        }

    });

    app.get('/checksession', function (req, res) {
        if (req.session.user) {
            res.json({ bool: true });
        } else {
            res.json({ bool: false });
        }
    })

    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.end('fin');
            }
        });
    });

    app.post('/users', async (req, res) => {
        try {
            await db.insertUser(req.body);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    app.get('/users/:id', async (req, res) => {
        try {
            let goback = await db.getUser(req.params.id, null);
            res.send({ data: goback })
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


})()
