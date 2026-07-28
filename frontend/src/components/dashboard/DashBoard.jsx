import StatCard from "./StatCard";
import { motion } from "framer-motion";


function Dashboard({ history }) {
  if (history.length === 0) return null;

  const totalScans = history.length;

  const avgConfidence = (
    history.reduce((sum, item) => sum + item.confidence, 0) /
    totalScans
  ).toFixed(1);

  const recyclable = history.filter(
    (item) => item.prediction !== "trash"
  ).length;

  const counts = {};

  history.forEach((item) => {
    counts[item.prediction] =
      (counts[item.prediction] || 0) + 1;
  });

  const mostDetected = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  return (
    <section className="mx-auto mt-12 max-w-6xl px-6 transition-colors duration-500">

      <h2 className="mb-8 text-center text-4xl font-bold text-slate-900 dark:text-white">
        AI Statistics
      </h2>

     <motion.div
  className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
  >

        <StatCard
          title="Total Scans"
          value={totalScans}
          icon="📸"
        />

        <StatCard
          title="Average Confidence"
          value={`${avgConfidence}%`}
          icon="🎯"
        />

        <StatCard
          title="Most Detected"
          value={mostDetected}
          icon="♻️"
        />

        <StatCard
          title="Recyclable"
          value={recyclable}
          icon="🌱"
        />

      </motion.div>

    </section>
  );
}

export default Dashboard;