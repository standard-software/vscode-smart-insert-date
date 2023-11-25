const isNumber = (value) => {
  return (typeof value === `number` && (isFinite(value)));
};

module.exports = { isNumber };
