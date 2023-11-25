const { _paddingFirst } = require(`../string/_paddingFirst.js`);

const _minutesToTexts = (minutes) => {
  const sign = 0 <= minutes ? `+` : `-`;
  const hourStr = _paddingFirst(String(
    Math.floor(Math.abs(minutes / 60)),
  ), 2, `0`);
  const minStr = _paddingFirst(String(
    Math.abs(minutes % 60),
  ), 2, `0`);
  return [sign, hourStr, minStr];
};

module.exports = { _minutesToTexts };
