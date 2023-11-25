const { _repeat } = require(`../string/_repeat.js`);
const { _subLast } = require(`../string/_subLast.js`);

const _paddingFirst = (str, length, fill) => {
  if (length <= str.length) {
    return str;
  }
  const result = _repeat(fill, length) + str;
  return _subLast(result, length);
};

module.exports = { _paddingFirst };
