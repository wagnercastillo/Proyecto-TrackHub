"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIp = exports.signUp = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Rol = _interopRequireDefault(require("../models/Rol"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, nombreUsuario, email, contrasenia, roles, newUsuario, foundRoles, rol, saveUsuario, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nombreUsuario = _req$body.nombreUsuario, email = _req$body.email, contrasenia = _req$body.contrasenia, roles = _req$body.roles; //Verificar si el usuario existe

            _User["default"].find({
              email: email
            });

            newUsuario = new _User["default"]({
              nombreUsuario: nombreUsuario,
              email: email,
              contrasenia: _User["default"].encryptPassword(contrasenia)
            });

            if (!roles) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return _Rol["default"].find({
              name: {
                $in: roles
              }
            });

          case 6:
            foundRoles = _context.sent;
            newUsuario.roles = foundRoles.map(function (rol) {
              return rol._id;
            });
            _context.next = 14;
            break;

          case 10:
            _context.next = 12;
            return _Rol["default"].findOne({
              name: "cliente"
            });

          case 12:
            rol = _context.sent;
            newUsuario.roles = [rol._id];

          case 14:
            _context.next = 16;
            return newUsuario.save();

          case 16:
            saveUsuario = _context.sent;
            token = _jsonwebtoken["default"].sign({
              id: saveUsuario._id
            }, _config["default"].SECRET, {
              expiresIn: 84600
            });
            res.status(200).json({
              token: token
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userFound, matchContrasenia, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 2:
            _context2.next = 4;
            return _context2.sent.populated("roles");

          case 4:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: 'user not found'
            }));

          case 7:
            _context2.next = 9;
            return _User["default"].comparePassword(req.body.contrasenia, userFound.contrasenia);

          case 9:
            matchContrasenia = _context2.sent;

            if (matchContrasenia) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: ' Contrasenia Invalidad'
            }));

          case 12:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.json({
              token: token
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signIp(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIp = signIp;