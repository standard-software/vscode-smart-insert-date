const { _indexOfFirst } = require(`../string/_indexOfFirst.js`);
const { _subLength } = require(`../string/_subLength.js`);

const _subLastDelimFirst = (str, delimiter) => {
  const index = _indexOfFirst(str, delimiter);
  if (index === -1) {
    return ``;
  } else {
    return _subLength(str, index + delimiter.length);
  }
};

module.exports = { _subLastDelimFirst };
