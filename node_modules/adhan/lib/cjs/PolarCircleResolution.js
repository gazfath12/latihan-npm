"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polarCircleResolvedValues = exports.PolarCircleResolution = void 0;

var _Coordinates = _interopRequireDefault(require("./Coordinates"));

var _SolarTime = _interopRequireDefault(require("./SolarTime"));

var _DateUtils = require("./DateUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PolarCircleResolution = {
  AqrabBalad: 'AqrabBalad',
  AqrabYaum: 'AqrabYaum',
  Unresolved: 'Unresolved'
};
exports.PolarCircleResolution = PolarCircleResolution;
var LATITUDE_VARIATION_STEP = 0.5; // Degrees to add/remove at each resolution step

var UNSAFE_LATITUDE = 65; // Based on https://en.wikipedia.org/wiki/Midnight_sun

var isValidSolarTime = function isValidSolarTime(solarTime) {
  return !isNaN(solarTime.sunrise) && !isNaN(solarTime.sunset);
};

var aqrabYaumResolver = function aqrabYaumResolver(coordinates, date) {
  var daysAdded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  if (daysAdded > Math.ceil(365 / 2)) {
    return null;
  }

  var testDate = new Date(date.getTime());
  testDate.setDate(testDate.getDate() + direction * daysAdded);
  var tomorrow = (0, _DateUtils.dateByAddingDays)(testDate, 1);
  var solarTime = new _SolarTime["default"](testDate, coordinates);
  var tomorrowSolarTime = new _SolarTime["default"](tomorrow, coordinates);

  if (!isValidSolarTime(solarTime) || !isValidSolarTime(tomorrowSolarTime)) {
    return aqrabYaumResolver(coordinates, date, daysAdded + (direction > 0 ? 0 : 1), -direction);
  }

  return {
    date: date,
    tomorrow: tomorrow,
    coordinates: coordinates,
    solarTime: solarTime,
    tomorrowSolarTime: tomorrowSolarTime
  };
};

var aqrabBaladResolver = function aqrabBaladResolver(coordinates, date, latitude) {
  var solarTime = new _SolarTime["default"](date, _objectSpread(_objectSpread({}, coordinates), {}, {
    latitude: latitude
  }));
  var tomorrow = (0, _DateUtils.dateByAddingDays)(date, 1);
  var tomorrowSolarTime = new _SolarTime["default"](tomorrow, _objectSpread(_objectSpread({}, coordinates), {}, {
    latitude: latitude
  }));

  if (!isValidSolarTime(solarTime) || !isValidSolarTime(tomorrowSolarTime)) {
    return Math.abs(latitude) >= UNSAFE_LATITUDE ? aqrabBaladResolver(coordinates, date, latitude - Math.sign(latitude) * LATITUDE_VARIATION_STEP) : null;
  }

  return {
    date: date,
    tomorrow: tomorrow,
    coordinates: new _Coordinates["default"](latitude, coordinates.longitude),
    solarTime: solarTime,
    tomorrowSolarTime: tomorrowSolarTime
  };
};

var polarCircleResolvedValues = function polarCircleResolvedValues(resolver, date, coordinates) {
  var defaultReturn = {
    date: date,
    tomorrow: (0, _DateUtils.dateByAddingDays)(date, 1),
    coordinates: coordinates,
    solarTime: new _SolarTime["default"](date, coordinates),
    tomorrowSolarTime: new _SolarTime["default"]((0, _DateUtils.dateByAddingDays)(date, 1), coordinates)
  };

  switch (resolver) {
    case PolarCircleResolution.AqrabYaum:
      {
        return aqrabYaumResolver(coordinates, date) || defaultReturn;
      }

    case PolarCircleResolution.AqrabBalad:
      {
        var latitude = coordinates.latitude;
        return aqrabBaladResolver(coordinates, date, latitude - Math.sign(latitude) * LATITUDE_VARIATION_STEP) || defaultReturn;
      }

    default:
      {
        return defaultReturn;
      }
  }
};

exports.polarCircleResolvedValues = polarCircleResolvedValues;
//# sourceMappingURL=PolarCircleResolution.js.map