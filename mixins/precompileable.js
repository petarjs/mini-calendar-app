(function () {
  'use strict';

  window.mixins = window.mixins || {};
  
  window.mixins.Precompileable = {
    precompileTemplate: precompileTemplate
  };

  /**
   * Precompile the template
   * @param {String} templateId Id of the tempalte to precompile
   * @return {undefined}
   */
  function precompileTemplate(templateId) {
    this.template = Handlebars.compile($(templateId).html());
  }
})(); 