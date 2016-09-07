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

    $ ("#btn_replace").click (function () {
      var elem_re       = document.getElementById ("fld_re");
      var elem_replacer = document.getElementById ('fld_replacer');
      var elem_return   = document.getElementById ('fld_return');
      var regFlagsStr   = '';
      $ (".reg-flags").each (function () {
        if ($ (this).is (':checked')) {
          regFlagsStr += $ (this).attr ('title');
        }
      });
      repl (elem_re.value, elem_replacer.value, regFlagsStr, elem_return);
      elem_re.focus ();
    });

    document.getElementById ('lst_keywords_re').addEventListener ('change', function () {
      var elem = document.getElementById ('fld_re');
      insertAtCursor (elem, this.value);
    });
    document.getElementById ('lst_keywords_replacer').addEventListener ('change', function () {
      var elem = document.getElementById ('fld_replacer');
      insertAtCursor (elem, this.value);
    });

    $ ("#btn_repeat_re").click (function () {
      var elem = document.getElementById ("fld_re");
      var val  = document.getElementById ('lst_keywords_re').value;
      insertAtCursor (elem, val);
    });
    $ ("#btn_repeat_replacer").click (function () {
      var elem = document.getElementById ("fld_replacer");
      var val  = document.getElementById ('lst_keywords_replacer').value;
      insertAtCursor (elem, val);
    });

    $ ("#btn_refrash").click (reloadPanel);
    $ ("#btn_killCEP").click (function () {
      csInterface.closeExtension ();
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
  function evalInAi (str, fld_return) {
    csInterface.evalScript ('evalStr(' + JSON.stringify (str) + ')', function (res) {
      var prefStr = 'Number of replaces: ';

      fld_return.value = prefStr + res;
    });
  }

  function insertAtCursor (myField, myValue) {
    if (document.selection) {
      myField.focus ();
      document.selection.createRange ().text = myValue;
    }
    else if (myField.selectionStart || myField.selectionStart == '0') {
      var position           = myField.selectionStart;
      myField.value          = myField.value.substring (0, myField.selectionStart) + myValue + myField.value.substring (myField.selectionEnd, myField.value.length);
      myField.selectionStart = myField.selectionEnd = position + myValue.length;
    } else {
      myField.value += myValue;
    }
    myField.focus ();
  }

  /**
   * Replace all matches in the selected text frame
   *
   * @param {String} regStr - regular expression string
   * @param {String} replacer - replacer string
   * */
  function repl (regStr, replacer, regFlagsStr, fld_return) {
    csInterface.evalScript (
      'replInCollect('
      + JSON.stringify (regStr) + ',' + JSON.stringify (replacer) + ',' + JSON.stringify (regFlagsStr) + ')',
      function (res) {
        var pref = '';
        if (!res.match (/err/gmi)) {
          pref = 'replaces: ';
        };
        fld_return.value = pref + res;
      });
  }

} ());


