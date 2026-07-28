import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import UploadCard from "./components/upload/UploadCard";
import { predictWaste } from "./services/wasteServices";
import ResultCard from "./components/result/ResultCard";
import History from "./components/history/History";
import usePredictionHistory from "./hooks/usePredictionHistory";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const {
            history,
            addPrediction,
            clearHistory,
                             } = usePredictionHistory();
  const handlePrediction = async () => {
    if (!selectedImage) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await predictWaste(selectedImage);

      setResult(data);
     addPrediction(data);

    } catch (err) {
      console.error(err);
      setError("Prediction Failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <Hero />

      <UploadCard
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handlePrediction={handlePrediction}
        loading={loading}
      />
      {result && <ResultCard result={result} />}

      <History
            history={history}
            clearHistory={clearHistory}
          />
    </div>
  );
}

export default App;