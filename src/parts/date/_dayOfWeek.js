const { __dayOfWeekNames } = require(`../date/__dayOfWeekNames.js`);

const _dayOfWeek = (
  date,
  isLocal = true,
  dayOfWeekNames = __dayOfWeekNames.EnglishShort,
) => {
  if (isLocal) {
    return dayOfWeekNames[date.getDay()];
  } else {
    return dayOfWeekNames[date.getUTCDay()];
  }
};

_dayOfWeek.names = __dayOfWeekNames;

module.exports = { _dayOfWeek };
