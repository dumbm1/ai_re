/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
 alert ('hi');
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

  var count = 0;
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

  while (result = reg.exec (txtFrame.contents)) {
    try {
      var aCon      = txtFrame.characters[result.index];
      aCon.length   = result[0].length;
      aCon.contents = aCon.contents.replace (reg, replacer);
      // !!! when the match.length is different with the replacer.length the loop becomes infinite
      reg.lastIndex += replacer.length + 1;
      count++;
    } catch (e) {
    }
  }
  return count;
}
