import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

function UploadCard({
    selectedImage,
    setSelectedImage,
    handlePrediction,
    loading
})  {

  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
  };

 const removeImage = () => {
  setSelectedImage(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
  const handleDragOver = (e) => {
  e.preventDefault();
  setDragActive(true);
};

const handleDragLeave = (e) => {
  e.preventDefault();
  setDragActive(false);
};

const handleDrop = (e) => {
  e.preventDefault();
  setDragActive(false);

  const file = e.dataTransfer.files[0];

  if (!file) return;

  setSelectedImage(file);
};

  return (
   <motion.section
  className="bg-white dark:bg-slate-900 transition-colors duration-500 py-20"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
   >

    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleImageChange}
      className="hidden"
    />
      <div className="mx-auto max-w-4xl px-6">

       <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-3xl border-2 border-dashed p-10 shadow-lg transition-all duration-300 ${
               dragActive
? "border-green-600 bg-green-100 dark:bg-slate-700 scale-[1.02]"
: "border-green-300 bg-green-50 dark:border-slate-700 dark:bg-slate-800"
            }`}
            >

          {!selectedImage ? (
            <div className="flex flex-col items-center text-center">

              <FaCloudUploadAlt
                size={70}
                className="mb-6 text-green-600"
              />

              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Upload Waste Image
              </h2>

              <p className="mt-3 text-gray-600 dark:text-slate-300">
                JPG, JPEG or PNG
              </p>

              <button
                onClick={() => fileInputRef.current.click()}
                className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Browse Image
              </button>

            

            </div>
          ) : (
            <div className="flex flex-col items-center">

              <img
                src={URL.createObjectURL(selectedImage)}
                alt="preview"
                className="h-72 rounded-2xl object-cover shadow-md"
              />

              <p className="mt-6 font-medium text-slate-900 dark:text-white">
                {selectedImage.name}
              </p>

              <div className="mt-8 flex gap-4">

                <button
                    onClick={handlePrediction}
                    disabled={loading}
                    className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
                >
                    {loading ? "Analysing..." : "Analyse Image"}
                </button>

                <button
                  onClick={removeImage}
                  className="rounded-xl bg-red-500 px-6 py-3 text-white hover:bg-red-600"
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </motion.section>
  );
}

export default UploadCard;