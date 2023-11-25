const _subLength = (
  str, index, length = str.length - index,
) => {
  return str.substring(index, index + length);
};

module.exports = { _subLength };
