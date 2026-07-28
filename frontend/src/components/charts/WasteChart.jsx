import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#6b7280",
];

function WasteChart({ history }) {
  if (history.length === 0) return null;

  const counts = {};

  history.forEach((item) => {
    counts[item.prediction] =
      (counts[item.prediction] || 0) + 1;
  });

  const data = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <section className="mx-auto mt-12 max-w-5xl rounded-3xl bg-white p-6 shadow-xl">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Waste Distribution
      </h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={140}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default WasteChart;