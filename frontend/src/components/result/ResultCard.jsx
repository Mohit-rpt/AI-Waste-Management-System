import { motion } from "framer-motion";
import { wasteInfo } from "../../utils/wasteInfo";
import ConfidenceBar from "./ConfidenceBar";

function ResultCard({ result }) {
 const info =
  wasteInfo[result.prediction.toLowerCase()] || {
    bin: "Unknown",
    recyclable: false,
    decomposition: "Unknown",
    ecoTip: "No information available.",
    description: "No description available.",
  };
  return (
    <motion.div
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

       <span
        className={`rounded-full px-3 py-1 text-sm font-semibold ${
            info.recyclable
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
        >
        {info.recyclable ? "♻ Recyclable" : "🗑 Non-Recyclable"}
        </span>
        <p className="text-slate-700 dark:text-slate-300">
          ⏳ <strong>Decomposition:</strong>{" "}
          {info.decomposition}
        </p>

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