"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SolarTime = _interopRequireDefault(require("./SolarTime"));

var _TimeComponents4 = _interopRequireDefault(require("./TimeComponents"));

var _Prayer = _interopRequireDefault(require("./Prayer"));

var _Astronomical = _interopRequireDefault(require("./Astronomical"));

var _DateUtils = require("./DateUtils");

var _Madhab = require("./Madhab");

var _PolarCircleResolution = require("./PolarCircleResolution");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PrayerTimes = /*#__PURE__*/function () {
  // eslint-disable-next-line complexity
  function PrayerTimes(coordinates, date, calculationParameters) {
    _classCallCheck(this, PrayerTimes);

    this.coordinates = coordinates;
    this.date = date;
    this.calculationParameters = calculationParameters;
    var solarTime = new _SolarTime["default"](date, coordinates);
    var fajrTime;
    var sunriseTime;
    var dhuhrTime;
    var asrTime;
    var sunsetTime;
    var maghribTime;
    var ishaTime;
    var nightFraction;
    dhuhrTime = new _TimeComponents4["default"](solarTime.transit).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
    sunriseTime = new _TimeComponents4["default"](solarTime.sunrise).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
    sunsetTime = new _TimeComponents4["default"](solarTime.sunset).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
    var tomorrow = (0, _DateUtils.dateByAddingDays)(date, 1);
    var tomorrowSolarTime = new _SolarTime["default"](tomorrow, coordinates);
    var polarCircleResolver = calculationParameters.polarCircleResolution;

    if ((!(0, _DateUtils.isValidDate)(sunriseTime) || !(0, _DateUtils.isValidDate)(sunsetTime) || isNaN(tomorrowSolarTime.sunrise)) && polarCircleResolver !== _PolarCircleResolution.PolarCircleResolution.Unresolved) {
      var _TimeComponents, _TimeComponents2, _TimeComponents3;

      var resolved = (0, _PolarCircleResolution.polarCircleResolvedValues)(polarCircleResolver, date, coordinates);
      solarTime = resolved.solarTime;
      tomorrowSolarTime = resolved.tomorrowSolarTime;
      var dateComponents = [date.getFullYear(), date.getMonth(), date.getDate()];
      dhuhrTime = (_TimeComponents = new _TimeComponents4["default"](solarTime.transit)).utcDate.apply(_TimeComponents, dateComponents);
      sunriseTime = (_TimeComponents2 = new _TimeComponents4["default"](solarTime.sunrise)).utcDate.apply(_TimeComponents2, dateComponents);
      sunsetTime = (_TimeComponents3 = new _TimeComponents4["default"](solarTime.sunset)).utcDate.apply(_TimeComponents3, dateComponents);
    } // eslint-disable-next-line prefer-const


    asrTime = new _TimeComponents4["default"](solarTime.afternoon((0, _Madhab.shadowLength)(calculationParameters.madhab))).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
    var tomorrowSunrise = new _TimeComponents4["default"](tomorrowSolarTime.sunrise).utcDate(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    var night = (Number(tomorrowSunrise) - Number(sunsetTime)) / 1000;
    fajrTime = new _TimeComponents4["default"](solarTime.hourAngle(-1 * calculationParameters.fajrAngle, false)).utcDate(date.getFullYear(), date.getMonth(), date.getDate()); // special case for moonsighting committee above latitude 55

    if (calculationParameters.method === 'MoonsightingCommittee' && coordinates.latitude >= 55) {
      nightFraction = night / 7;
      fajrTime = (0, _DateUtils.dateByAddingSeconds)(sunriseTime, -nightFraction);
    }

    var safeFajr = function () {
      if (calculationParameters.method === 'MoonsightingCommittee') {
        return _Astronomical["default"].seasonAdjustedMorningTwilight(coordinates.latitude, (0, _DateUtils.dayOfYear)(date), date.getFullYear(), sunriseTime);
      } else {
        var portion = calculationParameters.nightPortions().fajr;
        nightFraction = portion * night;
        return (0, _DateUtils.dateByAddingSeconds)(sunriseTime, -nightFraction);
      }
    }();

    if (isNaN(fajrTime.getTime()) || safeFajr > fajrTime) {
      fajrTime = safeFajr;
    }

    if (calculationParameters.ishaInterval > 0) {
      ishaTime = (0, _DateUtils.dateByAddingMinutes)(sunsetTime, calculationParameters.ishaInterval);
    } else {
      ishaTime = new _TimeComponents4["default"](solarTime.hourAngle(-1 * calculationParameters.ishaAngle, true)).utcDate(date.getFullYear(), date.getMonth(), date.getDate()); // special case for moonsighting committee above latitude 55

      if (calculationParameters.method === 'MoonsightingCommittee' && coordinates.latitude >= 55) {
        nightFraction = night / 7;
        ishaTime = (0, _DateUtils.dateByAddingSeconds)(sunsetTime, nightFraction);
      }

      var safeIsha = function () {
        if (calculationParameters.method === 'MoonsightingCommittee') {
          return _Astronomical["default"].seasonAdjustedEveningTwilight(coordinates.latitude, (0, _DateUtils.dayOfYear)(date), date.getFullYear(), sunsetTime, calculationParameters.shafaq);
        } else {
          var portion = calculationParameters.nightPortions().isha;
          nightFraction = portion * night;
          return (0, _DateUtils.dateByAddingSeconds)(sunsetTime, nightFraction);
        }
      }();

      if (isNaN(ishaTime.getTime()) || safeIsha < ishaTime) {
        ishaTime = safeIsha;
      }
    }

    maghribTime = sunsetTime;

    if (calculationParameters.maghribAngle) {
      var angleBasedMaghrib = new _TimeComponents4["default"](solarTime.hourAngle(-1 * calculationParameters.maghribAngle, true)).utcDate(date.getFullYear(), date.getMonth(), date.getDate());

      if (sunsetTime < angleBasedMaghrib && ishaTime > angleBasedMaghrib) {
        maghribTime = angleBasedMaghrib;
      }
    }

    var fajrAdjustment = (calculationParameters.adjustments.fajr || 0) + (calculationParameters.methodAdjustments.fajr || 0);
    var sunriseAdjustment = (calculationParameters.adjustments.sunrise || 0) + (calculationParameters.methodAdjustments.sunrise || 0);
    var dhuhrAdjustment = (calculationParameters.adjustments.dhuhr || 0) + (calculationParameters.methodAdjustments.dhuhr || 0);
    var asrAdjustment = (calculationParameters.adjustments.asr || 0) + (calculationParameters.methodAdjustments.asr || 0);
    var maghribAdjustment = (calculationParameters.adjustments.maghrib || 0) + (calculationParameters.methodAdjustments.maghrib || 0);
    var ishaAdjustment = (calculationParameters.adjustments.isha || 0) + (calculationParameters.methodAdjustments.isha || 0);
    this.fajr = (0, _DateUtils.roundedMinute)((0, _DateUtils.dateByAddingMinutes)(fajrTime, fajrAdjustment), calculationParameters.rounding);
    this.sunrise = (0, _DateUtils.roundedMinute)((0, _DateUtils.dateByAddingMinutes)(sunriseTime, sunriseAdjustment), calculationParameters.rounding);
    this.dhuhr = (0, _DateUtils.roundedMinute)((0, _DateUtils.dateByAddingMinutes)(dhuhrTime, dhuhrAdjustment), calculationParameters.rounding);
    this.asr = (0, _DateUtils.roundedMinute)((0, _DateUtils.dateByAddingMinutes)(asrTime, asrAdjustment), calculationParameters.rounding);
    this.sunset = (0, _DateUtils.roundedMinute)(sunsetTime, calculationParameters.rounding);
    this.maghrib = (0, _DateUtils.roundedMinute)((0, _DateUtils.dateByAddingMinutes)(maghribTime, maghribAdjustment), calculationParameters.rounding);
    this.isha = (0, _DateUtils.roundedMinute)((0, _DateUtils.dateByAddingMinutes)(ishaTime, ishaAdjustment), calculationParameters.rounding);
  }

  _createClass(PrayerTimes, [{
    key: "timeForPrayer",
    value: function timeForPrayer(prayer) {
      if (prayer === _Prayer["default"].Fajr) {
        return this.fajr;
      } else if (prayer === _Prayer["default"].Sunrise) {
        return this.sunrise;
      } else if (prayer === _Prayer["default"].Dhuhr) {
        return this.dhuhr;
      } else if (prayer === _Prayer["default"].Asr) {
        return this.asr;
      } else if (prayer === _Prayer["default"].Maghrib) {
        return this.maghrib;
      } else if (prayer === _Prayer["default"].Isha) {
        return this.isha;
      } else {
        return null;
      }
    }
  }, {
    key: "currentPrayer",
    value: function currentPrayer() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      if (date >= this.isha) {
        return _Prayer["default"].Isha;
      } else if (date >= this.maghrib) {
        return _Prayer["default"].Maghrib;
      } else if (date >= this.asr) {
        return _Prayer["default"].Asr;
      } else if (date >= this.dhuhr) {
        return _Prayer["default"].Dhuhr;
      } else if (date >= this.sunrise) {
        return _Prayer["default"].Sunrise;
      } else if (date >= this.fajr) {
        return _Prayer["default"].Fajr;
      } else {
        return _Prayer["default"].None;
      }
    }
  }, {
    key: "nextPrayer",
    value: function nextPrayer() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      if (date >= this.isha) {
        return _Prayer["default"].None;
      } else if (date >= this.maghrib) {
        return _Prayer["default"].Isha;
      } else if (date >= this.asr) {
        return _Prayer["default"].Maghrib;
      } else if (date >= this.dhuhr) {
        return _Prayer["default"].Asr;
      } else if (date >= this.sunrise) {
        return _Prayer["default"].Dhuhr;
      } else if (date >= this.fajr) {
        return _Prayer["default"].Sunrise;
      } else {
        return _Prayer["default"].Fajr;
      }
    }
  }]);

  return PrayerTimes;
}();

exports["default"] = PrayerTimes;
//# sourceMappingURL=PrayerTimes.js.map