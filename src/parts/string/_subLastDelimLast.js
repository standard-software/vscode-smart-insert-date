const { _indexOfLast } = require(`../string/_indexOfLast.js`);
const { _subLength } = require(`./_subLength.js`);

const _subLastDelimLast = (str, delimiter) => {
  const index = _indexOfLast(str, delimiter);
  if (index === -1) {
    return ``;
  } else {
    return _subLength(str, index + delimiter.length);
  }
};

module.exports = { _subLastDelimLast };
