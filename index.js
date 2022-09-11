const express = require('express');
const http = require('http2');
const { readFileSync } = require('fs');
const http2Express = require('http2-express-bridge');
const app = http2Express(express)
var session = require('express-session');
const sqlite = require('sqlite3');
var {WebSocketServer} = require('ws');

const options = {
    key: readFileSync(__dirname + '/Certificate/cert.key'),
    cert: readFileSync(__dirname + '/Certificate/cert.crt'),
    allowHTTP1: true
}
var server = http.createSecureServer(options,app);
module.exports.wsServer = new WebSocketServer({ server });

server.listen(3000, () => console.log('Listen 3000.'));

app.set('view engine','ejs');
app.set('trust proxy', 1)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'ssssss',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(async (req,res,next) => {
    res.set({
        "X-Powered-By": "KaanPnX",
        "Referrer-Policy": "origin",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
    });
    next();
});

app.use('/',require('./Routers/index'));
app.use('/api',require('./Routers/Api'));
app.use('/dashbord-panel/',require('./Routers/CMS'));

app.use((req,res,next) => {
    res.send('404');
});

require('./app');