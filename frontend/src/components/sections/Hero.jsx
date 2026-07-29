import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";


function Hero() {
  return (
   <motion.section
   id="home"
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-200 blur-3xl opacity-30"></div>

      <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-emerald-100 blur-3xl opacity-30"></div>

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-5xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-7xl"
        >
          AI Powered{" "}
          <span className="text-green-600">
            Waste Classification
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300"
        >
          Upload an image and let artificial intelligence identify
          waste instantly with smart disposal recommendations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700">
            Upload Image
          </button>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white px-8 py-4 font-semibold transition hover:border-green-600 hover:text-green-600">
            Learn More
            <FaArrowRight />
          </button>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default Hero;