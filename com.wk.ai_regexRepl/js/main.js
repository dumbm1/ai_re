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
      var elem        = document.getElementById ("fld_val");
      var elem_return = document.getElementById ('fld_return');
      repl (elem.value, elem_return);
      elem.focus ();
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
   * Eval javascript string on chrome browser
   *
   * @param {String} str - the javascript code string
   * */
  function repl (str, fld_return) {
    csInterface.evalScript ('evalStr(' + JSON.stringify (str) + ')', function (res) {
      if (!fld_return.value) {
        fld_return.value = res;
      } else {
        fld_return.value += '\n' + res;
      }
    });
  }
} ());
