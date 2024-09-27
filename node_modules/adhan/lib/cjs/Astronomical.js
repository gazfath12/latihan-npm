"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DateUtils = require("./DateUtils");

var _MathUtils = require("./MathUtils");

var _Shafaq = require("./Shafaq");

/* eslint-disable max-params, max-lines */
var Astronomical = {
  /* The geometric mean longitude of the sun in degrees. */
  meanSolarLongitude: function meanSolarLongitude(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 163 */

    var term1 = 280.4664567;
    var term2 = 36000.76983 * T;
    var term3 = 0.0003032 * Math.pow(T, 2);
    var L0 = term1 + term2 + term3;
    return (0, _MathUtils.unwindAngle)(L0);
  },

  /* The geometric mean longitude of the moon in degrees. */
  meanLunarLongitude: function meanLunarLongitude(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 144 */

    var term1 = 218.3165;
    var term2 = 481267.8813 * T;
    var Lp = term1 + term2;
    return (0, _MathUtils.unwindAngle)(Lp);
  },
  ascendingLunarNodeLongitude: function ascendingLunarNodeLongitude(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 144 */

    var term1 = 125.04452;
    var term2 = 1934.136261 * T;
    var term3 = 0.0020708 * Math.pow(T, 2);
    var term4 = Math.pow(T, 3) / 450000;
    var Omega = term1 - term2 + term3 + term4;
    return (0, _MathUtils.unwindAngle)(Omega);
  },

  /* The mean anomaly of the sun. */
  meanSolarAnomaly: function meanSolarAnomaly(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 163 */

    var term1 = 357.52911;
    var term2 = 35999.05029 * T;
    var term3 = 0.0001537 * Math.pow(T, 2);
    var M = term1 + term2 - term3;
    return (0, _MathUtils.unwindAngle)(M);
  },

  /* The Sun's equation of the center in degrees. */
  solarEquationOfTheCenter: function solarEquationOfTheCenter(julianCentury, meanAnomaly) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 164 */

    var Mrad = (0, _MathUtils.degreesToRadians)(meanAnomaly);
    var term1 = (1.914602 - 0.004817 * T - 0.000014 * Math.pow(T, 2)) * Math.sin(Mrad);
    var term2 = (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad);
    var term3 = 0.000289 * Math.sin(3 * Mrad);
    return term1 + term2 + term3;
  },

  /* The apparent longitude of the Sun, referred to the
        true equinox of the date. */
  apparentSolarLongitude: function apparentSolarLongitude(julianCentury, meanLongitude) {
    var T = julianCentury;
    var L0 = meanLongitude;
    /* Equation from Astronomical Algorithms page 164 */

    var longitude = L0 + Astronomical.solarEquationOfTheCenter(T, Astronomical.meanSolarAnomaly(T));
    var Omega = 125.04 - 1934.136 * T;
    var Lambda = longitude - 0.00569 - 0.00478 * Math.sin((0, _MathUtils.degreesToRadians)(Omega));
    return (0, _MathUtils.unwindAngle)(Lambda);
  },

  /* The mean obliquity of the ecliptic, formula
        adopted by the International Astronomical Union.
        Represented in degrees. */
  meanObliquityOfTheEcliptic: function meanObliquityOfTheEcliptic(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 147 */

    var term1 = 23.439291;
    var term2 = 0.013004167 * T;
    var term3 = 0.0000001639 * Math.pow(T, 2);
    var term4 = 0.0000005036 * Math.pow(T, 3);
    return term1 - term2 - term3 + term4;
  },

  /* The mean obliquity of the ecliptic, corrected for
        calculating the apparent position of the sun, in degrees. */
  apparentObliquityOfTheEcliptic: function apparentObliquityOfTheEcliptic(julianCentury, meanObliquityOfTheEcliptic) {
    var T = julianCentury;
    var Epsilon0 = meanObliquityOfTheEcliptic;
    /* Equation from Astronomical Algorithms page 165 */

    var O = 125.04 - 1934.136 * T;
    return Epsilon0 + 0.00256 * Math.cos((0, _MathUtils.degreesToRadians)(O));
  },

  /* Mean sidereal time, the hour angle of the vernal equinox, in degrees. */
  meanSiderealTime: function meanSiderealTime(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 165 */

    var JD = T * 36525 + 2451545.0;
    var term1 = 280.46061837;
    var term2 = 360.98564736629 * (JD - 2451545);
    var term3 = 0.000387933 * Math.pow(T, 2);
    var term4 = Math.pow(T, 3) / 38710000;
    var Theta = term1 + term2 + term3 - term4;
    return (0, _MathUtils.unwindAngle)(Theta);
  },
  nutationInLongitude: function nutationInLongitude(julianCentury, solarLongitude, lunarLongitude, ascendingNode) {
    var L0 = solarLongitude;
    var Lp = lunarLongitude;
    var Omega = ascendingNode;
    /* Equation from Astronomical Algorithms page 144 */

    var term1 = -17.2 / 3600 * Math.sin((0, _MathUtils.degreesToRadians)(Omega));
    var term2 = 1.32 / 3600 * Math.sin(2 * (0, _MathUtils.degreesToRadians)(L0));
    var term3 = 0.23 / 3600 * Math.sin(2 * (0, _MathUtils.degreesToRadians)(Lp));
    var term4 = 0.21 / 3600 * Math.sin(2 * (0, _MathUtils.degreesToRadians)(Omega));
    return term1 - term2 - term3 + term4;
  },
  nutationInObliquity: function nutationInObliquity(julianCentury, solarLongitude, lunarLongitude, ascendingNode) {
    var L0 = solarLongitude;
    var Lp = lunarLongitude;
    var Omega = ascendingNode;
    /* Equation from Astronomical Algorithms page 144 */

    var term1 = 9.2 / 3600 * Math.cos((0, _MathUtils.degreesToRadians)(Omega));
    var term2 = 0.57 / 3600 * Math.cos(2 * (0, _MathUtils.degreesToRadians)(L0));
    var term3 = 0.1 / 3600 * Math.cos(2 * (0, _MathUtils.degreesToRadians)(Lp));
    var term4 = 0.09 / 3600 * Math.cos(2 * (0, _MathUtils.degreesToRadians)(Omega));
    return term1 + term2 + term3 - term4;
  },
  altitudeOfCelestialBody: function altitudeOfCelestialBody(observerLatitude, declination, localHourAngle) {
    var Phi = observerLatitude;
    var delta = declination;
    var H = localHourAngle;
    /* Equation from Astronomical Algorithms page 93 */

    var term1 = Math.sin((0, _MathUtils.degreesToRadians)(Phi)) * Math.sin((0, _MathUtils.degreesToRadians)(delta));
    var term2 = Math.cos((0, _MathUtils.degreesToRadians)(Phi)) * Math.cos((0, _MathUtils.degreesToRadians)(delta)) * Math.cos((0, _MathUtils.degreesToRadians)(H));
    return (0, _MathUtils.radiansToDegrees)(Math.asin(term1 + term2));
  },
  approximateTransit: function approximateTransit(longitude, siderealTime, rightAscension) {
    var L = longitude;
    var Theta0 = siderealTime;
    var a2 = rightAscension;
    /* Equation from page Astronomical Algorithms 102 */

    var Lw = L * -1;
    return (0, _MathUtils.normalizeToScale)((a2 + Lw - Theta0) / 360, 1);
  },

  /* The time at which the sun is at its highest point in the sky (in universal time) */
  correctedTransit: function correctedTransit(approximateTransit, longitude, siderealTime, rightAscension, previousRightAscension, nextRightAscension) {
    var m0 = approximateTransit;
    var L = longitude;
    var Theta0 = siderealTime;
    var a2 = rightAscension;
    var a1 = previousRightAscension;
    var a3 = nextRightAscension;
    /* Equation from page Astronomical Algorithms 102 */

    var Lw = L * -1;
    var Theta = (0, _MathUtils.unwindAngle)(Theta0 + 360.985647 * m0);
    var a = (0, _MathUtils.unwindAngle)(Astronomical.interpolateAngles(a2, a1, a3, m0));
    var H = (0, _MathUtils.quadrantShiftAngle)(Theta - Lw - a);
    var dm = H / -360;
    return (m0 + dm) * 24;
  },
  correctedHourAngle: function correctedHourAngle(approximateTransit, angle, coordinates, afterTransit, siderealTime, rightAscension, previousRightAscension, nextRightAscension, declination, previousDeclination, nextDeclination) {
    var m0 = approximateTransit;
    var h0 = angle;
    var Theta0 = siderealTime;
    var a2 = rightAscension;
    var a1 = previousRightAscension;
    var a3 = nextRightAscension;
    var d2 = declination;
    var d1 = previousDeclination;
    var d3 = nextDeclination;
    /* Equation from page Astronomical Algorithms 102 */

    var Lw = coordinates.longitude * -1;
    var term1 = Math.sin((0, _MathUtils.degreesToRadians)(h0)) - Math.sin((0, _MathUtils.degreesToRadians)(coordinates.latitude)) * Math.sin((0, _MathUtils.degreesToRadians)(d2));
    var term2 = Math.cos((0, _MathUtils.degreesToRadians)(coordinates.latitude)) * Math.cos((0, _MathUtils.degreesToRadians)(d2));
    var H0 = (0, _MathUtils.radiansToDegrees)(Math.acos(term1 / term2));
    var m = afterTransit ? m0 + H0 / 360 : m0 - H0 / 360;
    var Theta = (0, _MathUtils.unwindAngle)(Theta0 + 360.985647 * m);
    var a = (0, _MathUtils.unwindAngle)(Astronomical.interpolateAngles(a2, a1, a3, m));
    var delta = Astronomical.interpolate(d2, d1, d3, m);
    var H = Theta - Lw - a;
    var h = Astronomical.altitudeOfCelestialBody(coordinates.latitude, delta, H);
    var term3 = h - h0;
    var term4 = 360 * Math.cos((0, _MathUtils.degreesToRadians)(delta)) * Math.cos((0, _MathUtils.degreesToRadians)(coordinates.latitude)) * Math.sin((0, _MathUtils.degreesToRadians)(H));
    var dm = term3 / term4;
    return (m + dm) * 24;
  },

  /* Interpolation of a value given equidistant
        previous and next values and a factor
        equal to the fraction of the interpolated
        point's time over the time between values. */
  interpolate: function interpolate(y2, y1, y3, n) {
    /* Equation from Astronomical Algorithms page 24 */
    var a = y2 - y1;
    var b = y3 - y2;
    var c = b - a;
    return y2 + n / 2 * (a + b + n * c);
  },

  /* Interpolation of three angles, accounting for
        angle unwinding. */
  interpolateAngles: function interpolateAngles(y2, y1, y3, n) {
    /* Equation from Astronomical Algorithms page 24 */
    var a = (0, _MathUtils.unwindAngle)(y2 - y1);
    var b = (0, _MathUtils.unwindAngle)(y3 - y2);
    var c = b - a;
    return y2 + n / 2 * (a + b + n * c);
  },

  /* The Julian Day for the given Gregorian date components. */
  julianDay: function julianDay(year, month, day) {
    var hours = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    /* Equation from Astronomical Algorithms page 60 */
    var trunc = Math.trunc;
    var Y = trunc(month > 2 ? year : year - 1);
    var M = trunc(month > 2 ? month : month + 12);
    var D = day + hours / 24;
    var A = trunc(Y / 100);
    var B = trunc(2 - A + trunc(A / 4));
    var i0 = trunc(365.25 * (Y + 4716));
    var i1 = trunc(30.6001 * (M + 1));
    return i0 + i1 + D + B - 1524.5;
  },

  /* Julian century from the epoch. */
  julianCentury: function julianCentury(julianDay) {
    /* Equation from Astronomical Algorithms page 163 */
    return (julianDay - 2451545.0) / 36525;
  },

  /* Whether or not a year is a leap year (has 366 days). */
  isLeapYear: function isLeapYear(year) {
    if (year % 4 !== 0) {
      return false;
    }

    if (year % 100 === 0 && year % 400 !== 0) {
      return false;
    }

    return true;
  },
  seasonAdjustedMorningTwilight: function seasonAdjustedMorningTwilight(latitude, dayOfYear, year, sunrise) {
    var a = 75 + 28.65 / 55.0 * Math.abs(latitude);
    var b = 75 + 19.44 / 55.0 * Math.abs(latitude);
    var c = 75 + 32.74 / 55.0 * Math.abs(latitude);
    var d = 75 + 48.1 / 55.0 * Math.abs(latitude);

    var adjustment = function () {
      var dyy = Astronomical.daysSinceSolstice(dayOfYear, year, latitude);

      if (dyy < 91) {
        return a + (b - a) / 91.0 * dyy;
      } else if (dyy < 137) {
        return b + (c - b) / 46.0 * (dyy - 91);
      } else if (dyy < 183) {
        return c + (d - c) / 46.0 * (dyy - 137);
      } else if (dyy < 229) {
        return d + (c - d) / 46.0 * (dyy - 183);
      } else if (dyy < 275) {
        return c + (b - c) / 46.0 * (dyy - 229);
      } else {
        return b + (a - b) / 91.0 * (dyy - 275);
      }
    }();

    return (0, _DateUtils.dateByAddingSeconds)(sunrise, Math.round(adjustment * -60.0));
  },
  seasonAdjustedEveningTwilight: function seasonAdjustedEveningTwilight(latitude, dayOfYear, year, sunset, shafaq) {
    var a, b, c, d;

    if (shafaq === _Shafaq.Shafaq.Ahmer) {
      a = 62 + 17.4 / 55.0 * Math.abs(latitude);
      b = 62 - 7.16 / 55.0 * Math.abs(latitude);
      c = 62 + 5.12 / 55.0 * Math.abs(latitude);
      d = 62 + 19.44 / 55.0 * Math.abs(latitude);
    } else if (shafaq === _Shafaq.Shafaq.Abyad) {
      a = 75 + 25.6 / 55.0 * Math.abs(latitude);
      b = 75 + 7.16 / 55.0 * Math.abs(latitude);
      c = 75 + 36.84 / 55.0 * Math.abs(latitude);
      d = 75 + 81.84 / 55.0 * Math.abs(latitude);
    } else {
      a = 75 + 25.6 / 55.0 * Math.abs(latitude);
      b = 75 + 2.05 / 55.0 * Math.abs(latitude);
      c = 75 - 9.21 / 55.0 * Math.abs(latitude);
      d = 75 + 6.14 / 55.0 * Math.abs(latitude);
    }

    var adjustment = function () {
      var dyy = Astronomical.daysSinceSolstice(dayOfYear, year, latitude);

      if (dyy < 91) {
        return a + (b - a) / 91.0 * dyy;
      } else if (dyy < 137) {
        return b + (c - b) / 46.0 * (dyy - 91);
      } else if (dyy < 183) {
        return c + (d - c) / 46.0 * (dyy - 137);
      } else if (dyy < 229) {
        return d + (c - d) / 46.0 * (dyy - 183);
      } else if (dyy < 275) {
        return c + (b - c) / 46.0 * (dyy - 229);
      } else {
        return b + (a - b) / 91.0 * (dyy - 275);
      }
    }();

    return (0, _DateUtils.dateByAddingSeconds)(sunset, Math.round(adjustment * 60.0));
  },
  daysSinceSolstice: function daysSinceSolstice(dayOfYear, year, latitude) {
    var daysSinceSolstice = 0;
    var northernOffset = 10;
    var southernOffset = Astronomical.isLeapYear(year) ? 173 : 172;
    var daysInYear = Astronomical.isLeapYear(year) ? 366 : 365;

    if (latitude >= 0) {
      daysSinceSolstice = dayOfYear + northernOffset;

      if (daysSinceSolstice >= daysInYear) {
        daysSinceSolstice = daysSinceSolstice - daysInYear;
      }
    } else {
      daysSinceSolstice = dayOfYear - southernOffset;

      if (daysSinceSolstice < 0) {
        daysSinceSolstice = daysSinceSolstice + daysInYear;
      }
    }

    return daysSinceSolstice;
  }
};
var _default = Astronomical;
exports["default"] = _default;
//# sourceMappingURL=Astronomical.js.map