const sqlite = require('sqlite3');
const fs = require('fs');
const path = require('path');

var f = new sqlite.Database(path.resolve(__dirname+'/SQLite', 'f.db'));
var g = new sqlite.Database(path.resolve(__dirname+'/SQLite','g.db'));
var v = new sqlite.Database(path.resolve(__dirname+'/SQLite','v.db'));
var m = new sqlite.Database(path.resolve(__dirname+'/SQLite','m.db'));

f.serialize(() => f.exec(fs.readFileSync(__dirname+'/SQL/f.sql','utf-8')));
g.serialize(() => g.exec(fs.readFileSync(__dirname+'/SQL/g.sql','utf-8')));
v.serialize(() => v.exec(fs.readFileSync(__dirname+'/SQL/v.sql','utf-8')));
m.serialize(() => m.exec(fs.readFileSync(__dirname+'/SQL/m.sql','utf-8')));

module.exports = {f,g,v,m};