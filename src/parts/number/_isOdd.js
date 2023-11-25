const { _isMultiples } = require(`./_isMultiples.js`);

const _isOdd = (number) => {
  return !_isMultiples(number, 2);
};

module.exports = { _isOdd };
