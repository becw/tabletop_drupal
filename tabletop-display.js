(function ($) {

  Drupal.tabletop = [];
  
  Drupal.behaviors.tabletopDisplay = {
    attach: function(context, settings) {
      if (Drupal.settings.tabletop != undefined) {
        Drupal.behaviors.tabletopDisplay.loadSheets(Drupal.settings.tabletop.tables);
      }
    },

    loadSheets: function(tables) {
      $.each(tables, function(k, sheets) {
        // Create a Tabletop object for each spreadsheet key.
        Drupal.tabletop[k] = Tabletop.init({
          key: k,
          wanted: sheets,
          callback: Drupal.behaviors.tabletopDisplay.showInfo
        });
      });
    },

    showInfo: function() {
      var table = this;
      $.each(Drupal.settings.tabletop.templates, function(id, val) {
        if (val.key == table.key) {
          var $el = $('#' + id);
          var output = Handlebars.compile($el.html())({
            data: table.sheets(val.sheet).all()
          });

          $el.after(output);
        }
      });
    }
  }

})(jQuery);
