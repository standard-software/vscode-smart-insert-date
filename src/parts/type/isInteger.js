const { isNumber } = require(`../type/isNumber.js`);

const isInteger = (value) => {
  if (!isNumber(value)) {
    return false;
  }
  return Math.round(value) === value;
};

module.exports = { isInteger };
