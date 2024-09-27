"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.degreesToRadians = degreesToRadians;
exports.normalizeToScale = normalizeToScale;
exports.quadrantShiftAngle = quadrantShiftAngle;
exports.radiansToDegrees = radiansToDegrees;
exports.unwindAngle = unwindAngle;

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180.0;
}

function radiansToDegrees(radians) {
  return radians * 180.0 / Math.PI;
}

function normalizeToScale(num, max) {
  return num - max * Math.floor(num / max);
}

function unwindAngle(angle) {
  return normalizeToScale(angle, 360.0);
}

function quadrantShiftAngle(angle) {
  if (angle >= -180 && angle <= 180) {
    return angle;
  }

  return angle - 360 * Math.round(angle / 360);
}
//# sourceMappingURL=MathUtils.js.map