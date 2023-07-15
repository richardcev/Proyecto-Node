var createError = require('http-errors');
const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));



app.use(bodyParser.json({ type: 'application/json' }))

app.use(session({
  secret: 'misecreto',
  resave: false,
  saveUninitialized: false,
}));

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var ordenRouter = require('./controllers/orden');
var operarioRouter = require('./controllers/operario');
var adminRouter = require('./controllers/admin');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/orden', ordenRouter);
app.use('/operario', operarioRouter);
app.use('/admin', adminRouter);


app.listen(3001);
console.log('Server on port 3001');



module.exports = app;
