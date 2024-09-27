"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Madhab = require("./Madhab");

var _HighLatitudeRule = _interopRequireDefault(require("./HighLatitudeRule"));

var _PolarCircleResolution = require("./PolarCircleResolution");

var _Rounding = require("./Rounding");

var _Shafaq = require("./Shafaq");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CalculationParameters = /*#__PURE__*/function () {
  // Madhab to determine how Asr is calculated.
  // Rule to determine the earliest time for Fajr and latest time for Isha
  // needed for high latitude locations where Fajr and Isha may not truly exist
  // or may present a hardship unless bound to a reasonable time.
  // Manual adjustments (in minutes) to be added to each prayer time.
  // Adjustments set by a calculation method. This value should not be manually modified.
  // Rule to determine how to resolve prayer times inside the Polar Circle
  // where daylight or night may persist for more than 24 hours depending
  // on the season
  // How seconds are rounded when calculating prayer times
  // Used by the MoonsightingCommittee method to determine how to calculate Isha
  function CalculationParameters( // Name of the method, can be used to apply special behavior in calculations.
  // This property should not be manually modified.
  method) {
    var fajrAngle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var ishaAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var ishaInterval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var maghribAngle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, CalculationParameters);

    _defineProperty(this, "madhab", _Madhab.Madhab.Shafi);

    _defineProperty(this, "highLatitudeRule", _HighLatitudeRule["default"].MiddleOfTheNight);

    _defineProperty(this, "adjustments", {
      fajr: 0,
      sunrise: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    });

    _defineProperty(this, "methodAdjustments", {
      fajr: 0,
      sunrise: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    });

    _defineProperty(this, "polarCircleResolution", _PolarCircleResolution.PolarCircleResolution.Unresolved);

    _defineProperty(this, "rounding", _Rounding.Rounding.Nearest);

    _defineProperty(this, "shafaq", _Shafaq.Shafaq.General);

    this.method = method;
    this.fajrAngle = fajrAngle;
    this.ishaAngle = ishaAngle;
    this.ishaInterval = ishaInterval;
    this.maghribAngle = maghribAngle;

    if (this.method === null) {
      // we don't want a breaking change
      this.method = 'Other';
    }
  }

  _createClass(CalculationParameters, [{
    key: "nightPortions",
    value: function nightPortions() {
      switch (this.highLatitudeRule) {
        case _HighLatitudeRule["default"].MiddleOfTheNight:
          return {
            fajr: 1 / 2,
            isha: 1 / 2
          };

        case _HighLatitudeRule["default"].SeventhOfTheNight:
          return {
            fajr: 1 / 7,
            isha: 1 / 7
          };

        case _HighLatitudeRule["default"].TwilightAngle:
          return {
            fajr: this.fajrAngle / 60,
            isha: this.ishaAngle / 60
          };

        default:
          throw "Invalid high latitude rule found when attempting to compute night portions: ".concat(this.highLatitudeRule);
      }
    }
  }]);

  return CalculationParameters;
}();

exports["default"] = CalculationParameters;
//# sourceMappingURL=CalculationParameters.js.map