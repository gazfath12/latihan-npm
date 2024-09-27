"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Astronomical = _interopRequireDefault(require("./Astronomical"));

var _MathUtils = require("./MathUtils");

var _SolarCoordinates = _interopRequireDefault(require("./SolarCoordinates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SolarTime = /*#__PURE__*/function () {
  function SolarTime(date, coordinates) {
    _classCallCheck(this, SolarTime);

    var julianDay = _Astronomical["default"].julianDay(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0);

    this.observer = coordinates;
    this.solar = new _SolarCoordinates["default"](julianDay);
    this.prevSolar = new _SolarCoordinates["default"](julianDay - 1);
    this.nextSolar = new _SolarCoordinates["default"](julianDay + 1);

    var m0 = _Astronomical["default"].approximateTransit(coordinates.longitude, this.solar.apparentSiderealTime, this.solar.rightAscension);

    var solarAltitude = -50.0 / 60.0;
    this.approxTransit = m0;
    this.transit = _Astronomical["default"].correctedTransit(m0, coordinates.longitude, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension);
    this.sunrise = _Astronomical["default"].correctedHourAngle(m0, solarAltitude, coordinates, false, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
    this.sunset = _Astronomical["default"].correctedHourAngle(m0, solarAltitude, coordinates, true, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
  }

  _createClass(SolarTime, [{
    key: "hourAngle",
    value: function hourAngle(angle, afterTransit) {
      return _Astronomical["default"].correctedHourAngle(this.approxTransit, angle, this.observer, afterTransit, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
    }
  }, {
    key: "afternoon",
    value: function afternoon(shadowLength) {
      // TODO source shadow angle calculation
      var tangent = Math.abs(this.observer.latitude - this.solar.declination);
      var inverse = shadowLength + Math.tan((0, _MathUtils.degreesToRadians)(tangent));
      var angle = (0, _MathUtils.radiansToDegrees)(Math.atan(1.0 / inverse));
      return this.hourAngle(angle, true);
    }
  }]);

  return SolarTime;
}();

exports["default"] = SolarTime;
//# sourceMappingURL=SolarTime.js.map