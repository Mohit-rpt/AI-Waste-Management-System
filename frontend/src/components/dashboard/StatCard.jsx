import { motion } from "framer-motion";

function StatCard({ title, value, icon }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      className="rounded-2xl bg-white p-6 shadow-lg"
    >
      ...
    </motion.div>
  );
}
export default StatCard;