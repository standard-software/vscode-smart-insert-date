const {
  _dateToString,
  _dayOfWeek, _nameOfMonth,
  _Month,
  _Day,
  _Datetime,
  _getDatetime,
  _unique,
  _subFirst, _subLast,
  _paddingFirst, _paddingLast,
} = require(`../parts/parts.js`);

const dayOfWeekEn2 = (date, timezoneOffset) => {
  return _subFirst(_dayOfWeek.names.EnglishShort()[
    _dateToString.rule.dayOfWeek(date, timezoneOffset)
  ], 2);
};

const dayOfWeekJpShort = (date, timezoneOffset) => {
  return _dayOfWeek.names.JapaneseShort()[
    _dateToString.rule.dayOfWeek(date, timezoneOffset)
  ];
};

const dayOfWeekJpLong = (date, timezoneOffset) => {
  return _dayOfWeek.names.JapaneseLong()[
    _dateToString.rule.dayOfWeek(date, timezoneOffset)
  ];
};

const am_pmJp = (date, timezoneOffset) => {
  return _dateToString.rule.hours(date, timezoneOffset) < 12 ? `午前` : `午後`;
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

const dateToStringJp = (date, format) => {
  const rule = _dateToString.rule.Default();
  rule[`dd`] = { func: dayOfWeekEn2 };
  rule[`SD`] = { func: date2Space };
  rule[`SM`] = { func: month2Space };
  rule[`LMMMMM`] = { func: monthEnLongLeft };
  rule[`RMMMMM`] = { func: monthEnLongRight };
  rule[`DDD`] = { func: dayOfWeekJpShort };
  rule[`DDDD`] = { func: dayOfWeekJpLong };
  rule[`AAA`] = { func: am_pmJp };
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

const getEndDayOfWeek = (startDayOfWeek) => {
  if (startDayOfWeek === `Sun`) {
    return `Sat`;
  } else if (startDayOfWeek === `Mon`) {
    return `Sun`;
  } else {
    throw new Error(`getEndDayOfWeek startDayOfWeek`);
  }
};

const monthDayCount = (date) => {
  const {year, month } = _getDatetime(date);
  const target = _Datetime(year, month + 1, 1);
  return _getDatetime(_Day(-1, target)).date;
};

const textCalendarLineVertical = (targetDates,{
  pickupDate,
  headerFormat,
  todayFormat,
  lineFormat,
}) => {
  let result = ``;
  let headerBuffer = ``;
  for (const date of targetDates) {
    const header = dateToStringJp(date, headerFormat);
    if (headerBuffer !== header) {
      result += `${header}\n`;
    }
    headerBuffer = header;
    if (pickupDate && equalDate(date, pickupDate)) {
      result += dateToStringJp(date, todayFormat);
    } else {
      result += dateToStringJp(date, lineFormat);
    }
    result += `\n`;
  }
  return result;
};

const textCalendarMonthly = (targetDate,{
  startDayOfWeek,
  pickupDate,
  headerFormat,
  dayOfWeekFormat,
  dateFormat,
  indent,
  space,
  todayLeft,
  todayRight,
  otherMonthDate,
}) => {
  if (![`Sun`, `Mon`].includes(startDayOfWeek)) {
    throw new Error(`textCalendarMonthly startDayOfWeek`);
  }
  const dayOfWeekEnShort = _dayOfWeek.names.EnglishShort();
  const weekEndDayOfWeek = getEndDayOfWeek(startDayOfWeek);

  const dateMonthStart = _Month(`this`, targetDate);
  const dateMonthEnd = _Day(-1, _Month(1, targetDate));

  let result = `${dateToStringJp(dateMonthStart, headerFormat)}\n`;
  const weekDates = getDateArrayInWeek(dateMonthStart, startDayOfWeek);
  const calendarDates = _unique(
    [
      ...weekDates,
      ...getDateArrayInMonth(targetDate),
      ...getDateArrayInWeek(dateMonthEnd, startDayOfWeek),
    ],
    v => v.getTime()
  );

  result += indent;
  for (const date of weekDates) {
    const dayOfWeek = dateToStringJp(date, dayOfWeekFormat);
    if (weekDates.indexOf(date) === weekDates.length - 1) {
      result += dayOfWeek;
    } else {
      result += dayOfWeek + _subLast(space, space.length - (dayOfWeek.length - 2));
    }
  }
  result += `\n`;

  let todayFlag = false;
  for (const date of calendarDates) {
    if (pickupDate && equalDate(date, pickupDate)) {
      if (dayOfWeekEnShort[date.getDay()] === startDayOfWeek) {
        result +=
          _subFirst(indent, indent.length - todayLeft.length) +
          todayLeft +
          dateToStringJp(date, dateFormat) +
          todayRight;
      } else {
        result +=
          _subFirst(space, space.length - todayLeft.length) +
          todayLeft +
          dateToStringJp(date, dateFormat) +
          todayRight;
      }
      todayFlag = true;
    } else if (!otherMonthDate && !equalMonth(date, targetDate)) {
      if (dayOfWeekEnShort[date.getDay()] === startDayOfWeek) {
        result += indent + `  `;
      } else {
        result +=
          (!todayFlag ? space
            : _subLast(space, space.length - todayRight.length)) +
            `  `;
      }
      todayFlag = false;
    } else {
      if (dayOfWeekEnShort[date.getDay()] === startDayOfWeek) {
        result += indent + dateToStringJp(date, dateFormat);
      } else {
        result +=
          (!todayFlag ? space
            : _subLast(space, space.length - todayRight.length)) +
            dateToStringJp(date, dateFormat);
      }
      todayFlag = false;
    }
    if (dayOfWeekEnShort[date.getDay()] === weekEndDayOfWeek) {
      result += `\n`;
    }
  }
  return result;
};

module.exports = {
  equalMonth,
  equalDate,
  equalToday,
  monthDayCount,
  dateToStringJp,
  getDateArrayWeeklyMonth,
  textCalendarLineVertical,
  textCalendarMonthly,
};
