"use strict";

var _inicioSetup = require("./libs/inicioSetup");

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var morgan = require('morgan');

var multer = require('multer');

var path = require('path');

var exphbs = require('express-handlebars');

//Inicializations
var app = express();
(0, _inicioSetup.createRoles)();

require('./database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs'); //Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
var storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({
  storage: storage
}).single('image')); //Routes

app.use(require('./routes/cooperativa.routes'));
app.use('/api/auth', _auth["default"]);
module.exports = app;