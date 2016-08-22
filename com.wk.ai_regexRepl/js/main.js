/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
  'use strict';

  var csInterface = new CSInterface ();

  function init () {
    themeManager.init ();
    loadJSX ("json2.js");

    $ ("#btn_repl").click (
      alert ('Replace')
      /*function () {
       var elem_regStr   = document.getElementById ("fld_regStr");
       var elem_replacer = document.getElementById ("fld_replacer");
       var elem_return   = document.getElementById ('fld_return');
       repl (elem_regStr.value, elem_replacer.value, elem_return);
       elem_regStr.focus ()
       ;}*/
    );
    $ ("#btn_refrash").click (alert ('Refrash'));
    $ ("#btn_killCEP").click (alert ('Reboot'));
  }

  init ();

  // Reloads extension panel
  function reloadPanel () {
    location.reload ();
  }

  function loadJSX (fileName) {
    var extensionRoot = csInterface.getSystemPath (SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript ('$.evalFile("' + extensionRoot + fileName + '")');
  }

  /**
   * Replace all matches in the selected text frame
   *
   * @param {String} regStr - regular expression string
   * @param {String} replacer - replacer string
   * */
  function repl (regStr, replacer, fld_return) {
    csInterface.evalScript (
      'repl(' + JSON.stringify (regStr) + ',' + JSON.stringify (replacer) + ')', function (res) {
        var pref = '';
        if (!res.match (/err/gmi)) pref = 'replaces: ';
        fld_return.value = pref + res;
      });
  }

} ());
