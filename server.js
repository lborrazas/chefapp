const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

var bodyParser = require('body-parser')



const app = express()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(urlencodedParser)

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

dotenv.config();

httpPort = process.env.APP_PORT;


app.use(express.static(path.join(__dirname, 'www')))

app.use(session({
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: 'REDIS-SESSION',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'))
})


app.post('/login',jsonParser, function(req,res){
    // when user login set the key to redis.
    console.log(req.body.email)
    req.session.key=req.body.email;
    res.end('done');
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});


app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
})


// Start a session; we use Redis for the session store.
// "secret" will be used to create the session ID hash (the cookie id and the redis key value)
// "name" will show up as your cookie name in the browser
// "cookie" is provided by default; you can add it to add additional personalized options
// The "store" ttl is the expiration time for each Redis session ID, in seconds



