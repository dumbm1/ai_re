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
