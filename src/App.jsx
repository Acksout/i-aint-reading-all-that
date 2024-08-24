import React, {useState, useEffect} from "react";
import "./App.css";
import {GoogleGenerativeAI} from "@google/generative-ai";

const App = () => {
    const [explained, setExplained] = useState("");
    const [getHtml, setGetHtml] = useState("");

    useEffect(() => {
        // Request the API key and HTML content when the component mounts
        chrome.runtime.sendMessage({action: "getApiKey"}, (response) => {
            if (response && response.apiKey) {
                initializeGemini(response.apiKey);
            }
        });

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "getHTML"}, (response) => {
                if (response && response.html) {
                    setGetHtml(response.html);

                }
            });
        });
    }, []);

    const initializeGemini = (apiKey) => {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({model: "gemini-1.5-pro"});

        window.runGemini = async () => {
            try {
                const prompt = "Give me the gist and save me the time!: " + getHtml;
                const result = await model.generateContent(prompt);
                const response = await result.response;
                setExplained(response.text());
            } catch (error) {
                console.error("Error running Gemini:", error);
                setExplained("An error occurred while processing your request.");
            }
        };
    };

    return (
        <div>
            <button className="explain-btn" onClick={() => window.runGemini()}>
                Run Gemini
            </button>
            {explained ? (
                <p className="explained-text">{explained}</p>
            ) : (
                <p>Click the button to generate content</p>
            )}
        </div>
    );
};

export default App;