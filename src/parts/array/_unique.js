const { __returnFirstArgFunc } = require(`../common/__returnFirstArgFunc.js`);

/**
 * uniqe
 */
const _unique = (
  array, func = __returnFirstArgFunc, detail = false,
) => {
  const index = [];
  const result = [];
  const count = [];
  array.forEach(v => {
    const funcResult = func(v);
    const indexResult = index.indexOf(funcResult);
    if (indexResult === -1) {
      index.push(funcResult);
      result.push(v);
      count.push(1);
    } else {
      count[indexResult] += 1;
    }
  });
  func = undefined;
  if (detail) {
    return { index, result, count };
  }
  return result;
};

module.exports = { _unique };
