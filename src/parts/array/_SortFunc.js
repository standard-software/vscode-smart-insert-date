const { __returnFirstArgFunc } = require(`../common/__returnFirstArgFunc.js`);
const { __SortFuncOrder } = require(`../array/__SortFuncOrder.js`);

const _SortFunc = (orderSettingArray) => {
  const sortFuncArray = orderSettingArray.map(
    ([orderFunc, valueFunc = __returnFirstArgFunc]) => {
      return (a, b) => orderFunc(valueFunc(a), valueFunc(b));
    },
  );
  return (a, b) => {
    for (let i = 0, l = sortFuncArray.length; i < l; i += 1) {
      const result = sortFuncArray[i](a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
};

_SortFunc.order = __SortFuncOrder;

module.exports = { _SortFunc };
