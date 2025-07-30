// Function to save the options
function saveOptions() {
    const email = document.getElementById('bcc-email').value;
    chrome.storage.sync.set({
        bccEmail: email
    }, () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        status.classList.add('text-green-600');
        setTimeout(() => {
            status.textContent = '';
            status.classList.remove('text-green-600');
        }, 1500);
    });
}

// Function to restore the saved options
function restoreOptions() {
    chrome.storage.sync.get({
        bccEmail: '' // Default value is an empty string
    }, (items) => {
        document.getElementById('bcc-email').value = items.bccEmail;
    });
}

// Event listeners for the page
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save-button').addEventListener('click', saveOptions);
