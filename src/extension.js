const vscode = require('vscode');

const {
  registerCommand,
  getEditor,
  commandQuickPick,

  _insertTextSelected,
  getSelectedText,
} = require(`./lib/libVSCode.js`);

const {
  _Year,
  _Month,
  _Day,
  _subLastDelimLast,
  _subLastDelimFirst,
} = require(`./parts/parts.js`);

const {
  equalMonth,
  equalDate,
  equalToday,
  monthDayCount,
  dateToStringJp,
} = require(`./lib/libDate.js`);

// This Application
const insertBuffer = {
  text: ``,
  formatIndex: -1,
  dateType: ``,
  date: new Date(),
}

const getDateFormatArray = (formatType) => {
  if (!([`DateFormat`, `DateTimeFormat`, `TimeFormat`].includes(formatType))) {
    throw new Error(`getFormatArray formatType`);
  }
  const formatData = vscode.workspace
    .getConfiguration(`SmartInsertDate`).get(formatType);
  return formatData.map(item => item.format);
};

const getMenuDateTime = () => {
  const menuData = vscode.workspace
    .getConfiguration(`SmartInsertDate`).get(`MenuDateTime`);
  return menuData;
}

const getMenuDate = () => {
  const menuData = vscode.workspace
    .getConfiguration(`SmartInsertDate`).get(`MenuDate`);
  return menuData;
}

const createDateToString = () => {

  const dayOfWeekKeys = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const dayOfWeekCustomNamesShort = [];
  const customDayOfWeekShort = vscode.workspace
    .getConfiguration(`SmartInsertDate`).get(`CustomDayOfWeekShort`)
  for (const key of dayOfWeekKeys) {
    dayOfWeekCustomNamesShort.push(customDayOfWeekShort[key] ?? ``);
  }

  const dayOfWeekCustomNamesLong = [];
  const customDayOfWeekLong = vscode.workspace
    .getConfiguration(`SmartInsertDate`).get(`CustomDayOfWeekLong`)
  for (const key of dayOfWeekKeys) {
    dayOfWeekCustomNamesLong.push(customDayOfWeekLong[key] ?? ``);
  }

  const ampmCustomNamesShort = [];
  const customAmPmShort = vscode.workspace
    .getConfiguration(`SmartInsertDate`).get(`CustomAmPmShort`)
  ampmCustomNamesShort[0] = customAmPmShort?.am ?? ``;
  ampmCustomNamesShort[1] = customAmPmShort?.pm ?? ``;

  const ampmCustomNamesLong = [];
  const customAmPmLong = vscode.workspace
    .getConfiguration(`SmartInsertDate`).get(`CustomAmPmLong`)
  ampmCustomNamesLong[0] = customAmPmLong?.am ?? ``;
  ampmCustomNamesLong[1] = customAmPmLong?.pm ?? ``;

  return (date, format) => {
    return dateToStringJp(
      date,
      format,
      dayOfWeekCustomNamesShort,
      dayOfWeekCustomNamesLong,
      ampmCustomNamesShort,
      ampmCustomNamesLong,
    );
  };
}

function activate(context) {

  const dateToString = createDateToString();

  const writeBuffer = ({dateType, date, formatIndex, text}) => {
    insertBuffer.dateType = dateType;
    insertBuffer.date = date;
    insertBuffer.formatIndex = formatIndex;
    insertBuffer.text = text;
  }

  const _insertDateTimeBuffer = (dateType, date, formatIndex, format) => {
    const editor = getEditor(); if (!editor) { return; }
    _insertTextSelected(editor, (index) => {
      let text;
      if (index === 0) {
        text = dateToString(date, format);
        writeBuffer({dateType, date, formatIndex, text})
      } else {
        const _date = new Date(date.getTime());
        _date.setDate(_date.getDate() + index);
        text = dateToString(_date, format);
      }
      return text;
    });
  }

  const insertDateTimeBuffer = (dateType) => {
    if (!([`Date`, `DateTime`, `Time`].includes(dateType))) {
      throw new Error(`insertDateTimeBuffer Command insertType`);
    }
    const editor = getEditor(); if (!editor) { return; }
    const dateFormatArray = getDateFormatArray(`${dateType}Format`);
    if (dateFormatArray.length === 0) { return; }

    const selectedText = getSelectedText(editor)[0] ?? ``;

    let formatIndex = 0;
    let date = new Date();
    if (
      insertBuffer.dateType === dateType
      && insertBuffer.text === selectedText
    ) {
      formatIndex = insertBuffer.formatIndex + 1;
      if (dateFormatArray.length === formatIndex) {
        formatIndex = 0;
      }
      date = insertBuffer.date;
    }

    _insertDateTimeBuffer(
      dateType, date, formatIndex,
      dateFormatArray[formatIndex]
    )
  }

  registerCommand(context,
    `vscode-smart-insert-date.Today`,
    () => { insertDateTimeBuffer(`Date`); }
  );

  registerCommand(context,
    `vscode-smart-insert-date.NowDateTime`,
    () => { insertDateTimeBuffer(`DateTime`); }
  );

  registerCommand(context,
    `vscode-smart-insert-date.NowTime`,
    () => { insertDateTimeBuffer(`Time`); }
  );

  const selectFormatRootCommand = (targetDate, placeHolder, dateType) => {
    let dateTypes;
    if (dateType === `Date`) {
      dateTypes = [`Date`];
    } else if (dateType === `DateTime`) {
      dateTypes = [`Date`, `DateTime`, `Time`]
    } else {
      throw new Error(`selectFormatRootCommand dateType:${dateType}`);
    }

    const commands = [];
    for (const type of dateTypes) {
      const formats = getDateFormatArray(`${type}Format`);
      if (formats.length !== 0) {
        commands.push(
          {label: type, kind: vscode.QuickPickItemKind.Separator}
        );
      }
      for (const [index, format] of formats.entries()) {
        commands.push({
          label: dateToString(targetDate, format),
          description: ``,
          func: () => { _insertDateTimeBuffer(type, targetDate, index, format); }
        });
      }
    }
    commandQuickPick(
      commands,
      placeHolder
    );
  };

  const selectFormatMenu = (menuItems, targetDate, placeHolder, dateType) => {
    if (![`Date`, `DateTime`].includes(dateType)) {
      throw new Error(`selectFormatMenu dateType:${dateType}`);
    }

    const commands = [];
    for (const menuItem of menuItems) {
      if (menuItem.visible === false) { continue; }
      if (menuItem.separator === true) {
        commands.push({
          label: menuItem.label,
          kind: vscode.QuickPickItemKind.Separator,
        });
      } else if (menuItem.format) {
        const label = dateToString(targetDate,
          menuItem.label ?? menuItem.format
        );
        commands.push({
          label,
          description: ``,
          func: () => {
            _insertDateTimeBuffer(dateType, targetDate, -1, menuItem.format);
          }
        });
      } else if (Array.isArray(menuItem.items)) {
        const label = dateToString(targetDate,
          menuItem.label ?? ''
        );
        commands.push({
          label,
          description: '>>',
          func: () => {
            selectFormatMenu(
              menuItem.items,
              targetDate,
              `${_subLastDelimLast(placeHolder, ` : `)} : ${label}`,
              dateType
            );
          }
        })
      } else if (menuItem.items === `RootCommands`) {
        const label = dateToString(targetDate,
          menuItem.label ?? ''
        );
        commands.push({
          label,
          description: '>>',
          func: () => {
            selectFormatRootCommand(
              targetDate,
              `${_subLastDelimFirst(placeHolder, ` : `)} : ${label}`,
              dateType,
            );
          }
        })
      }
    }
    commandQuickPick(
      commands,
      placeHolder
    );
  };

  registerCommand(context,
    `vscode-smart-insert-date.SelectFormat`,
    () => {
      selectFormatMenu(
        getMenuDateTime(),
        new Date(),
        `Smart Insert Date : Select Format`,
        `DateTime`,
      );
    }
  );

  const selectDate = () => {
    const dateThisYear = _Year(`this`);
    const dateLastYear = _Year(-1, dateThisYear);
    const dateNextYear = _Year(+1, dateThisYear);

    const dateThisMonth = _Month(`this`);
    const dateLastMonth = _Month(-1, dateThisMonth);
    const dateNextMonth = _Month(+1, dateThisMonth);

    const today = _Day(`today`);
    const yesterday = _Day(`yesterday`);
    const tomorrow = _Day(`tomorrow`);
    const dateLastWeekStart = _Day(-today.getDay() - 7, today);
    const dateNextWeekEnd = _Day(-today.getDay() + 14 - 1, today);

    commandQuickPick([
      {
        label: `Today : `
        + `${dateToString(today, `YYYY-MM-DD`)}`
        ,
        func: () => {
          selectFormatMenu(
            getMenuDate(),
            today,
            `Smart Insert Date : Select Date : ` +
            `${dateToString(today, `YYYY-MM-DD ddd`)}`,
            `Date`,
          );
        }
      },
      {
        label: `-1 Day : Yesterday : `
        + `${dateToString(yesterday, `YYYY-MM-DD`)}`
        ,
        func: () => {
          selectFormatMenu(
            getMenuDate(),
            yesterday,
            `Smart Insert Date : Select Date : ` +
            `${dateToString(yesterday, `YYYY-MM-DD ddd`)}`,
            `Date`,
          );
        }
      },
      {
        label: `+1 Day : Tomorrow : `
        + `${dateToString(tomorrow, `YYYY-MM-DD`)}`
        ,
        func: () => {
          selectFormatMenu(
            getMenuDate(),
            tomorrow,
            `Smart Insert Date : Select Date : ` +
            `${dateToString(tomorrow, `YYYY-MM-DD ddd`)}`,
            `Date`,
          );
        }
      },
      {label: ``, kind: vscode.QuickPickItemKind.Separator},
      {
        label: `Last Week To Next Week : `
        + `${dateToString(dateLastWeekStart, `YYYY-MM-DD`)}`
        + ` _ ${dateToString(dateNextWeekEnd, `YYYY-MM-DD`)}`
        ,
        description: `▸`,
        func: () => { selectDateInDays(dateLastWeekStart, + 21); }
      },
      {label: ``, kind: vscode.QuickPickItemKind.Separator},
      {
        label: `This Month : `
        + `${dateToString(dateThisMonth, `YYYY-MM : MMM`)}`,
        description: `▸`,
        func: () => { selectDateInMonth(dateThisMonth); }
      },
      {
        label: `-1 Month : Last Month : `
        + `${dateToString(dateLastMonth, `YYYY-MM : MMM`)}`,
        description: `▸`,
        func: () => { selectDateInMonth(dateLastMonth); }
      },
      {
        label: `+1 Month : Next Month : `
        + `${dateToString(dateNextMonth, `YYYY-MM : MMM`)}`,
        description: `▸`,
        func: () => { selectDateInMonth(dateNextMonth); }
      },
      {label: ``, kind: vscode.QuickPickItemKind.Separator},
      {
        label: `This Year : ${dateThisYear.getFullYear()}`,
        description: `▸`,
        func: () => { selectMonth(dateThisYear); }
      },
      {
        label: `-1 Year : Last Year : ${dateLastYear.getFullYear()}`,
        description: `▸`,
        func: () => { selectMonth(dateLastYear); }
      },
      {
        label: `+1 Year : Next Year : ${dateNextYear.getFullYear()}`,
        description: `▸`,
        func: () => { selectMonth(dateNextYear); }
      },
      {label: ``, kind: vscode.QuickPickItemKind.Separator},
      {
        label: `Select Year range -100 to +100`,
        description: `▸`,
        func: () => { selectDateRange200Year(); }
      },
    ], `Smart Insert Date : Select Date`);
  }

  const selectDateRange200Year = () => {

    const dateThisYear = _Year(`this`);
    const dateLastYear = _Year(-1, dateThisYear);
    const dateNextYear = _Year(+1, dateThisYear);

    const yearThis = dateThisYear.getFullYear();
    commandQuickPick([
      {
        label: `${yearThis - 100} - ${yearThis - 10 - 1} : 100 year before`,
        description: `▸`,
        func: () => { selectTenYear(_Year(-100, dateThisYear)); }
      },
      {
        label: `${yearThis - 10} - ${yearThis - 2} : 10 year before`,
        description: `▸`,
        func: () => { selectOneYear(_Year(-10, dateThisYear), 9); }
      },
      {
        label: `${yearThis - 1} : Last year`,
        description: `▸`,
        func: () => { selectMonth(dateLastYear); }
      },
      {
        label: `${yearThis} : This year`,
        description: `▸`,
        func: () => { selectMonth(dateThisYear); }
      },
      {
        label: `${yearThis + 1} : Next year`,
        description: `▸`,
        func: () => { selectMonth(dateNextYear); }
      },
      {
        label: `${yearThis + 2} - ${yearThis + 10} : 10 year after`,
        description: `▸`,
        func: () => { selectOneYear(_Year(2, dateThisYear), 9); }
      },
      {
        label: `${yearThis + 10 + 1} - ${yearThis + 100} : 100 year after`,
        description: `▸`,
        func: () => { selectTenYear(_Year(11, dateThisYear)); }
      },
    ], `Smart Insert Date : Select Date : Select Year range -100 to +100`);
  }

  const selectTenYear = (dateYear) => {
    const commands = [];
    for (let i = 0; i <= 8; i += 1) {
      const targetDate = _Year(i * 10, dateYear);
      commands.push({
        label: `${dateToString(targetDate, `YYYY`)} - ${dateToString(_Year(9, targetDate), `YYYY`)}`,
        description: `▸`,
        func: () => { selectOneYear(targetDate, 10); },
      });
    }
    commandQuickPick(commands,
      `Smart Insert Date : Select Date : ` +
      `${dateToString(dateYear, `YYYY`)} - ${dateToString(_Year(89, dateYear), `YYYY`)}`);
  };

  const selectOneYear = (dateYear, count) => {
    const commands = [];
    for (let i = 0; i <= count - 1; i += 1) {
      const targetDate = _Year(i, dateYear);
      commands.push({
        label: dateToString(targetDate, `YYYY`),
        description: `▸`,
        func: () => { selectMonth(targetDate); },
      });
    }
    commandQuickPick(commands,
      `Smart Insert Date : Select Date : ` +
      `${dateToString(dateYear, `YYYY`)} - ${dateToString(_Year(9, dateYear), `YYYY`)}`);
  };

  const selectMonth = (dateYear) => {
    const commands = [];
    for (let i = 1; i <= 12; i += 1) {
      const targetDate = _Month(i - 1, dateYear);
      const isThisMonth = equalMonth(targetDate, _Month(`this`));
      commands.push({
        label: dateToString(targetDate, `MM : YYYY-MM : MMM`) +
        (isThisMonth ? ` : This month` : ``),
        description: `▸`,
        func: () => {
          selectDateInMonth(targetDate);
        },
      });
    }
    commandQuickPick(commands,
      `Smart Insert Date : Select Date : ` +
      `${dateYear.getFullYear()}`);
  };

  const selectDateInMonth = (dateMonth) => {
    const commands = [];
    const monthDaysCount = monthDayCount(dateMonth);
    for (let i = 1; i <= monthDaysCount; i += 1) {
      const targetDate = _Day(i - 1, dateMonth);
      const isYesterday = equalDate(targetDate, _Day(-1));
      const isToday = equalToday(targetDate);
      const isTomorrow = equalDate(targetDate, _Day(1));
      commands.push({
        label:
          dateToString(targetDate, `DD : YYYY-MM-DD ddd`) +
          (isYesterday ? ` : Yesterday`
            : isToday ? ` : Today`
              : isTomorrow ? ` : Tomorrow`
                : ``),
        description: `▸`,
        func: () => {
          selectFormatMenu(
            getMenuDate(),
            targetDate,
            `Smart Insert Date : Select Date : ` +
            `${dateToString(targetDate, `YYYY-MM-DD ddd`)}`,
            `Date`,
          );
        }
      });
    }
    commandQuickPick(commands,
      `Smart Insert Date : Select Date : ` +
      `${dateToString(dateMonth, `YYYY-MM`)}`
    );
  };

  const selectDateInDays = (dateStart, dateCount) => {
    const commands = [];
    for (let i = 0; i <= dateCount - 1; i += 1) {
      const targetDate = _Day(i, dateStart);
      const isYesterday = equalDate(targetDate, _Day(`yesterday`));
      const isToday = equalToday(targetDate, _Day(`today`));
      const isTomorrow = equalDate(targetDate, _Day(`tomorrow`));
      commands.push({
        label:
          dateToString(targetDate, `DD : YYYY-MM-DD ddd`) + (
            isYesterday ? ` : Yesterday`
            : isToday ? ` : Today`
            : isTomorrow ? ` : Tomorrow`
            : ``
          ),
        description: `▸`,
        func: () => {
          selectFormatMenu(
            getMenuDate(),
            targetDate,
            `Smart Insert Date : Select Date : ` +
            `${dateToString(targetDate, `YYYY-MM-DD ddd`)}`,
            `Date`,
          );
        }
      });
    }

    commandQuickPick(commands,
      `Smart Insert Date : Select Date : ` +
      `${dateToString(dateStart, `YYYY-MM`)}`
    );
  };

  registerCommand(context,
    `vscode-smart-insert-date.SelectDate`,
    () => { selectDate(); }
  );

}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
