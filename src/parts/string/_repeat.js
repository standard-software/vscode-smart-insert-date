const _repeat = (
  str,
  count,
) => {
  let result = ``;
  for (let i = 0; i < count; i += 1) {
    result += str;
  }
  return result;
};

module.exports = { _repeat };
