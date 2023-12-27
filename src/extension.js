const vscode = require('vscode');

const {
  // isUndefined,
  _dateToString,
  _Year,
  _Month,
  _Day,
} = require(`./parts/parts.js`);

const {
  equalMonth,
  equalDate,
  equalToday,
  monthDayCount,
  dateToStringJp,
} = require(`./lib/lib.js`);

// editor.selections
const equalSelectionItem = (itemA, itemB) => {
  if (
    itemA.line === itemB.line
    && itemA.character === itemB.character
  ) {
    return true;
  }
  return false;
}

const insertTextUnSelect = (editor, str) => {
  editor.edit(editBuilder => {
    for (const selection of editor.selections) {
      editBuilder.replace(selection, ``);
      editBuilder.insert(selection.active, str);
    }
  });
};

const insertText = (editor, str) => {
  const updateSelections = [];
  editor.edit(editBuilder => {
    for (const selection of editor.selections) {
      if (equalSelectionItem(selection.start, selection.end)) {
        editBuilder.replace(selection, str);
        updateSelections.push(true);
      } else {
        editBuilder.replace(selection, str);
        updateSelections.push(false);
      }
    }
  }).then(() => {
    if (updateSelections.some(v=>v)) {
      const newSelections = [...editor.selections];
      for (const [i, update] of updateSelections.entries()) {
        if (update) {
          newSelections[i] =
          new vscode.Selection(
            editor.selections[i].start.line,
            editor.selections[i].start.character - str.length,
            editor.selections[i].end.line,
            editor.selections[i].end.character,
          );
        }
      }
      editor.selections = newSelections;
    }
  });
};

const getSelectedText = (editor) => {
  const result = [];
  for (let selection of editor.selections) {
    const text = editor.document.getText(selection);
    result.push(text);
  };
  return result;
}

// VSCode
const registerCommand = (context, commandName, func) => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      commandName, func
    )
  );
};

const getEditor = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage(`No editor is active`);
    return;
  }
  return editor;
}

const commandQuickPick = (commands, placeHolder) => {
  // const commands = commandsArray.map(c => ({label:c[0], description:c[1], func:c[2]}));
  // command = [
  //   {label:``, description:``, func: ()=>{}},
  //   {label:``, kind:vscode.QuickPickItemKind.Separator}
  // ]
  vscode.window.showQuickPick(
    commands.map(({func, ...command}) => (command)),
    {
      canPickMany: false,
      placeHolder
    }
  ).then((item) => {
    if (!item) { return; }
    commands.find(({label}) => label === item.label).func();
  });
};

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

function activate(context) {

  const _insertDateTime = (dateType, date, formatIndex, format) => {
    const editor = getEditor(); if (!editor) { return; }
    insertBuffer.dateType = dateType;
    insertBuffer.date = date;
    insertBuffer.formatIndex = formatIndex;

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
    console.log(`customAmPmShort`, customAmPmShort)
    ampmCustomNamesShort[0] = customAmPmShort?.am ?? ``;
    ampmCustomNamesShort[1] = customAmPmShort?.pm ?? ``;

    const ampmCustomNamesLong = [];
    const customAmPmLong = vscode.workspace
      .getConfiguration(`SmartInsertDate`).get(`CustomAmPmLong`)
    ampmCustomNamesLong[0] = customAmPmLong?.am ?? ``;
    ampmCustomNamesLong[1] = customAmPmLong?.pm ?? ``;

    insertBuffer.text = dateToStringJp(
      insertBuffer.date,
      format,
      dayOfWeekCustomNamesShort,
      dayOfWeekCustomNamesLong,
      ampmCustomNamesShort,
      ampmCustomNamesLong,
    );
    insertText(editor, insertBuffer.text);
  }

  const insertDateTime = (dateType) => {
    if (!([`Date`, `DateTime`, `Time`].includes(dateType))) {
      throw new Error(`insertDateTimeCommand insertType`);
    }
    const editor = getEditor(); if (!editor) { return; }
    const dateFormatArray = getDateFormatArray(`${dateType}Format`);
    if (dateFormatArray.length === 0) { return; }

    const selectedText = getSelectedText(editor)[0] ?? ``;
    if (
      insertBuffer.dateType === dateType
      && insertBuffer.text === selectedText
    ) {
      insertBuffer.formatIndex += 1;
      if (dateFormatArray.length === insertBuffer.formatIndex) {
        insertBuffer.formatIndex = 0;
      }
    } else {
      insertBuffer.formatIndex = 0;
      insertBuffer.date = new Date();
    }

    _insertDateTime(
      dateType, insertBuffer.date, insertBuffer.formatIndex,
      dateFormatArray[insertBuffer.formatIndex]
    )
  }

  registerCommand(context, `vscode-smart-insert-date.Today`, () => {
    insertDateTime(`Date`);
  });

  registerCommand(context, `vscode-smart-insert-date.NowDateTime`, () => {
    insertDateTime(`DateTime`);
  });

  registerCommand(context, `vscode-smart-insert-date.NowTime`, () => {
    insertDateTime(`Time`);
  });

  const selectFormat = (targetDate, placeHolder) => {
    const commands = [];
    for (const dateType of [`Date`, `DateTime`, `Time`]) {
      const formats = getDateFormatArray(`${dateType}Format`);
      if (formats.length !== 0) {
        commands.push(
          {label: dateType, kind: vscode.QuickPickItemKind.Separator}
        );
      }
      for (const [index, format] of formats.entries()) {
        commands.push({
          label: _dateToString(targetDate, format),
          description: ``,
          func: () => { _insertDateTime(dateType, targetDate, index, format); }
        });
      }
    }
    commandQuickPick(
      commands,
      placeHolder
    );
  };

  registerCommand(context, `vscode-smart-insert-date.SelectFormat`, () => {
    selectFormat(new Date(), `Smart Insert Date | Select Format`);
  });

  const selectDate = () => {
    const dateThisYear = _Year(`this`);
    const dateLastYear = _Year(-1, dateThisYear);
    const dateNextYear = _Year(+1, dateThisYear);

    const dateThisMonth = _Month(`this`);
    const dateLastMonth = _Month(-1, dateThisMonth);
    const dateNextMonth = _Month(+1, dateThisMonth);

    const today = _Day(`today`)
    const dateThisWeek = _Day(-today.getDay(), today);
    const dateLastWeek = _Day(-today.getDay() - 7, today);
    const dateNextWeek = _Day(-today.getDay() + 7, today);

    commandQuickPick([
      {
        label: `This Week | `
        + `${_dateToString(dateThisWeek, `YYYY-MM-DD`)}`,
        description: `▸`,
        func: () => { selectDateInWeek(dateThisWeek); }
      },
      {
        label: `-1 Week | Last Week | `
        + `${_dateToString(dateLastWeek, `YYYY-MM-DD`)}`,
        description: `▸`,
        func: () => { selectDateInWeek(dateLastWeek); }
      },
      {
        label: `+1 Week | Next Week | `
        + `${_dateToString(dateNextWeek, `YYYY-MM-DD`)}`,
        description: `▸`,
        func: () => { selectDateInWeek(dateNextWeek); }
      },
      {label: ``, kind: vscode.QuickPickItemKind.Separator},
      {
        label: `This Month | `
        + `${_dateToString(dateThisMonth, `YYYY-MM : MMM`)}`,
        description: `▸`,
        func: () => { selectDateInMonth(dateThisMonth); }
      },
      {
        label: `-1 Month | Last Month | `
        + `${_dateToString(dateLastMonth, `YYYY-MM : MMM`)}`,
        description: `▸`,
        func: () => { selectDateInMonth(dateLastMonth); }
      },
      {
        label: `+1 Month | Next Month | `
        + `${_dateToString(dateNextMonth, `YYYY-MM : MMM`)}`,
        description: `▸`,
        func: () => { selectDateInMonth(dateNextMonth); }
      },
      {label: ``, kind: vscode.QuickPickItemKind.Separator},
      {
        label: `This Year | ${dateThisYear.getFullYear()}`,
        description: `▸`,
        func: () => { selectMonth(dateThisYear); }
      },
      {
        label: `-1 Year | Last Year | ${dateLastYear.getFullYear()}`,
        description: `▸`,
        func: () => { selectMonth(dateLastYear); }
      },
      {
        label: `+1 Year | Next Year | ${dateNextYear.getFullYear()}`,
        description: `▸`,
        func: () => { selectMonth(dateNextYear); }
      },
      {label: ``, kind: vscode.QuickPickItemKind.Separator},
      {
        label: `Select Year range -100 to +100`,
        description: `▸`,
        func: () => { selectDateRange200Year(); }
      },
    ], `Smart Insert Date | Select Date`);
  }

  const selectDateRange200Year = () => {

    const dateThisYear = _Year(`this`);
    const dateLastYear = _Year(-1, dateThisYear);
    const dateNextYear = _Year(+1, dateThisYear);

    const yearThis =  dateThisYear.getFullYear();
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
    ], `Smart Insert Date | Select Date | Select Year range -100 to +100`);
  }

  const selectTenYear = (dateYear) => {
    const commands = [];
    for (let i = 0; i <= 8; i += 1) {
      const targetDate = _Year(i * 10, dateYear);
      commands.push({
        label: `${_dateToString(targetDate, `YYYY`)} - ${_dateToString(_Year(9, targetDate), `YYYY`)}`,
        description: `▸`,
        func: () => { selectOneYear(targetDate, 10); },
      });
    }
    commandQuickPick(commands,
      `Smart Insert Date | Select Date | ` +
      `${_dateToString(dateYear, `YYYY`)} - ${_dateToString(_Year(89, dateYear), `YYYY`)}`);
  };

  const selectOneYear = (dateYear, count) => {
    const commands = [];
    for (let i = 0; i <= count - 1; i += 1) {
      const targetDate = _Year(i, dateYear);
      commands.push({
        label: _dateToString(targetDate, `YYYY`),
        description: `▸`,
        func: () => { selectMonth(targetDate); },
      });
    }
    commandQuickPick(commands,
      `Smart Insert Date | Select Date | ` +
      `${_dateToString(dateYear, `YYYY`)} - ${_dateToString(_Year(9, dateYear), `YYYY`)}`);
  };

  const selectMonth = (dateYear) => {
    const commands = [];
    for (let i = 1; i <= 12; i += 1) {
      const targetDate = _Month(i - 1, dateYear);
      const isThisMonth = equalMonth(targetDate, _Month(`this`));
      commands.push({
        label: _dateToString(targetDate, `MM : YYYY-MM : MMM`) +
        (isThisMonth ? ` : This month` : ``),
        description: `▸`,
        func: () => {
          selectDateInMonth(targetDate);
        },
      });
    }
    commandQuickPick(commands,
      `Smart Insert Date | Select Date | ` +
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
          _dateToString(targetDate, `DD : YYYY-MM-DD ddd`) +
          (isYesterday ? ` : Yesterday`
            : isToday ? ` : Today`
              : isTomorrow ? ` : Tomorrow`
                : ``),
        description: `▸`,
        func: () => {
          selectFormat(
            targetDate,
            `Smart Insert Date | Select Date | ` +
            `${_dateToString(targetDate, `YYYY-MM-DD ddd`)}`
          );
        }
      });
    }
    commandQuickPick(commands,
      `Smart Insert Date | Select Date | ` +
      `${_dateToString(dateMonth, `YYYY-MM`)}`
    );
  };

  const selectDateInWeek = (dateWeekStart) => {
    const commands = [];
    for (let i = 0; i <= 6; i += 1) {
      const targetDate = _Day(i, dateWeekStart);
      const isYesterday = equalDate(targetDate, _Day(`yesterday`));
      const isToday = equalToday(targetDate, _Day(`today`));
      const isTomorrow = equalDate(targetDate, _Day(`tomorrow`));
      commands.push({
        label:
          _dateToString(targetDate, `DD : YYYY-MM-DD ddd`) + (
            isYesterday ? ` : Yesterday`
            : isToday ? ` : Today`
            : isTomorrow ? ` : Tomorrow`
            : ``
          ),
        description: `▸`,
        func: () => {
          selectFormat(
            targetDate,
            `Smart Insert Date | Select Date | ` +
            `${_dateToString(targetDate, `YYYY-MM-DD ddd`)}`
          );
        }
      });
    }

    commandQuickPick(commands,
      `Smart Insert Date | Select Date | ` +
      `${_dateToString(dateWeekStart, `YYYY-MM`)}`
    );
  };

  registerCommand(context, `vscode-smart-insert-date.SelectDate`, () => {
    selectDate();
  });

}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
