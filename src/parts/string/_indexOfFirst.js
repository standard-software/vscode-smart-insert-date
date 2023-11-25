const _indexOfFirst = (str, search, indexStart) => {
  if (search === ``) {
    return -1;
  }
  return str.indexOf(search, indexStart);
};

module.exports = { _indexOfFirst };
