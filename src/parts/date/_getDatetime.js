const { isUndefined } = require(`../type/isUndefined.js`);
const { isNull } = require(`../type/isNull.js`);
const { __cloneDate } = require(`../common/__cloneDate.js`);
const { _roundDown } = require(`../number/_roundDown.js`);

const _getDatetime = (
  date,
  timezoneOffset,
) => {
  const d = __cloneDate(date);
  if (isUndefined(timezoneOffset)) {
    return {
      year:         d.getFullYear(),
      month:        d.getMonth() + 1,
      date:         d.getDate(),
      hours:        d.getHours(),
      minutes:      d.getMinutes(),
      seconds:      d.getSeconds(),
      milliseconds: d.getMilliseconds(),
    };
  } else if (isNull(timezoneOffset)) {
    return {
      year:         d.getUTCFullYear(),
      month:        d.getUTCMonth() + 1,
      date:         d.getUTCDate(),
      hours:        d.getUTCHours(),
      minutes:      d.getUTCMinutes(),
      seconds:      d.getUTCSeconds(),
      milliseconds: d.getUTCMilliseconds(),
    };
  } else {
    const timezoneOffsetSeconds = (timezoneOffset * 60 - _roundDown(timezoneOffset) * 60);
    d.setUTCMinutes(d.getUTCMinutes() - timezoneOffset);
    d.setUTCSeconds(d.getUTCSeconds() - timezoneOffsetSeconds);
    return {
      year:         d.getUTCFullYear(),
      month:        d.getUTCMonth() + 1,
      date:         d.getUTCDate(),
      hours:        d.getUTCHours(),
      minutes:      d.getUTCMinutes(),
      seconds:      d.getUTCSeconds(),
      milliseconds: d.getUTCMilliseconds(),
    };
  }
};

module.exports = { _getDatetime };
