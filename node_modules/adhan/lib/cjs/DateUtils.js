"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateByAddingDays = dateByAddingDays;
exports.dateByAddingMinutes = dateByAddingMinutes;
exports.dateByAddingSeconds = dateByAddingSeconds;
exports.dayOfYear = dayOfYear;
exports.isValidDate = isValidDate;
exports.roundedMinute = roundedMinute;

var _Astronomical = _interopRequireDefault(require("./Astronomical"));

var _Rounding = require("./Rounding");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function dateByAddingDays(date, days) {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate() + days;
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return new Date(year, month, day, hours, minutes, seconds);
}

function dateByAddingMinutes(date, minutes) {
  return dateByAddingSeconds(date, minutes * 60);
}

function dateByAddingSeconds(date, seconds) {
  return new Date(date.getTime() + seconds * 1000);
}

function roundedMinute(date) {
  var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Rounding.Rounding.Nearest;
  var seconds = date.getUTCSeconds();
  var offset = seconds >= 30 ? 60 - seconds : -1 * seconds;

  if (rounding === _Rounding.Rounding.Up) {
    offset = 60 - seconds;
  } else if (rounding === _Rounding.Rounding.None) {
    offset = 0;
  }

  return dateByAddingSeconds(date, offset);
}

function dayOfYear(date) {
  var returnedDayOfYear = 0;
  var feb = _Astronomical["default"].isLeapYear(date.getFullYear()) ? 29 : 28;
  var months = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  for (var i = 0; i < date.getMonth(); i++) {
    returnedDayOfYear += months[i];
  }

  returnedDayOfYear += date.getDate();
  return returnedDayOfYear;
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.valueOf());
}
//# sourceMappingURL=DateUtils.js.map