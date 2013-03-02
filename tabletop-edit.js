(function ($) {
  Drupal.tabletop = [];
  Drupal.behaviors.tabletopEdit = {

    attach: function(context, settings) {
      $('.edit-tabletop').each(function(i, field) {
        // Replace the 'sheet' text field with a select widget.
        var select = $('<select class="form-select"></select>')
          .change({ 'field': field }, Drupal.behaviors.tabletopEdit.changeSelect);
        $('.tabletop-sheet', field).after(select);

        // Instantiate Tabletop objects.
        $('input.tabletop-key', field).change(function(e) {
          // Empty the sheet select widget.
          $(select).empty();

          // Empty the dynamic template help.
          $('.tabletop-model-columns', field).empty();

          if (e.target.value) {
            var table = Tabletop.init({
              key: e.target.value,
              callback: function() {
                var table = $(field).data('table');
                if (table) {
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

      if (selected) {
        $('.tabletop-sheet', field).val(selected);
      }

      var table = $(field).data('table');

      if (table && selected) {
        var sheet = table.sheets(selected);
        if (sheet) {
          // Set help text.
          $('.tabletop-model-columns', field).html('Your column names are: <code></code>');
          $.each(sheet.column_names, function(i, col) {
            $('.tabletop-model-columns code', field).append('{{' + col + '}} ');
          });

          // Build default text field value.
          var newDefaultValue = '{{#each data}}';
          $.each(sheet.column_names, function(i, col) {
            newDefaultValue += "\n  {{" + col + "}}";
          });
          newDefaultValue += "\n{{/each}}";

          // Set default.
          var $template = $('.tabletop-template', field);
          var defaultValue = $template.data('defaultValue');
          if (!$template.val() || $template.val() == defaultValue) {
            $template.val(newDefaultValue);
          }
          $template.data('defaultValue', newDefaultValue);
        }
      }
    }

  }
})(jQuery);


