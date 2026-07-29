import { motion } from "framer-motion";
import impactData from "../../data/impactData";
import ConfidenceBar from "./ConfidenceBar";
import { generatePDF } from "../../utils/pdfGenerator";
import { useRef } from "react";

function ResultCard({ result }) {
 const info =
  impactData[result.prediction.toLowerCase()] || {
    title: "Unknown",
    bin: "Unknown",
    recyclable: false,
    decomposition: "Unknown",
    co2Saved: "N/A",
    waterSaved: "N/A",
    energySaved: "N/A",
    ecoTip: "No information available.",
    description: "No description available.",
  };
  const reportRef = useRef(null);

  return (
    <motion.div
    ref={reportRef}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
  className="mx-auto mt-10 max-w-xl rounded-3xl border border-green-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-2xl transition-colors duration-500">

      <h2 className="text-4xl font-bold text-green-600">
        ♻ {result.prediction}
      </h2>

     <ConfidenceBar confidence={result.confidence} />

      <div className="mt-6 space-y-3">

        <p className="text-slate-700 dark:text-slate-300">
          🗑 <strong>Bin:</strong> {info.bin}
        </p>

       <div className="mt-2">
        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            info.recyclable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {info.recyclable ? "✅ Recyclable" : "❌ Non-Recyclable"}
        </span>
      </div>
        <p className="text-slate-700 dark:text-slate-300">
          ⏳ <strong>Decomposition:</strong>{" "}
          {info.decomposition}
        </p>
        <div className="mt-6 rounded-2xl border border-green-200 dark:border-slate-700 bg-green-50 dark:bg-slate-900 p-5">

  <h3 className="mb-4 text-xl font-bold text-green-700 dark:text-green-400">
    🌍 Environmental Impact
  </h3>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

    <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow">
      <p className="text-3xl">🌱</p>
      <p className="font-semibold">CO₂ Saved</p>
      <p>{info.co2Saved}</p>
    </div>

    <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow">
      <p className="text-3xl">💧</p>
      <p className="font-semibold">Water Saved</p>
      <p>{info.waterSaved}</p>
    </div>

    <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow">
      <p className="text-3xl">⚡</p>
      <p className="font-semibold">Energy Saved</p>
      <p>{info.energySaved}</p>
    </div>

  </div>

</div>

        <p className="text-slate-700 dark:text-slate-300">
          🌱 <strong>Eco Tip:</strong>{" "}
          {info.ecoTip}
        </p>

        <p className="text-slate-700 dark:text-slate-300">
          📖 <strong>Description:</strong>{" "}
          {info.description}
        </p>
        
                </div>

    </motion.div>
  );
}

export default ResultCard;