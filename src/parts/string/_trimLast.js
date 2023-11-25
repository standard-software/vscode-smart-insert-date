const { isUndefined } = require(`../type/isUndefined.js`);
const { _findFirst } = require(`../array/_findFirst.js`);
const { _isLast } = require(`../string/_isLast.js`);
const { _deleteLast } = require(`../string/_deleteLast.js`);

const _trimLast = (
  str,
  valueArray = [` `, `\r`, `\n`],
) => {
  while (true) {
    const value = _findFirst(
      valueArray, value => _isLast(str, value),
    );
    if (isUndefined(value)) {
      break;
    }
    str = _deleteLast(str, value.length);
  }
  return str;
};

module.exports = { _trimLast };
