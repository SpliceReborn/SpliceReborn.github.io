"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _auth = _interopRequireDefault(require("./auth"));

var _ship = _interopRequireDefault(require("./ship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vuex.default);

var _default = new _vuex.default.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth: _auth.default,
    Ship: _ship.default
  }
});

exports.default = _default;