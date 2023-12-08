const vscode = require('vscode');

// const {
//   // isUndefined,
//   // _dateToString,
//   // _Year,
//   // _Month,
//   // _Day,
// } = require(`./parts/parts.js`);

const {
  // equalMonth,
  // equalDate,
  // equalToday,
  // monthDayCount,
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
  const formatData = vscode.workspace.getConfiguration(`SmartInsertDate`).get(formatType);
  return formatData.map(item => item.format);
};

function activate(context) {

  const _insertDateTime = (dateType, date, formatIndex, format) => {
    const editor = getEditor(); if (!editor) { return; }
    insertBuffer.dateType = dateType;
    insertBuffer.date = date;
    insertBuffer.formatIndex = formatIndex;

    insertBuffer.text = dateToStringJp(
      insertBuffer.date,
      format
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

  const selectFormat = (targetDate) => {
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
          label: dateToStringJp(targetDate, format),
          description: ``,
          func: () => { _insertDateTime(dateType, targetDate, index, format); }
        });
      }
    }
    commandQuickPick(
      commands,
      `Smart Insert Date | Insert Today,Now | Select Format`
    );
  };

  registerCommand(context, `vscode-smart-insert-date.SelectFormat`, () => {
    selectFormat(new Date());
  });



}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
