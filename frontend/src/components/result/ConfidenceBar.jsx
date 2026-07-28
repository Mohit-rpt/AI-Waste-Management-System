function ConfidenceBar({ confidence }) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between">
        <span className="font-medium">Confidence</span>
        <span className="font-bold text-green-600">
          {confidence}%
        </span>
      </div>

      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-green-600 transition-all duration-700"
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}

export default ConfidenceBar;