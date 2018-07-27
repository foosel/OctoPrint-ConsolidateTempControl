# coding=utf-8
from __future__ import absolute_import, division, print_function

__license__ = 'GNU Affero General Public License http://www.gnu.org/licenses/agpl.html'
__copyright__ = "Copyright (C) 2018 The OctoPrint Project - Released under terms of the AGPLv3 License"

import octoprint.plugin

class ConsolidateTempControlPlugin(octoprint.plugin.TemplatePlugin,
                                   octoprint.plugin.AssetPlugin):
	def get_template_configs(self):
		return [
			dict(type="tab", name="Command & Control", custom_bindings=False)
		]

	def get_assets(self):
		return dict(js=["js/consolidate_temp_control.js"])

	def update_hook(self):
		return dict(
			consolidate_temp_control=dict(
				displayName="Consolidate Temp Control",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="foosel",
				repo="OctoPrint-ConsolidateTempControl",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/foosel/OctoPrint-ConsolidateTempControl/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Consolidate Temp Control"
__plugin_implementation__ = ConsolidateTempControlPlugin()
__plugin_settings_overlay__ = dict(appearance=dict(components=dict(order=dict(tab=["plugin_consolidate_temp_control",
                                                                                   "gcodeviewer",
                                                                                   "terminal",
                                                                                   "timelapse"]))))
__plugin_hooks__ = {
	"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.update_hook
}
