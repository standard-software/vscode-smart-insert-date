const { _repeat } = require(`../string/_repeat.js`);
const { _subFirst } = require(`../string/_subFirst.js`);

const _paddingLast = (str, length, fill) => {
  if (length <= str.length) {
    return str;
  }
  const result = str + _repeat(fill, length);
  return _subFirst(result, length);
};

module.exports = { _paddingLast };
