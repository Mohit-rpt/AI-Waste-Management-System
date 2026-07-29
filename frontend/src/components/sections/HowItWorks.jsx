import { motion } from "framer-motion";
import { Upload, ScanSearch, Recycle, Leaf } from "lucide-react";

const steps = [
  {
    icon: <Upload size={40} />,
    title: "Upload Image",
    desc: "Choose an image of waste from your computer.",
  },
  {
    icon: <ScanSearch size={40} />,
    title: "AI Analysis",
    desc: "The AI model analyses and identifies the waste type.",
  },
  {
    icon: <Recycle size={40} />,
    title: "View Result",
    desc: "See confidence score, recycling info and environmental impact.",
  },
  {
    icon: <Leaf size={40} />,
    title: "Recycle Smartly",
    desc: "Follow AI recommendations to dispose of waste responsibly.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-green-50 py-20 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-4xl font-bold text-green-600"
        >
          ⚙️ How It Works
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-4">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-slate-800"
            >
              <div className="mb-5 flex justify-center text-green-600">
                {step.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold">
                Step {index + 1}
              </h3>

              <h4 className="mb-3 font-semibold">
                {step.title}
              </h4>

              <p className="text-slate-600 dark:text-slate-300">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;