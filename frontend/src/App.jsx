import Navbar from "./components/layout/Navbar.jsx";
import Hero from "./components/sections/Hero.jsx";
import UploadCard from "./components/upload/UploadCard.jsx"
function App() {
   return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero/>
      <UploadCard/>
    </div>
  );
}

export default App;