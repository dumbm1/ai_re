/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

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
      reg      = new RegExp (regStr, 'gmi'),
      result;
  var resIndex = 0;

  while (result = reg.exec (txtFrame.contents)) {
    // when a regular expression pattern is a sign begin or end of the string (anchors),
    // the loop becomes infinite maybe because in this case the result[0].length == 0
    if (result[0].length == 0) {
      reg.lastIndex += 2;
    }
    try {
      var aCon      = txtFrame.characters[result.index];
      aCon.length   = result[0].length;
      aCon.contents = aCon.contents.replace (reg, replacer);
      // aCon.contents = replacer;
      count++;
    } catch (e) {
    }
  }

  return count;
}
