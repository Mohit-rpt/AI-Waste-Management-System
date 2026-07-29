import impactData from "../../data/impactData";
import { generatePDF } from "../../utils/pdfGenerator";

function ReportButton({ result }) {
  const info = impactData[result.prediction.toLowerCase()];

  return (
    <button
      onClick={() => generatePDF({ result, info })}
      className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
    >
      📄 Download AI Report
    </button>
  );
}

export default ReportButton;