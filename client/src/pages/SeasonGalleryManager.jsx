import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Trash2,
  X,
  ImagePlus,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeasonOneImages,
  fetchSeasonTwoImages,
  uploadSeasonOneImages,
  uploadSeasonTwoImages,
  deleteSeasonOneImage,
  deleteSeasonTwoImage,
} from "../store/slices/seasonImagesSlice";

export default function SeasonGalleryManager() {
  const dispatch = useDispatch();
  
  const [activeSeason, setActiveSeason] = useState("season1"); // 'season1' or 'season2'
  const [previewFiles, setPreviewFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { 
    seasonOneImages, 
    seasonTwoImages, 
    uploading, 
    loading 
  } = useSelector((state) => state.seasonImages);

  // Get current season images based on active tab
  const currentImages = activeSeason === "season1" ? seasonOneImages : seasonTwoImages;
  
  // Get appropriate fetch and upload actions
  const fetchAction = activeSeason === "season1" ? fetchSeasonOneImages : fetchSeasonTwoImages;
  const uploadAction = activeSeason === "season1" ? uploadSeasonOneImages : uploadSeasonTwoImages;
  const deleteAction = activeSeason === "season1" ? deleteSeasonOneImage : deleteSeasonTwoImage;

  /* ================= FETCH ================= */
  useEffect(() => {
    // Fetch both seasons on mount
    dispatch(fetchSeasonOneImages());
    dispatch(fetchSeasonTwoImages());
  }, [dispatch]);

  /* ================= FILE SELECT ================= */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewFiles(previews);
  };

  /* ================= UPLOAD ================= */
  const handleUpload = () => {
    const files = previewFiles.map((p) => p.file);
    dispatch(uploadAction(files));
    setPreviewFiles([]);
  };

  /* ================= DELETE ================= */
  const handleDelete = (img) => {
    dispatch(deleteAction(img));
  };

  /* ================= LIGHTBOX ================= */
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(currentImages[index]);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % currentImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(currentImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(currentImages[newIndex]);
  };

  // Clear previews when switching seasons
  useEffect(() => {
    setPreviewFiles([]);
  }, [activeSeason]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2472] via-[#1E293B] to-[#0A2472] text-white p-8">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black bg-gradient-to-r from-white to-[#94A3B8] bg-clip-text text-transparent">
          Season Gallery Manager
        </h1>
        <p className="text-[#F1F5F9] mt-3">
          Upload, preview and manage tournament images
        </p>
      </div>

      {/* ================= SEASON TABS ================= */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-1 inline-flex">
          <button
            onClick={() => setActiveSeason("season1")}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeSeason === "season1"
                ? "bg-[#0A2472] text-white shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            Season One
            <span className="ml-2 bg-white/10 px-2 py-0.5 rounded-full text-sm">
              {seasonOneImages.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSeason("season2")}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeSeason === "season2"
                ? "bg-[#0A2472] text-white shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            Season Two
            <span className="ml-2 bg-white/10 px-2 py-0.5 rounded-full text-sm">
              {seasonTwoImages.length}
            </span>
          </button>
        </div>
      </div>

      {/* ================= UPLOAD CARD ================= */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 mb-10">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl p-10 cursor-pointer hover:border-white/40 transition">
          <ImagePlus className="w-10 h-10 mb-3" />
          <p>Select Images for {activeSeason === "season1" ? "Season One" : "Season Two"}</p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* PREVIEW */}
        {previewFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <h3 className="mb-3 text-lg flex items-center gap-2">
              <ImagePlus className="w-4 h-4" />
              Preview ({previewFiles.length} images)
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {previewFiles.map((p, i) => (
                <div key={i} className="relative">
                  <img
                    src={p.url}
                    alt={`preview-${i}`}
                    className="rounded-xl aspect-square object-cover"
                  />
                  <button
                    onClick={() => {
                      URL.revokeObjectURL(p.url);
                      setPreviewFiles(previewFiles.filter((_, index) => index !== i));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-6 flex items-center gap-2 bg-[#0A2472] hover:bg-[#081c55] px-6 py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4" />
              {uploading 
                ? "Uploading..." 
                : `Upload to ${activeSeason === "season1" ? "Season One" : "Season Two"}`}
            </button>
          </motion.div>
        )}
      </div>

      {/* ================= GALLERY ================= */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          {currentImages.length === 0 ? (
            <div className="text-center py-20 text-white/50">
              <ImagePlus className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-xl">No images in {activeSeason === "season1" ? "Season One" : "Season Two"}</p>
              <p className="text-sm mt-2">Upload some images to get started</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              {currentImages.map((img, index) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${img}`}
                    alt={`gallery-${index}`}
                    onClick={() => openLightbox(index)}
                    className="rounded-2xl aspect-square object-cover w-full h-full"
                  />

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(img)}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform hover:scale-110"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Image number indicator */}
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition">
                    {index + 1} / {currentImages.length}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-[#0A2472]/95 backdrop-blur-xl flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              onClick={prevImage} 
              className="absolute left-6 bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
              disabled={currentImages.length === 1}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${selectedImage}`}
              alt="lightbox"
              className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain"
            />

            <button 
              onClick={nextImage} 
              className="absolute right-6 bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
              disabled={currentImages.length === 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image counter in lightbox */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              {currentIndex + 1} / {currentImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}