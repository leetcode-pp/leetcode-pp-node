const { startTime } = require("../config/index");

const MS_PER_DAY = 24 * 60 * 60 * 1000;

module.exports = {
  getDay(date = new Date().getTime()) {
    return ((date - startTime + MS_PER_DAY - 1) / MS_PER_DAY) >> 0;
  },
  chineseDate(date = new Date().getTime()) {
    return new Date(date + (new Date().getTimezoneOffset() + 480) * 60 * 1000);
  },
};
