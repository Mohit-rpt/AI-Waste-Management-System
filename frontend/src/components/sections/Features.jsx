import { Brain, Leaf, BarChart3, Bot, MoonStar, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Brain size={32} />,
    title: "AI Waste Classification",
    desc: "Upload an image and let AI instantly identify the waste category.",
  },
  {
    icon: <Bot size={32} />,
    title: "Gemini AI Assistant",
    desc: "Ask questions about recycling, sustainability, and waste disposal.",
  },
  {
    icon: <Leaf size={32} />,
    title: "Environmental Impact",
    desc: "Learn the recycling benefits and eco-friendly disposal methods.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Analytics Dashboard",
    desc: "Track previous predictions with charts and statistics.",
  },
  {
    icon: <MoonStar size={32} />,
    title: "Dark Mode",
    desc: "Modern responsive interface with light and dark themes.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Reliable Predictions",
    desc: "Powered by MobileNetV2 and FastAPI for fast and accurate results.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center text-4xl font-bold text-green-600"
      >
        🚀 Features
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-green-100 bg-white p-6 shadow-lg transition dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mb-4 text-green-600">{feature.icon}</div>

            <h3 className="mb-2 text-xl font-bold">
              {feature.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-300">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;