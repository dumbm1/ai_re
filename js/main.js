/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/
(function() {
  'use strict';

  var csInterface = new CSInterface();

  function loadJSX(fileName) {
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
  }

  function init() {

    themeManager.init();
    loadJSX("json2.js");

    (function() {
      $("#form-re").sisyphus({
        excludeFields: $("#fld_return"),
        timeout:       10
      })
    }());

    autosize($('#fld_re, #fld_replacer'));


    $("#fld_re").keypress(function() {
      csInterface.resizeContent($('body').width() + scrollbarWidth(), $('body').height() + scrollbarWidth());
    });
    $("#fld_replacer").keydown(function() {
      csInterface.resizeContent($('body').width() + scrollbarWidth(), $('body').height());
    });

    $("#btn_replace").click(function() {
      var elem_re       = document.getElementById("fld_re");
      var elem_replacer = document.getElementById('fld_replacer');
      var elem_return   = document.getElementById('fld_return');
      var regFlagsStr   = '';
      $(".reg-flags").each(function() {
        if ($(this).is(':checked')) {
          regFlagsStr += $(this).attr('title');
        }
      });

      repl(elem_re.value, elem_replacer.value, regFlagsStr, elem_return);
      elem_re.focus();
    });
    $("#btn_selAllMatch").click(function() {
      var elem_re       = document.getElementById("fld_re");
      var elem_replacer = document.getElementById('fld_replacer');
      var elem_return   = document.getElementById('fld_return');
      var regFlagsStr   = '';
      var deselFlag     = '';

      if ($("#desel_flag").is(':checked')) {
        deselFlag = $("#desel_flag").attr('title');
      }

      $(".reg-flags").each(function() {
        if ($(this).is(':checked')) {
          regFlagsStr += $(this).attr('title');
        }
      });

      selAllMatch(elem_re.value, elem_replacer.value, deselFlag, regFlagsStr, elem_return);
      elem_re.focus();
    });
    $("#btn_escape").click(function() {
      var elem_re   = document.getElementById("fld_re");
      elem_re.value = _escape(elem_re.value);
    });

    $("#btn_GitHub").click(function() {
      window.cep.util.openURLInDefaultBrowser("https://github.com/dumbm1/ai_re")
    });

    $("#btn_refrash").click(reloadPanel);

    $("#btn_reload").click(function() {
      new CSInterface().requestOpenExtension('com.wk.ai_re_wk.dialog');
      new CSInterface().closeExtension();
    });
  }

  init();

  function scrollbarWidth() {
    var block = $('<div>').css({'height':'50px','width':'50px'}),
        indicator = $('<div>').css({'height':'200px'});

    $('body').append(block.append(indicator));
    var w1 = $('div', block).innerWidth();
    block.css('overflow-y', 'scroll');
    var w2 = $('div', block).innerWidth();
    $(block).remove();
    return (w1 - w2);
  }
  function hasScroll(el, direction) {
    direction = (direction === 'vertical') ? 'scrollTop' : 'scrollLeft';
    var result = !! el[direction];

    if (!result) {
      el[direction] = 1;
      result = !!el[direction];
      el[direction] = 0;
    }
    return result;
  }

  function getClientWidth() {
    return document.compatMode == 'CSS1Compat' && !window.opera ?
      document.documentElement.clientWidth : document.body.clientWidth;
  }

  function getClientHeight() {
    return document.compatMode == 'CSS1Compat' && !window.opera ?
      document.documentElement.clientHeight : document.body.clientHeight;
  }

  // Reloads extension panel
  function reloadPanel() {
    location.reload();
  }

  function insertAtCursor(myField, myValue) {
    if (document.selection) {
      myField.focus();
      document.selection.createRange().text = myValue;
    }
    else if (myField.selectionStart || myField.selectionStart == '0') {
      var position           = myField.selectionStart;
      myField.value          = myField.value.substring(0, myField.selectionStart) + myValue + myField.value.substring(myField.selectionEnd, myField.value.length);
      myField.selectionStart = myField.selectionEnd = position + myValue.length;
    } else {
      myField.value += myValue;
    }
    myField.focus();
  }

  /**
   * Replace all matches in the selected text frame
   *
   * @param {String} regStr - regular expression string
   * @param {String} replacer - replacer string
   * */
  function repl(regStr, replacer, regFlagsStr, fld_return) {

    csInterface.evalScript(
      'replInCollect('
      + JSON.stringify(regStr) + ',"' + replacer + '",'
      // + JSON.stringify (regStr) + ',' + JSON.stringify (replacer) + ','
      + JSON.stringify(regFlagsStr) + ')',
      function(res) {
        var pref = '';
        if (!res.match(/err/gmi)) {
          pref = 'replaces: ';
        }
        if (!fld_return.value) {
          fld_return.value     = pref + res;
          fld_return.scrollTop = fld_return.scrollHeight - fld_return.clientHeight;
        } else {
          fld_return.value += '\n' + pref + res;
          fld_return.scrollTop = fld_return.scrollHeight - fld_return.clientHeight;
        }
      });
  }

  /**
   * Replace all matches in the selected text frame
   *
   * @param {String} regStr - regular expression string
   * @param {String} replacer - replacer string
   * */
  function selAllMatch(regStr, replacer, deselFlag, regFlagsStr, fld_return) {

    csInterface.evalScript(
      'selInCollect('
      + JSON.stringify(regStr) + ',"' +
      replacer + '","' + deselFlag + '",' +
      JSON.stringify(regFlagsStr) + ')',
      function(res) {
        var pref = '';
        if (!res.match(/err/gmi)) {
          pref = 'matches: ';
        }
        if (!fld_return.value) {
          fld_return.value     = pref + res;
          fld_return.scrollTop = fld_return.scrollHeight - fld_return.clientHeight;
        } else {
          fld_return.value += '\n' + pref + res;
          fld_return.scrollTop = fld_return.scrollHeight - fld_return.clientHeight;
        }
      });
  }

}());

function _escape(text) {
  return text.replace(/[*+?.^$|]/g, "\\$&");
  // return text.replace (/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


