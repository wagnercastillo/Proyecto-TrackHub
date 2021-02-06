"use strict";

var _mongoose = require("mongoose");

var Cooperativa = new _mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    required: true,
    "default": true
  },
  imageURL: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = (0, _mongoose.model)('Cooperativa', Cooperativa);