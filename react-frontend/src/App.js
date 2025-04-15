import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://arslaanml-sentiment-space.hf.space/run/predict_sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [text] }),
      });
  
      const result = await res.json();
      const sentiment = result.data?.[0]?.sentiment || "Unknown";
      const confidence = result.data?.[0]?.confidence || "N/A";
  
      setResult({
        sentiment,
        confidence,
      });
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setResult({ sentiment: "Error", confidence: "N/A" });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="App">
      <h1>Sentiment Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
        <br />
        <button type="submit" disabled={loading || !text.trim()}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {result && (
        <div className="result">
          <h2>Result</h2>
          <p>
            <strong>Sentiment:</strong> {result.sentiment}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
