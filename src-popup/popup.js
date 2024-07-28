document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('statusText');
    const toggleButton = document.getElementById('togglePlugin');

    // Get the current status from storage
    chrome.storage.local.get(['enhancedOpsgenieAlertNotesPluginEnalbed'], function(result) {
        if (result.enhancedOpsgenieAlertNotesPluginEnalbed === false) {
            statusText.textContent = 'Disabled';
            toggleButton.textContent = 'Enable Plugin';
        } else {
            statusText.textContent = 'Enabled';
            toggleButton.textContent = 'Disable Plugin';
        }
    });

    // Add event listener to the button
    toggleButton.addEventListener('click', () => {
        chrome.storage.local.get(['enhancedOpsgenieAlertNotesPluginEnalbed'], function(result) {
            const isEnabled = result.enhancedOpsgenieAlertNotesPluginEnalbed !== false; // Default to enabled if not set
            if (isEnabled) {
                if (confirm('Do you really want to disable the plugin and refresh the page? Data may be lost')) {
                    chrome.storage.local.set({ enhancedOpsgenieAlertNotesPluginEnalbed: false }, function() {
                        statusText.textContent = 'Disabled';
                        toggleButton.textContent = 'Enable Plugin';
                        refreshPage();
                    });
                }
            } else {
                if (confirm('Do you really want to enable the plugin and refresh the page? Data may be lost')) {
                    chrome.storage.local.set({ enhancedOpsgenieAlertNotesPluginEnalbed: true }, function() {
                        statusText.textContent = 'Enabled';
                        toggleButton.textContent = 'Disable Plugin';
                        refreshPage();
                    });
                }
                
            }
        });
    });

    function refreshPage() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTab = tabs[0];
            chrome.tabs.reload(activeTab.id);
        });
    }
});