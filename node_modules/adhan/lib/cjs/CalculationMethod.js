"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CalculationParameters = _interopRequireDefault(require("./CalculationParameters"));

var _Rounding = require("./Rounding");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CalculationMethod = {
  // Muslim World League
  MuslimWorldLeague: function MuslimWorldLeague() {
    var params = new _CalculationParameters["default"]('MuslimWorldLeague', 18, 17);
    params.methodAdjustments.dhuhr = 1;
    return params;
  },
  // Egyptian General Authority of Survey
  Egyptian: function Egyptian() {
    var params = new _CalculationParameters["default"]('Egyptian', 19.5, 17.5);
    params.methodAdjustments.dhuhr = 1;
    return params;
  },
  // University of Islamic Sciences, Karachi
  Karachi: function Karachi() {
    var params = new _CalculationParameters["default"]('Karachi', 18, 18);
    params.methodAdjustments.dhuhr = 1;
    return params;
  },
  // Umm al-Qura University, Makkah
  UmmAlQura: function UmmAlQura() {
    return new _CalculationParameters["default"]('UmmAlQura', 18.5, 0, 90);
  },
  // Dubai
  Dubai: function Dubai() {
    var params = new _CalculationParameters["default"]('Dubai', 18.2, 18.2);
    params.methodAdjustments = _objectSpread(_objectSpread({}, params.methodAdjustments), {}, {
      sunrise: -3,
      dhuhr: 3,
      asr: 3,
      maghrib: 3
    });
    return params;
  },
  // Moonsighting Committee
  MoonsightingCommittee: function MoonsightingCommittee() {
    var params = new _CalculationParameters["default"]('MoonsightingCommittee', 18, 18);
    params.methodAdjustments = _objectSpread(_objectSpread({}, params.methodAdjustments), {}, {
      dhuhr: 5,
      maghrib: 3
    });
    return params;
  },
  // ISNA
  NorthAmerica: function NorthAmerica() {
    var params = new _CalculationParameters["default"]('NorthAmerica', 15, 15);
    params.methodAdjustments.dhuhr = 1;
    return params;
  },
  // Kuwait
  Kuwait: function Kuwait() {
    return new _CalculationParameters["default"]('Kuwait', 18, 17.5);
  },
  // Qatar
  Qatar: function Qatar() {
    return new _CalculationParameters["default"]('Qatar', 18, 0, 90);
  },
  // Singapore
  Singapore: function Singapore() {
    var params = new _CalculationParameters["default"]('Singapore', 20, 18);
    params.methodAdjustments.dhuhr = 1;
    params.rounding = _Rounding.Rounding.Up;
    return params;
  },
  // Institute of Geophysics, University of Tehran
  Tehran: function Tehran() {
    var params = new _CalculationParameters["default"]('Tehran', 17.7, 14, 0, 4.5);
    return params;
  },
  // Dianet
  Turkey: function Turkey() {
    var params = new _CalculationParameters["default"]('Turkey', 18, 17);
    params.methodAdjustments = _objectSpread(_objectSpread({}, params.methodAdjustments), {}, {
      sunrise: -7,
      dhuhr: 5,
      asr: 4,
      maghrib: 7
    });
    return params;
  },
  // Other
  Other: function Other() {
    return new _CalculationParameters["default"]('Other', 0, 0);
  }
};
var _default = CalculationMethod;
exports["default"] = _default;
//# sourceMappingURL=CalculationMethod.js.map