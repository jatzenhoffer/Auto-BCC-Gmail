/**
 * This script runs in the context of the Gmail page.
 * It uses a MutationObserver to detect when a compose window is opened.
 * VERSION 1.0 (Production): Final working version.
 */

/**
 * Polls the DOM for a given selector to appear.
 * @param {string} selector The CSS selector to query for.
 * @param {Element} root The root element to search within.
 * @param {function} callback The function to call when the element is found.
 */
function waitForElement(selector, root, callback) {
    let attempts = 0;
    const maxAttempts = 30; // Poll for up to 3 seconds (30 * 100ms)
    const interval = 100;

    const intervalId = setInterval(() => {
        const element = root.querySelector(selector);
        if (element) {
            clearInterval(intervalId);
            callback(element);
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(intervalId);
                callback(null); // Signal failure
            }
        }
    }, interval);
}


// This function contains the core logic for adding the BCC.
const addBccToCompose = (composeForm) => {
    // First, check if we've already processed this compose form to avoid loops.
    if (composeForm.dataset.bccAdded) {
        return;
    }
    composeForm.dataset.bccAdded = 'true';

    // Retrieve the saved BCC email from storage.
    chrome.storage.sync.get(['bccEmail'], (result) => {
        // Check if the extension context has been invalidated.
        if (chrome.runtime.lastError) {
            // Context is invalidated, probably because the page is navigating away. Do nothing.
            return;
        }

        const bccEmail = result.bccEmail;

        // If no email is set in the options, do nothing.
        if (!bccEmail) {
            return;
        }

        // Function to perform the action of adding the email
        const performBccAddition = (bccField) => {
            if (!bccField) {
                return;
            }
            
            const currentBccValue = bccField.value;
            
            // Avoid adding the email if it's already there.
            if (!currentBccValue.includes(bccEmail)) {
                // Append the new BCC email. If the field is not empty, add a comma first.
                bccField.value = currentBccValue ? `${currentBccValue}, ${bccEmail}` : bccEmail;
                
                // Gmail's UI might not recognize the change unless an input event is dispatched.
                bccField.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            }
        };
        
        // This is the correct selector for the input field based on our debugging.
        const bccInputSelector = 'input[aria-label="BCC recipients"]';

        // Find the "Bcc" link/button to click.
        const bccButton = composeForm.querySelector('span[aria-label*="Add Bcc recipients"]');
        
        // Check if the BCC field is already visible.
        const bccFieldExists = composeForm.querySelector(bccInputSelector);

        if (bccFieldExists) {
            performBccAddition(bccFieldExists);
        } else if (bccButton) {
            bccButton.click();
            
            // After clicking, poll the DOM until the correct input appears.
            waitForElement(bccInputSelector, composeForm, (newlyFoundBccField) => {
                if (newlyFoundBccField) {
                    performBccAddition(newlyFoundBccField);
                }
            });
        }
    });
};

// Use a MutationObserver to watch for when a compose window is added to the page.
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                // Ensure the added node is an element.
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Compose windows are forms. We can find them and process them.
                    const composeForms = node.querySelectorAll('form[method="POST"]');
                    if (composeForms.length > 0) {
                        composeForms.forEach(addBccToCompose);
                    }
                }
            });
        }
    }
});

// Start observing the entire document body for changes.
observer.observe(document.body, {
    childList: true,
    subtree: true
});