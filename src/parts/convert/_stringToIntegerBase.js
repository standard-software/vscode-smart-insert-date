const { _matchFormat } = require(`../string/_matchFormat.js`);
const { isInteger } = require(`../type/isInteger.js`);

const _stringToIntegerBase = (
  value,
  defaultValueFunc,
  radix = 10,
) => {
  if (value === ``) {
    return defaultValueFunc();
  }
  if (!_matchFormat(String(radix) + `_base_number`, value)) {
    return defaultValueFunc();
  }

  const result = parseInt(value, radix);
  if (!isInteger(result)) {
    return defaultValueFunc();
  }
  return result;
};

module.exports = { _stringToIntegerBase };
