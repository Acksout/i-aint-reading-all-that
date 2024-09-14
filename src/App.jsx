import React, { useState, useEffect } from "react";
import { convert } from "html-to-text";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";

const App = () => {
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const summarizeCurrentPage = async () => {
      try {
        console.log("Starting summarization process");

        // Check if chrome API is available
        if (!chrome || !chrome.tabs || !chrome.scripting) {
          throw new Error("Chrome API not available");
        }

        // Get current tab
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        console.log("Current tab:", tab);

        // Execute script to get page content
        const [{ result: html }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => document.documentElement.outerHTML,
        });
        console.log("HTML content retrieved");

        // Convert HTML to text
        const text = convert(html);
        console.log("HTML converted to text");

        // Initialize Google AI
        // const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const apiKey = "GOOGLE API KEY GOES HERE";
        if (!apiKey) {
          throw new Error("Google API key not found");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Google AI initialized");

        // Generate summary
        const result = await model.generateContent(
          `Summarize this text in 3-5 sentences: ${text.substring(0, 5000)}`
        );
        const summary = result.response.text();
        console.log("Summary generated");

        setSummary(summary);
      } catch (error) {
        console.error("Error summarizing page:", error);
        setError(error.message);
        setSummary("An error occurred while summarizing the page.");
      }
    };

    summarizeCurrentPage();
  }, []);

  return (
    <div id="summary-container" className="extension-popup">
      <h1 id="summary-title" className="popup-title">
        Page Summary
      </h1>
      {error && <p className="error-message">Error: {error}</p>}
      <p id="summary-content" className="summary-text">
        {summary || "Loading summary..."}
      </p>
    </div>
  );
};

export default App;
