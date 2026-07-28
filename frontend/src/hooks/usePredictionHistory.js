import { useEffect, useState } from "react";

export default function usePredictionHistory() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("predictionHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("predictionHistory", JSON.stringify(history));
  }, [history]);

  const addPrediction = (prediction) => {
    setHistory((prev) => [prediction, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addPrediction,
    clearHistory,
  };
}