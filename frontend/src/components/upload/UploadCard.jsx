import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

function UploadCard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    fileInputRef.current.value = "";
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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">

       <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-3xl border-2 border-dashed p-10 shadow-lg transition-all duration-300 ${
                dragActive
                ? "border-green-600 bg-green-100 scale-[1.02]"
                : "border-green-300 bg-green-50"
            }`}
            >

          {!selectedImage ? (
            <div className="flex flex-col items-center text-center">

              <FaCloudUploadAlt
                size={70}
                className="mb-6 text-green-600"
              />

              <h2 className="text-3xl font-bold">
                Upload Waste Image
              </h2>

              <p className="mt-3 text-gray-600">
                JPG, JPEG or PNG
              </p>

              <button
                onClick={() => fileInputRef.current.click()}
                className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Browse Image
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

            </div>
          ) : (
            <div className="flex flex-col items-center">

              <img
                src={URL.createObjectURL(selectedImage)}
                alt="preview"
                className="h-72 rounded-2xl object-cover shadow-md"
              />

              <p className="mt-6 font-medium">
                {selectedImage.name}
              </p>

              <div className="mt-8 flex gap-4">

                <button
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Analyse Image
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
    </section>
  );
}

export default UploadCard;