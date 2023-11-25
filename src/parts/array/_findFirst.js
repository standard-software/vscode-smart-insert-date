const { _findFirstIndex } = require(`../array/_findFirstIndex.js`);

const _findFirst = (array, func) => {
  const resultIndex = _findFirstIndex(array, func);
  if (resultIndex === -1) {
    return undefined;
  }
  return array[resultIndex];
};

module.exports = { _findFirst };
