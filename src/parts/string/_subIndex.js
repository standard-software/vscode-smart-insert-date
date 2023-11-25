const _subIndex = (
  str, indexStart, indexEnd = indexStart,
) => {
  return str.substring(indexStart, indexEnd + 1);
};

module.exports = { _subIndex };
