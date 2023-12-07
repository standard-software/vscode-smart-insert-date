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

const getDateFormatArray = (formatType) => {
  if (!([`DateFormat`, `DateTimeFormat`, `TimeFormat`].includes(formatType))) {
    throw new Error(`getFormatArray formatType`);
  }
  const formatData = vscode.workspace.getConfiguration(`SmartInsertDate`).get(formatType);
  return formatData.map(item => item.format);
};

function activate(context) {

  const insertDateTimeCommand = (dateType) => {
    if (!([`Date`, `DateTime`, `Time`].includes(dateType))) {
      throw new Error(`insertDateTimeCommand insertType`);
    }
    const editor = getEditor(); if (!editor) { return; }
    const dateFormatArray = getDateFormatArray(`${dateType}Format`);

    const selectedText = getSelectedText(editor)[0] ?? ``;
    if (
      insertTypeBuffer === dateType
      && insertTextBuffer === selectedText
    ) {
      insertDateFormatIndexBuffer += 1;
      if (dateFormatArray.length === insertDateFormatIndexBuffer) {
        insertDateFormatIndexBuffer = 0;
      }
    } else {
      insertDateFormatIndexBuffer = 0;
    }

    insertTypeBuffer = dateType;
    insertTextBuffer = dateToStringJp(
      new Date(), dateFormatArray[insertDateFormatIndexBuffer]
    );
    insertText(editor, insertTextBuffer);
  }

  registerCommand(context, `vscode-smart-insert-date.Today`, () => {
    insertDateTimeCommand(`Date`);
  });

  registerCommand(context, `vscode-smart-insert-date.NowDateTime`, () => {
    insertDateTimeCommand(`DateTime`);
  });

  registerCommand(context, `vscode-smart-insert-date.NowTime`, () => {
    insertDateTimeCommand(`Time`);
  });

}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
