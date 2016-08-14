/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function killCEP () {
  /**
   * make bat-file that kill all system processes CEPHTMLEngine.exe
   */
  var f = new File (Folder.temp.absoluteURI + '/' + 'taskkil.bat');
  f.open ('e');
  f.write ('taskkill /IM CEPHTMLEngine.exe /f');
  f.close ();
  f.execute ();
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
  var count = 0;
  if (selection.length != 1) {
    alert ('Select the text frame by Selection Tool, Direct Selection Tool or Group Selection Tool');
    return -1;
  }
  var txtFrame = selection[0],
      reg      = new RegExp (regStr, 'gi'),
      result;

  while (result = reg.exec (txtFrame.contents)) {
    try {
      var aCon      = txtFrame.characters[result.index];
      aCon.length   = result[0].length;
      aCon.contents = aCon.contents.replace (reg, replacer);
      count++;
    } catch (e) {
    }
  }

  return result + ': ' + count;
}
