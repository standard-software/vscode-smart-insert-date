const { __monthNames } = require(`../date/__monthNames.js`);

const _nameOfMonth = (
  date,
  isLocal = true,
  monthNames = __monthNames.EnglishChar3(),
) => {
  if (isLocal) {
    return monthNames[date.getMonth()];
  } else {
    return monthNames[date.getUTCMonth()];
  }
};

_nameOfMonth.names = __monthNames;

module.exports = { _nameOfMonth };
