(function ($) {
  Drupal.tabletop = [];
  Drupal.behaviors.tabletopEdit = {

    attach: function(context, settings) {
      $('.edit-tabletop').each(function(i, field) {
        // Replace the 'sheet' text field with a select widget.
        var select = $('<select><option value="">Choose a sheet</option></select>')
          .change({ 'field': field }, Drupal.behaviors.tabletopEdit.changeSelect);
        $('.tabletop-sheet-select', field).append(select);

        // Instantiate Tabletop objects.
        $('input.tabletop-key', field).change(function(e) {
          if (e.target.value) {
            var table = Tabletop.init({
              key: e.target.value,
              callback: function() {
                var table = $(field).data('table');
                if (table) {
                  // Empty the sheet select widget.
                  $(select).empty();

                  // Build new options with sheets from the updated table.
                  $.each(table.model_names, function(i, name) {
                    $(select).append('<option value="' + name + '">' + name + '</option>');
                  });

                  // If there's a sheet that matches the current sheet name, select it.
                  var sheetName = $('.tabletop-sheet', field).val();
                  $('option[value="' + sheetName + '"]').attr('selected', 'selected');

                  // Trigger the change event on the select widget so that column names update
                  $(select).change();
                }
              }
            });

            // Store the Tabletop object on the field element.
            $(field).data('table', table);
          }
        })
        // Trigger the change event on the key field so that the select widget and template hints are populated on load.
        .change();
      });
    },

    changeSelect: function(e) {
      var field = $(e.data.field);
      var selected = e.target.value;
      $('.tabletop-sheet', field).val(selected);

      var table = $(field).data('table');

      if (table && selected) {
        var sheet = table.sheets(selected);
        if (sheet) {
          // Set help text.
          // @todo Fix me.
          $('.tabletop-model-columns', field).html('Your column names are: <code></code>');
          $.each(sheet.column_names, function(i, col) {
            $('.tabletop-model-columns code', field).append('{{' + col + '}} ');
          });

          // Build default text field value.
          var $template = $('.tabletop-template', field);
          var defaultValue = $template.data('defaultValue');
          var newDefaultValue = '{{#each data}}';
          $.each(sheet.column_names, function(i, col) {
            newDefaultValue += "\r\n  {{" + col + "}}";
          });
          newDefaultValue += "\r\n{{/each}}";

          // Set default.
          if (!$template.val() || $template.val() == defaultValue) {
            $template.val(newDefaultValue);
          }
          $template.data('defaultValue', newDefaultValue);
        }
      }
    }

  }
})(jQuery);


