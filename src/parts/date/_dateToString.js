/**
 * dateToString
 */
const { _isOdd } = require(`../number/_isOdd.js`);
const { _replaceAllArray } = require(`../string/_replaceAllArray.js`);
const { _includeCount } = require(`../string/_includeCount.js`);
const { _SortFunc } = require(`../array/_SortFunc.js`);
const { _objectKeys } = require(`../object/_objectKeys.js`);
const { __dateToStringRule } = require(`../date/__dateToStringRule.js`);

const _dateToString = (
  date, format, timezoneOffset,
  rule = __dateToStringRule.Default(),
) => {
  const existSingleQuote = format.includes(`'`);
  const existDoubleQuote = format.includes(`"`);
  if (existSingleQuote && existDoubleQuote) {
    throw new Error(
      `__dateToString args(format:${format}) exists both singleQuote and doubleQuote`,
    );
  }

  const keys = _objectKeys(rule);
  keys.sort(
    _SortFunc([
      [_SortFunc.order.normal.descending, v => v.length],
    ]),
  );

  const replaceArray = keys.map(
    key => [key, rule[key].func(date, timezoneOffset)],
  );

  let quoteChar;
  if ((existSingleQuote === false) && (existDoubleQuote === false)) {
    return _replaceAllArray(format, replaceArray);
  } else if (existSingleQuote === false) {
    quoteChar = `"`;
  } else if (existDoubleQuote === false) {
    quoteChar = `'`;
  }
  if (_isOdd(_includeCount(format, quoteChar))) {
    throw new Error(
      `__dateToString args(format:${format}) exists odd Quotes`,
    );
  }

  const formatStrs = format.split(quoteChar);
  for (let i = 0, l = formatStrs.length; i < l; i += 2) {
    formatStrs[i] = _replaceAllArray(formatStrs[i], replaceArray);
  }
  return formatStrs.join(``);
};

_dateToString.rule = __dateToStringRule;

module.exports = { _dateToString };
