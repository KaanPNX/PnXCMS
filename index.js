const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const helmet = require('helmet');
const session = require('express-session');
const sqlite = require('sqlite3');

app.set('view engine','ejs');

app.use(helmet());
app.use(session());

server.listen(30);