// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

let i = 0;

function activate(context) {

  const insertText = (editor, str) => {
    editor.edit(editBuilder => {
      for (const selection of editor.selections) {
        // editBuilder.replace(selection, ``);
        // editBuilder.insert(selection.active, str);
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

  // const getSelectionFirstString = () => {
  //   const editor = vscode.window.activeTextEditor;
  //   if (!editor) {
  //     vscode.window.showInformationMessage(`No editor is active`);
  //     return;
  //   }

  //   if (1 <= editor.selections.length) {
  //     return editor.selections[0];
  //   }
  //   return '';
  // }

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-insert-date-time" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-insert-date-time.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage(`No editor is active`);
      return;
    }

    const selectedText = getSelectedText(editor)[0] ?? ``;
		vscode.window.showInformationMessage(`${selectedText} from vscode-insert-date-time! 2023/11/24 Fri 01:45:35`);

    i += 1;
    insertText(editor, `Hello World ${i} `)

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
