"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DateUtils = require("./DateUtils");

var _PrayerTimes = _interopRequireDefault(require("./PrayerTimes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SunnahTimes = /*#__PURE__*/_createClass(function SunnahTimes(prayerTimes) {
  _classCallCheck(this, SunnahTimes);

  var date = prayerTimes.date;
  var nextDay = (0, _DateUtils.dateByAddingDays)(date, 1);
  var nextDayPrayerTimes = new _PrayerTimes["default"](prayerTimes.coordinates, nextDay, prayerTimes.calculationParameters);
  var nightDuration = (nextDayPrayerTimes.fajr.getTime() - prayerTimes.maghrib.getTime()) / 1000.0;
  this.middleOfTheNight = (0, _DateUtils.roundedMinute)((0, _DateUtils.dateByAddingSeconds)(prayerTimes.maghrib, nightDuration / 2));
  this.lastThirdOfTheNight = (0, _DateUtils.roundedMinute)((0, _DateUtils.dateByAddingSeconds)(prayerTimes.maghrib, nightDuration * (2 / 3)));
});

exports["default"] = SunnahTimes;
//# sourceMappingURL=SunnahTimes.js.map