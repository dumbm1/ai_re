/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function killCEP () {
  /**
   * make bat-file that kill all system processes CEPHTMLEngine.exe
   */
  _execFile (
    Folder.temp.absoluteURI + '/' + 'taskkil.bat',
    'taskkill /IM CEPHTMLEngine.exe /f'
  );
  /**
   * make new file by full path, write to disk with some file contenr, execute file
   *
   * @param {String} filePath - FULL path (include file-extension)
   * @param {String} fileContent - content to new file
   */
  function _execFile (filePath, fileContent) {
    var f = new File (filePath);
    f.open ('e');
    f.write (fileContent);
    f.close ();
    f.execute ();
  }
}

function evalStr (str) {
  var res = '';

  try {
    res = eval (/*JSON.parse*/ (str));
  } catch (e) {
    res = e.message;
  }
  return res;
}

/**
 * change Contents Of Word Or String Remain Formatting
 * autor (c)pixxxel schubser
 *
 * function needs one text frame selected by Selection Tool,
 * Direct Selection Tool or Group Selection Tool
 *
 * @param {String} regStr - regular expression string
 * @param {String} replacer - replacer string
 * */
function repl (regStr, replacer) {
  if (!regStr.length) {
    alert ('No regexp input value');
    return -1;
  }
  replacer = replacer || '';

  var replaceCount = 0;
  if (selection.length != 1) {
    alert ('Select the text frame by Selection Tool, Direct Selection Tool or Group Selection Tool');
    return -1;
  }
  var txtFrame = selection[0],
      resIndex = 0,
      result,
      reg;

  try {
    reg = new RegExp (regStr, 'gmi')
  } catch (e) {
    return e.message + ', line: ' + e.line;
  }
  var protectDebugCount = 1;
  while (result = reg.exec (txtFrame.contents)) {
    // force abort script if loop becomes infinite
    if (protectDebugCount % 1001 == 0) {
      confirm ('Do you want to abort the script?');
    }

    try {
      var aCon      = txtFrame.characters[result.index];
      aCon.length   = result[0].length;
      aCon.contents = aCon.contents.replace (reg, replacer);
      // !!! when the match.length is different with the replacer.length the loop becomes infinite
      reg.lastIndex += replacer.length - result[0].length /*+ 1*/;
      replaceCount++;
    } catch (e) {
    }
    protectDebugCount++;
  }
  return replaceCount;
}
