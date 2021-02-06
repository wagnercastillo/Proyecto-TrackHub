"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCooperativaById = exports.updateCooperativaById = exports.getCooperativaById = exports.createCooperativa = exports.getCooperativaPrincipal = exports.Principal = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Cooperativa = require('../models/Cooperativa');

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var fs = require('fs-extra');

var Principal = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var cooperativas;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Cooperativa.find({}).lean();

          case 2:
            cooperativas = _context.sent;
            res.render('frm_listaCooperativa', {
              cooperativas: cooperativas
            });
            console.log(cooperativas);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Principal(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.Principal = Principal;

var getCooperativaPrincipal = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var cooperativas;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Cooperativa.find({}).lean();

          case 2:
            cooperativas = _context2.sent;
            res.render('frm_registroCooperativa', {
              cooperativas: cooperativas
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCooperativaPrincipal(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCooperativaPrincipal = getCooperativaPrincipal;

var createCooperativa = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, nombre, direccion, result, newCoperativa;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, direccion = _req$body.direccion;
            console.log(req.file);
            _context3.next = 4;
            return cloudinary.v2.uploader.upload(req.file.path);

          case 4:
            result = _context3.sent;
            newCoperativa = new Cooperativa({
              nombre: nombre,
              direccion: direccion,
              imageURL: result.url,
              public_id: result.public_id
            });
            _context3.next = 8;
            return newCoperativa.save();

          case 8:
            _context3.next = 10;
            return fs.unlink(req.file.path);

          case 10:
            res.redirect('/');

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createCooperativa(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createCooperativa = createCooperativa;

var getCooperativaById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var cooperativa;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Cooperativa.findById(req.params.cooperativaId);

          case 2:
            cooperativa = _context4.sent;

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getCooperativaById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getCooperativaById = getCooperativaById;

var updateCooperativaById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var cooperativaUpdate;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Cooperativa.findByIdAndUpdate(req.params.cooperativaId, req.body, {
              "new": true
            });

          case 2:
            cooperativaUpdate = _context5.sent;

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateCooperativaById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateCooperativaById = updateCooperativaById;

var deleteCooperativaById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteCooperativaById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteCooperativaById = deleteCooperativaById;