function History({ history, clearHistory }) {
  if (history.length === 0) return null;

  return (
    <section className="mx-auto mt-10 max-w-xl">
      <div className="rounded-3xl bg-white p-6 shadow-xl">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Recent Predictions
          </h2>

          <button
            onClick={clearHistory}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        {history.map((item, index) => (
          <div
            key={index}
            className="mb-3 flex items-center justify-between rounded-xl bg-slate-100 p-3"
          >
            <span>♻ {item.prediction}</span>

            <span className="font-bold text-green-600">
              {item.confidence}%
            </span>
          </div>
        ))}

      </div>
    </section>
  );
}

export default History;