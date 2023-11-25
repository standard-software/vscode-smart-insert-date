const { isUndefined } = require(`../type/isUndefined.js`);
const { _findFirst } = require(`../array/_findFirst.js`);
const { _isFirst } = require(`../string/_isFirst.js`);
const { _deleteFirst } = require(`../string/_deleteFirst.js`);

const _trimFirst = (
  str,
  valueArray = [` `, `\t`, `\r`, `\n`],
) => {
  while (true) {
    const value = _findFirst(
      valueArray, value => _isFirst(str, value),
    );
    if (isUndefined(value)) {
      break;
    }
    str = _deleteFirst(str, value.length);
  }
  return str;
};

module.exports = { _trimFirst };
