"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Madhab = void 0;
exports.shadowLength = shadowLength;
var Madhab = {
  Shafi: 'shafi',
  Hanafi: 'hanafi'
};
exports.Madhab = Madhab;

function shadowLength(madhab) {
  switch (madhab) {
    case Madhab.Shafi:
      return 1;

    case Madhab.Hanafi:
      return 2;

    default:
      throw 'Invalid Madhab';
  }
}
//# sourceMappingURL=Madhab.js.map