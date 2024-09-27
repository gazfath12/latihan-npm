"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = qibla;

var _Coordinates = _interopRequireDefault(require("./Coordinates"));

var _MathUtils = require("./MathUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function qibla(coordinates) {
  var makkah = new _Coordinates["default"](21.4225241, 39.8261818); // Equation from "Spherical Trigonometry For the use of colleges and schools" page 50

  var term1 = Math.sin((0, _MathUtils.degreesToRadians)(makkah.longitude) - (0, _MathUtils.degreesToRadians)(coordinates.longitude));
  var term2 = Math.cos((0, _MathUtils.degreesToRadians)(coordinates.latitude)) * Math.tan((0, _MathUtils.degreesToRadians)(makkah.latitude));
  var term3 = Math.sin((0, _MathUtils.degreesToRadians)(coordinates.latitude)) * Math.cos((0, _MathUtils.degreesToRadians)(makkah.longitude) - (0, _MathUtils.degreesToRadians)(coordinates.longitude));
  var angle = Math.atan2(term1, term2 - term3);
  return (0, _MathUtils.unwindAngle)((0, _MathUtils.radiansToDegrees)(angle));
}
//# sourceMappingURL=Qibla.js.map