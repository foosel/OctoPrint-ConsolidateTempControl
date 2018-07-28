$(function() {
    function ConsolidateTempControlViewModel(parameters) {
        var self = this;

        self.controlViewModel = parameters[0];
        self.temperatureViewModel = parameters[1];
		
		$('#control_link,#temp_link').hide();
		$('#navbar > div.navbar-inner > div.container').removeClass('container').addClass('row-fluid').css('padding-left','20px');
		$('#navbar > div.navbar-inner > div.row-fluid > div.nav-collapse').css('padding-right','20px');
		$('div.container.octoprint-container').addClass('row-fluid');
		$('div.container.octoprint-container.row-fluid > div.row > div.accordion.span4').removeClass('span4').addClass('span2');
		$('div.container.octoprint-container.row-fluid > div.row').css('margin-left','20px');
		$('#files div.row-fluid.upload-buttons > span.btn.btn-primary.fileinput-button.span6:nth-child(2) > span').text('Upload SD');

        // fix control tab
        self.onTabChange = function(current, previous) {
            if (current === "#tab_plugin_consolidate_temp_control") {
                var selected = OctoPrint.coreui.selectedTab;
                OctoPrint.coreui.selectedTab = "#temp";
                self.controlViewModel.onTabChange("#temp", previous);
                OctoPrint.coreui.selectedTab = "#control";
                self.controlViewModel.onTabChange("#control", previous);
                OctoPrint.coreui.selectedTab = selected;
            } else if (previous === "#tab_plugin_consolidate_temp_control") {
                self.controlViewModel.onTabChange(current, "#control");
            }
        };

        self.onAllBound = function(allViewModels) {
                var selected = OctoPrint.coreui.selectedTab;
                OctoPrint.coreui.selectedTab = "#control";
                self.controlViewModel.onAllBound(allViewModels);
                OctoPrint.coreui.selectedTab = selected;
        };

        // fix temperature tab
        self.onAfterTabChange = function(current, previous) {
            if (current === "#tab_plugin_consolidate_temp_control") {
                self.temperatureViewModel.onAfterTabChange("#temp", previous);
            } else if (previous === "#tab_plugin_consolidate_temp_control") {
                self.temperatureViewModel.onAfterTabChange(current, "#temp");
            }
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: ConsolidateTempControlViewModel,
        dependencies: ["controlViewModel", "temperatureViewModel"]
    });
});