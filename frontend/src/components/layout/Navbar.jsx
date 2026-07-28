import { FaGithub } from "react-icons/fa";
import { IoLeaf } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white shadow-md">
            <IoLeaf size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              WasteWise AI
            </h1>

            <p className="text-xs text-gray-500">
              Smart Waste Classification
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 text-gray-700 font-medium md:flex">
          <li className="cursor-pointer transition hover:text-green-600">
            Home
          </li>

          <li className="cursor-pointer transition hover:text-green-600">
            Features
          </li>

          <li className="cursor-pointer transition hover:text-green-600">
            How It Works
          </li>
        </ul>

        {/* Right Side */}
        <button
        onClick={() => setDarkMode(!darkMode)}
        className="rounded-full bg-green-600 p-3 text-white transition hover:bg-green-700"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
        <div className="flex items-center gap-3">

          <a
            href="https://github.com/Mohit-rpt/AI-Waste-Management-System"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-white transition hover:bg-green-700 md:flex"
          >
            <FaGithub size={18} />
            GitHub
          </a>

          <button className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden">
            <HiOutlineMenuAlt3 size={26} />
          </button>

        </div>

      </nav>
    </header>
  );
}

export default Navbar;