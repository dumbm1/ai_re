/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
  'use strict';

  var csInterface = new CSInterface ();

  function loadJSX (fileName) {
    var extensionRoot = csInterface.getSystemPath (SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript ('$.evalFile("' + extensionRoot + fileName + '")');
  }

  function init () {

    themeManager.init ();
    loadJSX ("json2.js");

    $ ("#btn_repl").click (function () {
      var elem_regStr   = document.getElementById ("fld_regStr");
      var elem_replacer = document.getElementById ("fld_replacer");
      var elem_return   = document.getElementById ('fld_return');
      repl (elem_regStr.value, elem_replacer.value, elem_return);
      elem_regStr.focus ();
    });
    $ ("#btn_clear").click (function () {
      $ ("#fld_return").val ('');
    });

    $ ("#btn_refrash").click (reloadPanel);
    $ ("#btn_killCEP").click (function () {
      csInterface.evalScript ("killCEP()");
    });

  }

  init ();

  // Reloads extension panel
  function reloadPanel () {
    location.reload ();
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

        if (!fld_return.value) {
          fld_return.value = res;
        } else {
          fld_return.value += '\n' + res;
        }
      });
  }
} ());
