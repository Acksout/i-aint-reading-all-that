// content.js
const { convert } = require("html-to-text");

function getPageContent() {
    const rawHTML = document.documentElement.outerHTML;
    return convert(rawHTML);
    console.log("Clean HTML in content.js:", cleanHTML); // Log clean HTML
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getHTML") {
        sendResponse({html: getPageContent()});
    }
});