const vscode = require('vscode');

let i = 0;

const insertText = (editor, str) => {
  editor.edit(editBuilder => {
    for (const selection of editor.selections) {
      editBuilder.replace(selection, str);
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

function activate(context) {

  registerCommand(context, `vscode-insert-date-time.helloWorld`, () => {

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage(`No editor is active`);
      return;
    }

    const selectedText = getSelectedText(editor)[0] ?? ``;
		vscode.window.showInformationMessage(`${selectedText} from vscode-insert-date-time! 2023/11/24 Fri 02:38:16`);

    i += 1;
    insertText(editor, `Hello World ${i} `)
  });

}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
