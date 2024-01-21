const { isBoolean } = require(`../type/isBoolean.js`);

const _findFirstIndex = (array, func) => {
  for (let i = 0, l = array.length; i < l; i += 1) {
    const resultFunc = func(array[i], i, array);
    if (!isBoolean(resultFunc)) {
      throw new Error(
        `_findFirstIndex args(compareFunc) result is not boolean`,
      );
    }
    if (resultFunc) {
      return i;
    }
  }
  return -1;
};

module.exports = { _findFirstIndex };
