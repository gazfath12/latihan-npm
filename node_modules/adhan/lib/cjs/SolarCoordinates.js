"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Astronomical = _interopRequireDefault(require("./Astronomical"));

var _MathUtils = require("./MathUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SolarCoordinates = /*#__PURE__*/_createClass(function SolarCoordinates(julianDay) {
  _classCallCheck(this, SolarCoordinates);

  var T = _Astronomical["default"].julianCentury(julianDay);

  var L0 = _Astronomical["default"].meanSolarLongitude(T);

  var Lp = _Astronomical["default"].meanLunarLongitude(T);

  var Omega = _Astronomical["default"].ascendingLunarNodeLongitude(T);

  var Lambda = (0, _MathUtils.degreesToRadians)(_Astronomical["default"].apparentSolarLongitude(T, L0));

  var Theta0 = _Astronomical["default"].meanSiderealTime(T);

  var dPsi = _Astronomical["default"].nutationInLongitude(T, L0, Lp, Omega);

  var dEpsilon = _Astronomical["default"].nutationInObliquity(T, L0, Lp, Omega);

  var Epsilon0 = _Astronomical["default"].meanObliquityOfTheEcliptic(T);

  var EpsilonApparent = (0, _MathUtils.degreesToRadians)(_Astronomical["default"].apparentObliquityOfTheEcliptic(T, Epsilon0));
  /* declination: The declination of the sun, the angle between
          the rays of the Sun and the plane of the Earth's
          equator, in degrees.
          Equation from Astronomical Algorithms page 165 */

  this.declination = (0, _MathUtils.radiansToDegrees)(Math.asin(Math.sin(EpsilonApparent) * Math.sin(Lambda)));
  /* rightAscension: Right ascension of the Sun, the angular distance on the
          celestial equator from the vernal equinox to the hour circle,
          in degrees.
          Equation from Astronomical Algorithms page 165 */

  this.rightAscension = (0, _MathUtils.unwindAngle)((0, _MathUtils.radiansToDegrees)(Math.atan2(Math.cos(EpsilonApparent) * Math.sin(Lambda), Math.cos(Lambda))));
  /* apparentSiderealTime: Apparent sidereal time, the hour angle of the vernal
          equinox, in degrees.
          Equation from Astronomical Algorithms page 88 */

  this.apparentSiderealTime = Theta0 + dPsi * 3600 * Math.cos((0, _MathUtils.degreesToRadians)(Epsilon0 + dEpsilon)) / 3600;
});

exports["default"] = SolarCoordinates;
//# sourceMappingURL=SolarCoordinates.js.map