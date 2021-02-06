"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var app = require('./app');

app.listen(app.get('port'), function () {
  console.log('Servidor escuchando en el puerto ', app.get('port'));
  console.log('Envioment: ', process.env.NODE_ENV);
});