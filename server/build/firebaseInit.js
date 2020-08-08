"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messaging = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _settings = require("./settings");

var serviceAccount = require(_settings.googleApplicationCredentials);

_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(serviceAccount),
  databaseURL: 'https://web-chat-72b52.firebaseio.com'
});

var messaging = _firebaseAdmin.default.messaging();

exports.messaging = messaging;