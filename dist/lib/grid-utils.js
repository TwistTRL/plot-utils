"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateGrids = generateGrids;
exports.generateDateGrids = generateDateGrids;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateGrids(minX, maxX, rangeMinX, rangeMaxX) {
  var grids = [];
  var validFromDiff, validToDiff;
  var diffX = maxX - minX;

  if (diffX === 0) {
    return {
      grids: grids,
      rangeMinX: rangeMinX,
      rangeMaxX: rangeMaxX
    };
  } // superGrid is expressed as 1*10^n, given diffX = x*10^n


  var superGrid = Math.pow(10, Math.floor(Math.log(diffX) / Math.log(10)));
  var interval;

  if (superGrid * 2.5 > diffX) {
    interval = superGrid / 2;
    validFromDiff = superGrid / 2;
    validToDiff = superGrid;
  } else if (superGrid * 5 > diffX) {
    interval = superGrid;
    validFromDiff = superGrid * 2.5;
    validToDiff = superGrid * 5;
  } else {
    interval = superGrid * 2.5;
    validFromDiff = superGrid * 5;
    validToDiff = superGrid * 10;
  }

  var x = rangeMinX - rangeMinX % interval;

  while (true) {
    grids.push(x);

    if (x > rangeMaxX) {
      break;
    }

    x += interval;
  }

  return {
    grids: grids,
    validFromDiff: validFromDiff,
    validToDiff: validToDiff
  };
}

function generateDateGrids(minX, maxX, rangeMinX, rangeMaxX) {
  var grids;
  var validFromDiff, validToDiff;
  var diffX = maxX - minX;

  if (diffX > 8000 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 2000);
    validFromDiff = 8000 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = Infinity;
  } else if (diffX > 4000 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 1000);
    validFromDiff = 4000 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 8000 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 2000 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 500);
    validFromDiff = 2000 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 4000 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 1000 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 250);
    validFromDiff = 1000 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 2000 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 500 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 100);
    validFromDiff = 500 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 1000 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 250 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 50);
    validFromDiff = 250 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 500 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 100 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 25);
    validFromDiff = 100 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 250 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 50 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 10);
    validFromDiff = 50 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 100 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 25 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 5);
    validFromDiff = 25 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 50 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 10 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 3);
    validFromDiff = 10 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 25 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 5 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateYearGrids(rangeMinX, rangeMaxX, 1);
    validFromDiff = 5 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 10 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 2.5 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateMonthGrids(rangeMinX, rangeMaxX, 6);
    validFromDiff = 2.5 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 5 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 1 * 365 * 24 * 60 * 60 * 1000) {
    grids = generateMonthGrids(rangeMinX, rangeMaxX, 3);
    validFromDiff = 1 * 365 * 24 * 60 * 60 * 1000;
    validToDiff = 2.5 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 180 * 24 * 60 * 60 * 1000) {
    grids = generateMonthGrids(rangeMinX, rangeMaxX, 2);
    validFromDiff = 180 * 24 * 60 * 60 * 1000;
    validToDiff = 1 * 365 * 24 * 60 * 60 * 1000;
  } else if (diffX > 90 * 24 * 60 * 60 * 1000) {
    grids = generateMonthGrids(rangeMinX, rangeMaxX, 1);
    validFromDiff = 90 * 24 * 60 * 60 * 1000;
    validToDiff = 180 * 24 * 60 * 60 * 1000;
  } else if (diffX > 45 * 24 * 60 * 60 * 1000) {
    grids = generateDayGrids(rangeMinX, rangeMaxX, 14);
    validFromDiff = 45 * 24 * 60 * 60 * 1000;
    validToDiff = 90 * 24 * 60 * 60 * 1000;
  } else if (diffX > 20 * 24 * 60 * 60 * 1000) {
    grids = generateDayGrids(rangeMinX, rangeMaxX, 7);
    validFromDiff = 20 * 24 * 60 * 60 * 1000;
    validToDiff = 45 * 24 * 60 * 60 * 1000;
  } else if (diffX > 10 * 24 * 60 * 60 * 1000) {
    grids = generateDayGrids(rangeMinX, rangeMaxX, 3);
    validFromDiff = 10 * 24 * 60 * 60 * 1000;
    validToDiff = 20 * 24 * 60 * 60 * 1000;
  } else if (diffX > 5 * 24 * 60 * 60 * 1000) {
    grids = generateDayGrids(rangeMinX, rangeMaxX, 1);
    validFromDiff = 5 * 24 * 60 * 60 * 1000;
    validToDiff = 10 * 24 * 60 * 60 * 1000;
  } else if (diffX > 2.5 * 24 * 60 * 60 * 1000) {
    grids = generateHourGrids(rangeMinX, rangeMaxX, 12);
    validFromDiff = 2.5 * 24 * 60 * 60 * 1000;
    validToDiff = 5 * 24 * 60 * 60 * 1000;
  } else if (diffX > 24 * 60 * 60 * 1000) {
    grids = generateHourGrids(rangeMinX, rangeMaxX, 6);
    validFromDiff = 24 * 60 * 60 * 1000;
    validToDiff = 2.5 * 24 * 60 * 60 * 1000;
  } else if (diffX > 12 * 60 * 60 * 1000) {
    grids = generateHourGrids(rangeMinX, rangeMaxX, 3);
    validFromDiff = 12 * 60 * 60 * 1000;
    validToDiff = 24 * 60 * 60 * 1000;
  } else if (diffX > 6 * 60 * 60 * 1000) {
    grids = generateHourGrids(rangeMinX, rangeMaxX, 2);
    validFromDiff = 6 * 60 * 60 * 1000;
    validToDiff = 12 * 60 * 60 * 1000;
  } else if (diffX > 3 * 60 * 60 * 1000) {
    grids = generateHourGrids(rangeMinX, rangeMaxX, 1);
    validFromDiff = 3 * 60 * 60 * 1000;
    validToDiff = 6 * 60 * 60 * 1000;
  } else if (diffX > 2 * 60 * 60 * 1000) {
    grids = generateMinuteGrids(rangeMinX, rangeMaxX, 30);
    validFromDiff = 2 * 60 * 60 * 1000;
    validToDiff = 3 * 60 * 60 * 1000;
  } else if (diffX > 60 * 60 * 1000) {
    grids = generateMinuteGrids(rangeMinX, rangeMaxX, 15);
    validFromDiff = 60 * 60 * 1000;
    validToDiff = 2 * 60 * 60 * 1000;
  } else if (diffX > 30 * 60 * 1000) {
    grids = generateMinuteGrids(rangeMinX, rangeMaxX, 10);
    validFromDiff = 30 * 60 * 1000;
    validToDiff = 60 * 60 * 1000;
  } else if (diffX > 20 * 60 * 1000) {
    grids = generateMinuteGrids(rangeMinX, rangeMaxX, 5);
    validFromDiff = 20 * 60 * 1000;
    validToDiff = 30 * 60 * 1000;
  } else if (diffX > 10 * 60 * 1000) {
    grids = generateMinuteGrids(rangeMinX, rangeMaxX, 2);
    validFromDiff = 10 * 60 * 1000;
    validToDiff = 20 * 60 * 1000;
  } else if (diffX > 5 * 60 * 1000) {
    grids = generateMinuteGrids(rangeMinX, rangeMaxX, 1);
    validFromDiff = 5 * 60 * 1000;
    validToDiff = 10 * 60 * 1000;
  } else if (diffX > 2.5 * 60 * 1000) {
    grids = generateSecondGrids(rangeMinX, rangeMaxX, 30);
    validFromDiff = 2.5 * 60 * 1000;
    validToDiff = 5 * 60 * 1000;
  } else if (diffX > 60 * 1000) {
    grids = generateSecondGrids(rangeMinX, rangeMaxX, 15);
    validFromDiff = 60 * 1000;
    validToDiff = 2.5 * 60 * 1000;
  } else if (diffX > 30 * 1000) {
    grids = generateSecondGrids(rangeMinX, rangeMaxX, 10);
    validFromDiff = 30 * 1000;
    validToDiff = 60 * 1000;
  } else if (diffX > 15 * 1000) {
    grids = generateSecondGrids(rangeMinX, rangeMaxX, 5);
    validFromDiff = 15 * 1000;
    validToDiff = 30 * 1000;
  } else if (diffX > 10 * 1000) {
    grids = generateSecondGrids(rangeMinX, rangeMaxX, 2.5);
    validFromDiff = 10 * 1000;
    validToDiff = 15 * 1000;
  } else if (diffX > 5 * 1000) {
    grids = generateSecondGrids(rangeMinX, rangeMaxX, 1);
    validFromDiff = 5 * 1000;
    validToDiff = 10 * 1000;
  } else if (diffX > 2.5 * 1000) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 500);
    validFromDiff = 2.5 * 1000;
    validToDiff = 5 * 1000;
  } else if (diffX > 1000) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 250);
    validFromDiff = 1000;
    validToDiff = 2.5 * 1000;
  } else if (diffX > 500) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 100);
    validFromDiff = 500;
    validToDiff = 1000;
  } else if (diffX > 250) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 50);
    validFromDiff = 250;
    validToDiff = 500;
  } else if (diffX > 100) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 25);
    validFromDiff = 100;
    validToDiff = 250;
  } else if (diffX > 50) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 10);
    validFromDiff = 500;
    validToDiff = 100;
  } else if (diffX > 25) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 5);
    validFromDiff = 25;
    validToDiff = 50;
  } else if (diffX > 10) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 3);
    validFromDiff = 10;
    validToDiff = 25;
  } else if (diffX > 5) {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 1);
    validFromDiff = 5;
    validToDiff = 10;
  } else {
    grids = generateMilliSecondGrids(rangeMinX, rangeMaxX, 1);
    validFromDiff = 0;
    validToDiff = 5;
  }

  return {
    grids: grids,
    validFromDiff: validFromDiff,
    validToDiff: validToDiff
  };
}

function generateYearGrids(rangeMinX, rangeMaxX) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  var t = new Date(rangeMinX);
  t.setHours(0, 0, 0, 0);
  t.setMonth(0, 1);
  var y = t.getFullYear();
  y = y - y % n;
  t.setFullYear(y);

  while (t.valueOf() < rangeMaxX) {
    if (t.valueOf() >= rangeMinX) {
      ret.push(t.valueOf());
    }

    y += n;
    t.setFullYear(y);
  }

  return ret;
}

function generateMonthGrids(rangeMinX, rangeMaxX) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  var t = new Date(rangeMinX);
  t.setHours(0, 0, 0, 0);
  t.setDate(1);
  var m = t.getMonth();
  var y = t.getFullYear();

  while (true) {
    ret.push(t.valueOf());

    if (t.valueOf() > rangeMaxX) {
      break;
    }

    m += n;
    t.setFullYear(y, m);

    if (t.getFullYear() !== y) {
      t.setMonth(0);
      m = t.getMonth();
      y = t.getFullYear();
    }
  }

  return ret;
}

function generateDayGrids(rangeMinX, rangeMaxX) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  var t = new Date(rangeMinX);
  t.setHours(0, 0, 0, 0);
  t.setDate(1);
  var d = t.getDate();
  var m = t.getMonth();
  var y = t.getFullYear();

  while (t < rangeMaxX) {
    if (t >= rangeMinX) {
      ret.push(t.valueOf());
    }

    d += n;
    t.setFullYear(y, m, d);

    if (t.getMonth() !== m || t.getFullYear() !== y) {
      t.setDate(1);
      y = t.getFullYear();
      m = t.getMonth();
      d = t.getDate();

      if (t - ret[ret.length - 1] < n / 2 * 24 * 60 * 60 * 1000) {
        ret.pop();
      }
    }
  }

  return ret;
}

function generateHourGrids(rangeMinX, rangeMaxX) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  var interval = 60 * 60 * 1000 * n;
  var t = rangeMinX - rangeMinX % interval;

  while (t < rangeMaxX) {
    if (t >= rangeMinX) {
      if ((0, _moment.default)(t).isDST()) {
        ret.push(t - 60 * 60 * 1000);
      } else {
        ret.push(t);
      }
    }

    t += interval;
  }

  return ret;
}

function generateMinuteGrids(rangeMinX, rangeMaxX) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  var interval = 60 * 1000 * n;
  var t = rangeMinX - rangeMinX % interval;

  while (t < rangeMaxX) {
    if (t >= rangeMinX) {
      ret.push(t);
    }

    t += interval;
  }

  return ret;
}

function generateSecondGrids(rangeMinX, rangeMaxX) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  var interval = 1000 * n;
  var t = rangeMinX - rangeMinX % interval;

  while (t < rangeMaxX) {
    if (t >= rangeMinX) {
      ret.push(t);
    }

    t += interval;
  }

  return ret;
}

function generateMilliSecondGrids(rangeMinX, rangeMaxX) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  var interval = n;
  var t = rangeMinX - rangeMinX % interval;

  while (t < rangeMaxX) {
    if (t >= rangeMinX) {
      ret.push(t);
    }

    t += interval;
  }

  return ret;
}