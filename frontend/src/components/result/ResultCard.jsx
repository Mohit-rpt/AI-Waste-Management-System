import { wasteInfo } from "../../utils/wasteInfo";

function ResultCard({ result }) {
  const info = wasteInfo[result.prediction.toLowerCase()];

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-white p-8 shadow-xl">

      <h2 className="text-4xl font-bold text-green-700">
        ♻ {result.prediction}
      </h2>

      <p className="mt-4 text-lg">
        Confidence:
        <span className="font-bold text-green-600">
          {" "} {result.confidence}%
        </span>
      </p>

      <div className="mt-6 space-y-3">

        <p>
          🗑 <strong>Bin:</strong> {info.bin}
        </p>

        <p>
          ♻ <strong>Recyclable:</strong>{" "}
          {info.recyclable ? "Yes" : "No"}
        </p>

        <p>
          ⏳ <strong>Decomposition:</strong>{" "}
          {info.decomposition}
        </p>

        <p>
          🌱 <strong>Eco Tip:</strong>{" "}
          {info.ecoTip}
        </p>

        <p>
          📖 <strong>Description:</strong>{" "}
          {info.description}
        </p>

      </div>

    </div>
  );
}

export default ResultCard;