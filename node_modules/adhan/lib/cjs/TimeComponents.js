"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var TimeComponents = /*#__PURE__*/function () {
  function TimeComponents(num) {
    _classCallCheck(this, TimeComponents);

    this.hours = Math.floor(num);
    this.minutes = Math.floor((num - this.hours) * 60);
    this.seconds = Math.floor((num - (this.hours + this.minutes / 60)) * 60 * 60);
    return this;
  }

  _createClass(TimeComponents, [{
    key: "utcDate",
    value: function utcDate(year, month, date) {
      return new Date(Date.UTC(year, month, date, this.hours, this.minutes, this.seconds));
    }
  }]);

  return TimeComponents;
}();

exports["default"] = TimeComponents;
//# sourceMappingURL=TimeComponents.js.map