"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerToken = exports.addMessage = exports.messagesPage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("../models/model"));

var _notify = require("../notify");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var messagesModel = new _model.default('messages');
var tokensModel = new _model.default('tokens');

var messagesPage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var data;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return messagesModel.select('name, message');

          case 3:
            data = _context.sent;
            res.status(200).json({
              messages: data.rows
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(200).json({
              messages: _context.t0.stack
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function messagesPage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.messagesPage = messagesPage;

var addMessage = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var _req$body, name, message, token, columns, values, data, _yield$tokensModel$se, rows, tokens, _iterator, _step, _token, notificationData, tks;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, message = _req$body.message, token = _req$body.token;
            columns = 'name, message';
            values = "'".concat(name, "', '").concat(message, "'");
            _context2.prev = 3;
            _context2.next = 6;
            return messagesModel.insertWithReturn(columns, values);

          case 6:
            data = _context2.sent;
            _context2.next = 9;
            return tokensModel.select('token');

          case 9:
            _yield$tokensModel$se = _context2.sent;
            rows = _yield$tokensModel$se.rows;
            tokens = [];
            _iterator = _createForOfIteratorHelper(rows);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                _token = _step.value.token;
                tokens.push(_token);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            notificationData = {
              title: 'New message',
              body: message
            };
            (0, _notify.sendNotificationToClient)(tokens, notificationData);
            res.status(200).json({
              messages: data.rows
            });
            _context2.next = 25;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](3);
            _context2.next = 23;
            return tokensModel.select('token');

          case 23:
            tks = _context2.sent;
            res.status(200).json({
              messages: _context2.t0.stack
            });

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 19]]);
  }));

  return function addMessage(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addMessage = addMessage;

var registerToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var token, columns, values, data;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.body.token;
            columns = 'token';
            values = "'".concat(token, "'");
            _context3.prev = 3;
            _context3.next = 6;
            return tokensModel.insertWithReturn(columns, values);

          case 6:
            data = _context3.sent;
            res.status(200).json({
              messages: data.rows
            });
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);
            res.status(200).json({
              messages: _context3.t0.stack
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 10]]);
  }));

  return function registerToken(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.registerToken = registerToken;