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
 * */
function repl (regStr, replacer) {
  var res = '';
  if (selection.length != 1) {
    alert ('Select the text frame by Selection Tool, Direct Selection Tool or Group Selection Tool');
    return;
  }
  var txtFrame = selection[0],
      reg      = new RegExp (regStr, 'gi'),
      result;

  while (result = reg.exec (txtFrame.contents)) {
    try {
      var aCon      = txtFrame.characters[result.index];
      aCon.length   = result[0].length;
      aCon.contents = replacer;
    } catch (e) {
    }
  }

  return res;
}
