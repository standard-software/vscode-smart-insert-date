const { _indexOfFirst } = require(`../string/_indexOfFirst.js`);

const _indexOfAnyFirst = (
  str, searchArray, indexStart = 0,
) => {
  let result = Infinity;
  let searchIndex = -1;
  searchArray.forEach((search, index) => {
    const findIndex = _indexOfFirst(str, search, indexStart);
    if (findIndex !== -1) {
      if (findIndex < result) {
        result = findIndex;
        searchIndex = index;
      }
    }
  });

  if (result === Infinity) {
    return {
      index: -1,
      searchIndex: -1,
    };
  }
  return {
    index: result,
    searchIndex,
  };
};

module.exports = { _indexOfAnyFirst };
