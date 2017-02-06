(function() {
  'use strict';
  var csInterface = new CSInterface();
  init();
  function init() {
    themeManager.init();
    if (csInterface.isWindowVisible()) {
      new CSInterface().requestOpenExtension('com.wk.ai_re.panel');
      new CSInterface().closeExtension();
    }
  }
}());
