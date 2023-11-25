const { _deleteLength } = require(`../string/_deleteLength.js`);

const _deleteLast = (str, length = 1) => {
  return _deleteLength(
    str, str.length - length, length,
  );
};

module.exports = { _deleteLast };
