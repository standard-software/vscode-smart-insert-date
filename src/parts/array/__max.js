const { isNumber } = require(`../type/isNumber.js`);

const __max = (array) => {
  if (array.length === 0) {
    return null;
  }
  let result = array[0];
  for (let i = 0, l = array.length; i < l; i += 1) {
    if (!isNumber(array[i])) {
      throw new Error(
        `__max args(array) element is not number`,
      );
    }
    if (result < array[i]) {
      result = array[i];
    }
  }
  return result;
};

module.exports = { __max };
