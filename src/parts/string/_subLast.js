const { _subLength } = require(`../string/_subLength.js`);

const _subLast = (str, length = 1) => {
  return _subLength(
    str, str.length - length, length,
  );
};

module.exports = { _subLast };
