# Auto-BCC-Gmail
A locally run Chrome extension to automatically BCC an email address of your choice. Just download, add to Chrome extensions, add your desired BCC email address, and start sending.

Are you required to log emails to a CRM, such as Salesforce? Do you want to make BCC'ing your logging email address easy, automatic, and foolproof? Look no further! This locally run Chrome extension will allow you to automatically BCC an email address of your choice! Please see instructions for installation below. Happy Logging!

**_This extension is intended for use with Salesforce. Step 3 instructions were written with this in mind. But if you have any other uses for it, feel free!_**
**_Why did I make this for Salesforce when Salesforce has an extension already? Because I don't like having to make several clicks to simply log an email._**

**How to Install the Gmail Auto BCC Extension**
This extension is not on the Chrome Web Store and must be installed manually. Follow these steps carefully.

**Step 1: Prepare the Files**
 1. Download the Folder gmail-auto-bcc. Click the green Code button on the top right of this Readme, and download as Zip. Unzip it. Put it somewhere safe where you won’t accidentally delete it.
 2. Confirm your folder structure looks like this:
```
gmail-auto-bcc/
├── images/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── manifest.json
├── options.html
├── options.js
└── content.js
```

**Step 2: Install in Chrome**
1. Open the Google Chrome browser.
2. Navigate to the extensions page by typing chrome://extensions in the address bar and pressing Enter.
3. In the top-right corner of the page, find the "Developer mode" toggle and turn it ON.
4. Three new buttons will appear: "Load unpacked", "Pack extension...", and "Update". Click on "Load unpacked".
5. A file selection dialog will open. Navigate to and select the gmail-auto-bcc folder you downloaded in Step 1. Do not select the individual files, select the entire folder.
6. The "Gmail Auto BCC" extension will now appear in your list of extensions.
   
**Step 3: Configure the Extension**
1. Go into Salesforce. Click View Profile > Settings > My Email to Salesforce.
2. Copy the email address that starts with “emailtosalesforce@”
3. Find the "Gmail Auto BCC" extension in your extensions list (chrome://extensions).
4. Click on the "Details" button.
5. Scroll down and click on "Extension options".
6. This will open the settings page. Paste your Salesforce logging email address and click Save.
7. You can also access the options by finding the extension's icon (Tree Icon) in your Chrome toolbar (you may need to click the puzzle piece icon), right-clicking it, and selecting "Options".
   
That's it! The extension is now active. Go to your Gmail account, refresh the page, and click "Compose" or "Reply". The BCC address you configured should appear automatically.
