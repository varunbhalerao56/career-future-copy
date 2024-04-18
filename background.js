// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed or updated.");
});

// Background service to fetch weather data
function fetchDataAndSetBadge() {
  console.log("Fetching Some data...");


}

// Start fetching data when the extension is installed or updated
chrome.runtime.onInstalled.addListener(fetchDataAndSetBadge);

chrome.commands.onCommand.addListener(function(command) {

  console.log("Command received: ", command); 
  if (command === "copy_job_details") {
      // Load the saved format preference
      chrome.storage.local.get(['useTabDelimitedFormat'], function(result) {
          let useTabDelimitedFormat = true;  // Default to true if not set

          if (result.useTabDelimitedFormat !== undefined) {
              useTabDelimitedFormat = result.useTabDelimitedFormat;
          } else {
              // If not defined, set the default value
              chrome.storage.local.set({useTabDelimitedFormat: true});
          }

          // Move this inside the get callback
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { 
                  action: "copyJobDetails", 
                  useTabDelimitedFormat: useTabDelimitedFormat
              });
          });
      });
  }
});
