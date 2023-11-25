const { _hasOwn } = require(`../object/_hasOwn.js`);

const _objectKeys = (object) => {
  const result = [];
  for (const key in object) {
    if (_hasOwn(object, key)) {
      result.push(key);
    }
  }
  return result;
};

module.exports = { _objectKeys };
