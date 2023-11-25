const vscode = require('vscode');

const {
  isUndefined,
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
  getDateArrayWeeklyMonth,
  textCalendarLineVertical,
  textCalendarMonthly,
} = require(`./lib/lib.js`);

let insertTextBuffer = ``;
let insertDateFormatIndexBuffer = -1;
let insertTypeBuffer = ``;

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

const getDateFormatArray = (formatName) => {
  if (!([`DateFormat`, `DateTimeFormat`, `TimeFormat`].includes(formatName))) {
    throw new Error(`getFormatArray formatName`);
  }
  const formatData = vscode.workspace.getConfiguration(`SmartInsertDate`).get(formatName);
  return formatData.map(item => item.format);
};

function activate(context) {

  registerCommand(context, `vscode-smart-insert-date.Today`, () => {
    const editor = getEditor(); if (!editor) { return; }

    const dateFormatArray = getDateFormatArray(`DateFormat`);

    const selectedText = getSelectedText(editor)[0] ?? ``;

    if (
      insertTypeBuffer === `Date`
      && insertTextBuffer === selectedText
    ) {
      insertDateFormatIndexBuffer += 1;
      if (dateFormatArray.length === insertDateFormatIndexBuffer) {
        insertDateFormatIndexBuffer = 0;
      }
    } else {
      insertDateFormatIndexBuffer = 0;
    }

    insertTypeBuffer = `Date`;
    insertTextBuffer = dateToStringJp(new Date(), dateFormatArray[insertDateFormatIndexBuffer]);
    insertText(editor, insertTextBuffer);
  });

  registerCommand(context, `vscode-smart-insert-date.NowDateTime`, () => {
    const editor = getEditor(); if (!editor) { return; }

    const dateFormatArray = getDateFormatArray(`DateTimeFormat`);

    const selectedText = getSelectedText(editor)[0] ?? ``;
    if (
      insertTypeBuffer === `DateTime`
      && insertTextBuffer === selectedText
    ) {
      insertDateFormatIndexBuffer += 1;
      if (dateFormatArray.length === insertDateFormatIndexBuffer) {
        insertDateFormatIndexBuffer = 0;
      }
    } else {
      insertDateFormatIndexBuffer = 0;
    }

    insertTypeBuffer = `DateTime`;
    insertTextBuffer = dateToStringJp(new Date(), dateFormatArray[insertDateFormatIndexBuffer]);
    insertText(editor, insertTextBuffer);
  });

  registerCommand(context, `vscode-smart-insert-date.NowTime`, () => {
    const editor = getEditor(); if (!editor) { return; }

    const dateFormatArray = getDateFormatArray(`TimeFormat`);

    const selectedText = getSelectedText(editor)[0] ?? ``;
    if (
      insertTypeBuffer === `Time`
      && insertTextBuffer === selectedText
    ) {
      insertDateFormatIndexBuffer += 1;
      if (dateFormatArray.length === insertDateFormatIndexBuffer) {
        insertDateFormatIndexBuffer = 0;
      }
    } else {
      insertDateFormatIndexBuffer = 0;
    }

    insertTypeBuffer = `Time`;
    insertTextBuffer = dateToStringJp(new Date(), dateFormatArray[insertDateFormatIndexBuffer]);
    insertText(editor, insertTextBuffer);
  });

}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
