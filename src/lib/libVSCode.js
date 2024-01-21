const vscode = require(`vscode`);

// VSCode System

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
};

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

// VSCode editor.selections

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


module.exports = {
  registerCommand,
  getEditor,
  commandQuickPick,

  equalSelectionItem,
  insertTextUnSelect,
  insertText,
  getSelectedText,
};
