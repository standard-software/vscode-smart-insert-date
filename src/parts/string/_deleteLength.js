const { _deleteIndex } = require(`../string/_deleteIndex.js`);

const _deleteLength = (
  str, index, length = str.length - index,
) => {
  return _deleteIndex(str, index, index + length - 1);
};

module.exports = { _deleteLength };
