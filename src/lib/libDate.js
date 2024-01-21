const {
  _dateToString,
  _dayOfWeek,
  _nameOfMonth,
  _Month,
  _Day,
  _Datetime,
  _getDatetime,
  _unique,
  _subFirst,
  _paddingFirst, _paddingLast,
} = require(`../parts/parts.js`);

const dayOfWeekEn2 = (date, timezoneOffset) => {
  return _subFirst(_dayOfWeek.names.EnglishShort()[
    _dateToString.rule.dayOfWeek(date, timezoneOffset)
  ], 2);
};

const date2Space = (date, timezoneOffset) => {
  return _paddingFirst(_dateToString.rule.date1(date, timezoneOffset), 2, ` `);
};

const month2Space = (date, timezoneOffset) => {
  return _paddingFirst(_dateToString.rule.month1(date, timezoneOffset), 2, ` `);
};

const monthEnLongLeft = (date, timezoneOffset) => {
  return _paddingLast(_nameOfMonth.names.EnglishLong()[
    _dateToString.rule.month(date, timezoneOffset)
  ], 9, ` `);
};

const monthEnLongRight = (date, timezoneOffset) => {
  return _paddingFirst(_nameOfMonth.names.EnglishLong()[
    _dateToString.rule.month(date, timezoneOffset)
  ], 9, ` `);
};

const japaneseCalenderYear = (date) => {
  const result = {};
  const reiwaStart = _Datetime(2019, 5, 1);
  const heiseiStart = _Datetime(1989,  1,  8);
  const shouwaStart = _Datetime(1926, 12, 25);
  const taishoStart = _Datetime(1912,  7, 30);
  const meijiStart  = _Datetime(1868,  9,  8);
  if (reiwaStart <= date) {
    result.gengoLong = '令和';
    result.gengoShort = '令';
    result.gengoAlphabet = 'R';
    result.year = (date.getFullYear() - reiwaStart.getFullYear() + 1);
  } else if (heiseiStart <= date) {
    result.gengoLong = '平成';
    result.gengoShort = '平';
    result.gengoAlphabet = 'H';
    result.year = (date.getFullYear() - heiseiStart.getFullYear() + 1);
  } else if (shouwaStart <= date) {
    result.gengoLong = '昭和';
    result.gengoShort = '昭';
    result.gengoAlphabet = 'S';
    result.year = (date.getFullYear() - shouwaStart.getFullYear() + 1);
  } else if (taishoStart <= date) {
    result.gengoLong = '大正';
    result.gengoShort = '大';
    result.gengoAlphabet = 'T';
    result.year = (date.getFullYear() - taishoStart.getFullYear() + 1);
  } else if (meijiStart <= date) {
    result.gengoLong = '明治';
    result.gengoShort = '明';
    result.gengoAlphabet = 'M';
    result.year = (date.getFullYear() - meijiStart.getFullYear() + 1);
  } else {
    result.gengoLong = '';
    result.gengoShort = '';
    result.gengoAlphabet = '';
    result.year = date.getFullYear();
  }
  return result;
};

const dateToStringJp = (date, format,
  dayOfWeekCustomNamesShort,
  dayOfWeekCustomNamesLong,
  ampmCustomNamesShort,
  ampmCustomNamesLong,
) => {
  const rule = _dateToString.rule.Default();
  rule[`dd`] = { func: dayOfWeekEn2 };
  rule[`SD`] = { func: date2Space };
  rule[`SM`] = { func: month2Space };
  rule[`LMMMMM`] = { func: monthEnLongLeft };
  rule[`RMMMMM`] = { func: monthEnLongRight };
  rule[`DDD`] = {
    func: (date, timezoneOffset) => dayOfWeekCustomNamesShort[
      _dateToString.rule.dayOfWeek(date, timezoneOffset)
    ]
  };
  rule[`DDDD`] = {
    func: (date, timezoneOffset) => dayOfWeekCustomNamesLong[
      _dateToString.rule.dayOfWeek(date, timezoneOffset)
    ]
  };
  rule[`AAAA`] = {
    func: (date, timezoneOffset) =>
      _dateToString.rule.hours(date, timezoneOffset) < 12
        ? ampmCustomNamesLong[0]
        : ampmCustomNamesLong[1]
  };
  rule[`AAA`] = {
    func: (date, timezoneOffset) =>
      _dateToString.rule.hours(date, timezoneOffset) < 12
        ? ampmCustomNamesShort[0]
        : ampmCustomNamesShort[1]
  };
  rule[`GGG`] = {
    func: (date) => {
      return japaneseCalenderYear(date).gengoLong;
    }
  };
  rule[`GG`] = {
    func: (date) => {
      return japaneseCalenderYear(date).gengoShort;
    }
  };
  rule[`G`] = {
    func: (date) => {
      return japaneseCalenderYear(date).gengoAlphabet;
    }
  };
  rule[`EE`] = {
    func: (date) => {
      return _paddingFirst(japaneseCalenderYear(date).year.toString(), 2, `0`);
    }
  };
  rule[`E`] = {
    func: (date) => {
      return japaneseCalenderYear(date).year.toString();
    }
  };

  return _dateToString(
    date, format, undefined, rule,
  );
};

const getBeforeDate = (sourceDate, func) => {
  let date = _Day(-1, sourceDate);
  while (true) {
    if (func(date)) {
      return date;
    }
    date = _Day(-1, date);
  }
};

const getBeforeDayOfWeek = (sourceDate, dayOfWeek) => {
  return getBeforeDate(_Day(1, sourceDate), (date) => {
    return date.getDay() === dayOfWeek;
  });
};

const getDateArrayInWeek = (sourceDate, startDayOfWeek) => {
  if (![`Sun`, `Mon`].includes(startDayOfWeek)) {
    throw new Error(`getDateArrayInWeek startDayOfWeek`);
  }
  const result = [];
  const startDate = getBeforeDayOfWeek(
    sourceDate, _dayOfWeek.names.EnglishShort().indexOf(startDayOfWeek)
  );
  result.push(startDate);
  result.push(_Day(1, startDate));
  result.push(_Day(2, startDate));
  result.push(_Day(3, startDate));
  result.push(_Day(4, startDate));
  result.push(_Day(5, startDate));
  result.push(_Day(6, startDate));
  return result;
};

const getDateArrayInMonth = (sourceDate) => {
  const result = [];
  const startDate = _Month(`this`, sourceDate);
  const endDate = _Day(-1, _Month(`next`, sourceDate));
  const {date: dayCount} = _getDatetime(endDate);
  for (let i = 0; i < dayCount; i += 1) {
    result.push(_Day(i, startDate));
  }
  return result;
};

const getDateArrayWeeklyMonth = (sourceDate, startDayOfWeek) => {
  const dateStart = _Month(`this`, sourceDate);
  const dateEnd = _Day(-1, _Month(`next`, dateStart));
  return _unique(
    [
      ...getDateArrayInWeek(dateStart, startDayOfWeek),
      ...getDateArrayInMonth(dateStart),
      ...getDateArrayInWeek(dateEnd, startDayOfWeek),
    ],
    v => v.getTime()
  );
};

const equalDatetime = (sourceDate, targetDate, compareItems) => {
  if (!compareItems.every(
    i => [
      `year`, `month`, `date`, `hours`, `minutes`, `seconds`, `milliseconds`
    ].includes(i)
  )) {
    throw new Error(`equalDate compareItems:${compareItems}`);
  }
  const source = _getDatetime(sourceDate);
  const target = _getDatetime(targetDate);
  return compareItems.every(i => source[i] === target[i]);
};


const equalMonth = (sourceDate, baseDate) => {
  return equalDatetime(sourceDate, baseDate, [`year`, `month`]);
};

const equalDate = (sourceDate, baseDate) => {
  return equalDatetime(sourceDate, baseDate, [`year`, `month`, `date`]);
};

const equalToday = (sourceDate) => {
  return equalDate(sourceDate, new Date());
};

const monthDayCount = (date) => {
  const {year, month } = _getDatetime(date);
  const target = _Datetime(year, month + 1, 1);
  return _getDatetime(_Day(-1, target)).date;
};

module.exports = {
  equalMonth,
  equalDate,
  equalToday,
  monthDayCount,
  dateToStringJp,
  getDateArrayWeeklyMonth,
};
