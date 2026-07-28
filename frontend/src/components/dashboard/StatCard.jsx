function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-4 text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold text-green-600">
        {value}
      </p>
    </div>
  );
}

export default StatCard;