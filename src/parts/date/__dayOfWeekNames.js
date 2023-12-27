const __dayOfWeekNames = {};

__dayOfWeekNames.EnglishShort = () => {
  return [
    `Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`,
  ];
};

__dayOfWeekNames.EnglishLong = () => {
  return [
    `Sunday`, `Monday`, `Tuesday`, `Wednesday`,
    `Thursday`, `Friday`, `Saturday`,
  ];
};

module.exports = { __dayOfWeekNames };
