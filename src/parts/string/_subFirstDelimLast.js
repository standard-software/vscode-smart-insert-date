const { _indexOfLast } = require(`../string/_indexOfLast.js`);
const { _subIndex } = require(`../string/_subIndex.js`);

const _subFirstDelimLast = (str, delimiter) => {
  const index = _indexOfLast(str, delimiter);
  if (index === -1) {
    return ``;
  } else {
    return _subIndex(str, 0, index - 1);
  }
};

module.exports = { _subFirstDelimLast };
