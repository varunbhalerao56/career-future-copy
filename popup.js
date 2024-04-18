// popup.js
document.addEventListener('DOMContentLoaded', function() {


    const formatToggle = document.getElementById('formatToggle');

    // Load the saved format preference
    chrome.storage.local.get(['useTabDelimitedFormat'], function(result) {
        if (result.useTabDelimitedFormat !== undefined) {
            formatToggle.checked = result.useTabDelimitedFormat;
        } else {
            // Default to tab-delimited format
            formatToggle.checked = true;
            chrome.storage.local.set({useTabDelimitedFormat: true});
        }
    });

    document.getElementById('copyButton').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // Focus the tab before sending the message
            chrome.tabs.update(tabs[0].id, {active: true}, function() {
                // Ensure the tab is focused before sending the message
                chrome.tabs.sendMessage(tabs[0].id, { action: "copyJobDetails" , useTabDelimitedFormat: formatToggle.checked});
            });
        });
    });


    formatToggle.addEventListener('change', function() {
        chrome.storage.local.set({useTabDelimitedFormat: formatToggle.checked});
    });
});

