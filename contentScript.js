
// Event listener for messages from background or popup script
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.action === "copyJobDetails") {
        
        
         console.log(request.useTabDelimitedFormat);
        // Check if document has focus or set a slight delay to ensure focus
        if (document.hasFocus()) {
         await copyJobDetails(request.useTabDelimitedFormat);
        } else {
            // Set a timeout to wait for focus, or request user to click on the document
            window.focus(); // Request focus
            setTimeout(async () => {
                await copyJobDetails(request.useTabDelimitedFormat);
            }, 100);
        }
    }
});
  
  async function copyJobDetails(useTabDelimitedFormat) {
    const companyName = document.querySelector('[data-testid="company-hire-info"]').innerText;
    const jobTitle = document.querySelector('[data-testid="job-details-info-job-title"]').innerText;
    const pageURL = window.location.href;
    console.log(useTabDelimitedFormat);

    let clipboardText;
    if (useTabDelimitedFormat !== undefined && useTabDelimitedFormat === true) {
        // Format for Excel/Google Sheets (Tab-delimited)
        clipboardText = `${companyName}\t${jobTitle}\t${pageURL}`;
    } else {
        // Original format (New line separated)
        clipboardText = `Company Name: ${companyName}\nJob Title: ${jobTitle}\nLink: ${pageURL}`;
    }

  
  

    console.log(clipboardText);

    try {
      await  navigator.clipboard.writeText(clipboardText)
      showToast("Details copied to clipboard! " + getStringIfUsingCsvFormat(useTabDelimitedFormat));
    } catch (err) {
        console.error('Failed to copy details: ', err)
        showToast("Failed to copy details", true);
    }
  }
  


  function getStringIfUsingCsvFormat(useTabDelimitedFormat) {
    if (useTabDelimitedFormat !== undefined && useTabDelimitedFormat === true) {
      return "(For CSV)";
    } else {
      return "(For Sharing)";
    }
  }

  function copyLinkDetails() {
   
    const pageURL = window.location.href;
  
    const clipboardText = `Link: ${pageURL}`;

    console.log(clipboardText);
    navigator.clipboard.writeText(clipboardText).then(() => {
      alert("Details copied to clipboard!");
    }).catch(err => {
      console.error('Failed to copy details: ', err);
    });
  }
  

  function showToast(message, isError = false) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.padding = "10px";
    toast.style.borderRadius = "5px";
    toast.style.background = isError ? "red" : "green";
    toast.style.color = "white";
    toast.style.zIndex = "10000";
    toast.style.fontSize = "1rem";
    toast.style.fontWeight = "bold";
    document.body.appendChild(toast);
  
    // Remove the toast after 3 seconds
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }
  