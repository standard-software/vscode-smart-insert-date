const { _indexOfFirst } = require(`../string/_indexOfFirst.js`);
const { _subIndex } = require(`../string/_subIndex.js`);

const _subFirstDelimFirst = (str, delimiter) => {
  const index = _indexOfFirst(str, delimiter);
  if (index === -1) {
    return ``;
  } else {
    return _subIndex(str, 0, index - 1);
  }
};

module.exports = { _subFirstDelimFirst };
