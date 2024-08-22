import React, { useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const apiKey = "";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [explained, setExplained] = useState("");

  async function runGemini() {
    const prompt = "How fat is the cat?";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    setExplained(response.text);
  }

  return (
    <div>
      <button className="explain-btn" onClick={runGemini}>
        Run Gemini
      </button>
      {explained ? (
        <p className="explained-text">{explained}</p>
      ) : (
        <div>Show nothing</div>
      )}
    </div>
  );
};

export default App;
