const { _indexOfFirst } = require(`../string/_indexOfFirst.js`);

const _isFirst = (str, search) => {
  return _indexOfFirst(str, search) === 0;
};

module.exports = { _isFirst };
