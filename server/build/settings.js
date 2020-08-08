"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleApplicationCredentials = exports.connectionString = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

var connectionString = process.env.DATABASE_URL;
exports.connectionString = connectionString;
var googleApplicationCredentials = '../web-chat-72b52-firebase-adminsdk-v35ow-45ecac1b2e.json';
exports.googleApplicationCredentials = googleApplicationCredentials;