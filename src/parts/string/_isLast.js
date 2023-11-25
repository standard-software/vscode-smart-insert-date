const { _indexOfLast } = require(`../string/_indexOfLast.js`);

const _isLast = (str, search) => {
  const result = _indexOfLast(str, search);
  if (result === -1) {
    return false;
  }
  return result === str.length - search.length;
};

module.exports = { _isLast };
