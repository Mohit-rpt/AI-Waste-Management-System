import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import UploadCard from "./components/upload/UploadCard";
import { predictWaste } from "./services/wasteServices";
import ResultCard from "./components/result/ResultCard";
import History from "./components/history/History";
import usePredictionHistory from "./hooks/usePredictionHistory";
import Dashboard from "./components/dashboard/DashBoard";
import WasteChart from "./components/charts/WasteChart";
import ChatBot from "./components/ui/ChatBot";
import ReportButton from "./components/report/ReportButton";
import Features from "./components/sections/Features";
import HowItWorks from "./components/sections/HowItWorks";
import Footer from "./components/layout/Footer";

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
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-900 dark:text-white">

      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <UploadCard
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handlePrediction={handlePrediction}
        loading={loading}
      />
     {result && (
  <>
    <ResultCard result={result} />
    <div className="flex justify-center">
      <ReportButton result={result} />
    </div>
  </>
)}

     
          
      <Dashboard history={history} />

      <WasteChart history={history} />

       <History
            history={history}
            clearHistory={clearHistory}
          />
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;