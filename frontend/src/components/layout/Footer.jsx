import { Heart } from "lucide-react";
import { FaGithub } from "react-icons/fa";
function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-8 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center">

        <h2 className="text-2xl font-bold text-green-600">
          WasteWise AI 🌱
        </h2>

        <p className="text-slate-600 dark:text-slate-300">
          AI-Powered Waste Classification & Recycling Assistant
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Mohit-rpt"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-green-600"
          >
            <FaGithub size={18} />
          </a>

          
        </div>

        <div className="h-px w-full bg-slate-200 dark:bg-slate-700" />

        <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          Built with <Heart size={16} className="fill-red-500 text-red-500" />
          by <span className="font-semibold text-green-600">Mohit Rajput</span>
        </p>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} WasteWise AI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;