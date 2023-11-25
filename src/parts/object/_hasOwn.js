/**
 * hasOwn
 */
const _hasOwn = (object, propertyName) => {
  return Object.prototype.hasOwnProperty.call(object, propertyName);
};

module.exports = { _hasOwn };
