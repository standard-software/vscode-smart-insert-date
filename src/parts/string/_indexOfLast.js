const { __max } = require(`../array/__max.js`);

const _indexOfLast = (
  str, search, indexStart = __max([0, str.length - 1]),
) => {
  if (search === ``) {
    return -1;
  }
  return str.lastIndexOf(search, indexStart);
};

module.exports = { _indexOfLast };
