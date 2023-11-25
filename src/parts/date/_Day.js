const { isUndefined } = require(`../type/isUndefined.js`);
const { isNull } = require(`../type/isNull.js`);
const { isString } = require(`../type/isString.js`);
const { __cloneDate } = require(`../common/__cloneDate.js`);
const { _roundDown } = require(`../number/_roundDown.js`);

/**
 * Day
 */
const _Day = (
  value,
  sourceDate = (new Date()),
  timezoneOffset,
) => {
  if (isString(value)) {
    value = value.toLowerCase();
    if (value === `this`) {
      value = 0;
    } else if (value === `today`) {
      value = 0;
    } else if (value === `last`) {
      value = -1;
    } else if (value === `yesterday`) {
      value = -1;
    } else if (value === `next`) {
      value = 1;
    } else if (value === `tomorrow`) {
      value = 1;
    }
  }

  const date = sourceDate;
  let self;
  if (isUndefined(timezoneOffset)) {
    self = new Date(
      date.getFullYear(), date.getMonth(), date.getDate() + value, 0, 0, 0, 0,
    );
  } else if (isNull(timezoneOffset)) {
    self = new Date(Date.UTC(
      date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + value, 0, 0, 0, 0,
    ));
  } else {
    const d = __cloneDate(sourceDate);
    const timezoneOffsetSeconds = (timezoneOffset * 60 - _roundDown(timezoneOffset) * 60);
    d.setUTCMinutes(d.getUTCMinutes() - timezoneOffset);
    d.setUTCSeconds(d.getUTCSeconds() - timezoneOffsetSeconds);
    self = new Date(Date.UTC(
      d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + value, 0, 0, 0, 0,
    ));
    self.setUTCMinutes(self.getUTCMinutes() + timezoneOffset);
  }
  return self;
};

module.exports = { _Day };
