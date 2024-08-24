// background.js

const apiKey = "AZX"; // Replace with your actual API key

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getApiKey") {
        sendResponse({apiKey: apiKey});
    }
});