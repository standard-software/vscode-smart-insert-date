const { _isFirst } = require(`../string/_isFirst.js`);
const { _deleteFirst } = require(`../string/_deleteFirst.js`);

const _excludeFirst = (str, value) => {
  if (_isFirst(str, value)) {
    return _deleteFirst(str, value.length);
  }
  return str;
};

module.exports = { _excludeFirst };
