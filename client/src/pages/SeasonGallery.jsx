import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid,
  Sparkles,
  Camera,
  Calendar,
  Users,
  Trophy,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchSeasonOneImages,
  fetchSeasonTwoImages,
} from "../store/slices/seasonImagesSlice";

export default function SeasonGallery() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { seasonOneImages, seasonTwoImages, loading } =
    useSelector((state) => state.seasonImages);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("grid");

  const isSeasonOne = location.pathname.includes("seasononeimgs");

  useEffect(() => {
    if (isSeasonOne) {
      dispatch(fetchSeasonOneImages());
    } else {
      dispatch(fetchSeasonTwoImages());
    }
  }, [dispatch, isSeasonOne]);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // 🔥 Build images with metadata
  const images = useMemo(() => {
    const backendImages = isSeasonOne
      ? seasonOneImages
      : seasonTwoImages;

    return backendImages.map((img) => {
      const fileName = img.split("/").pop();
      return {
        src: `${BASE_URL}/uploads/${
          isSeasonOne ? "SeasonOne" : "SeasonTwo"
        }/${fileName}`,
        title: isSeasonOne
          ? "Season 1 – Tournament Kickoff"
          : "Season 2 – Grand Championship",
        date: isSeasonOne ? "June 2025" : "December 2025",
        attendees: isSeasonOne ? "500+" : "800+",
      };
    });
  }, [seasonOneImages, seasonTwoImages, isSeasonOne, BASE_URL]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2472] via-[#1E293B] to-[#0A2472] text-white">

      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#94A3B8]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <Trophy className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">
              {isSeasonOne
                ? "DPL 2026 – Season 1 Gallery"
                : "DPL 2026 – Season 2 Gallery"}
            </span>
            <Sparkles className="w-4 h-4 text-[#94A3B8]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent">
              {isSeasonOne
                ? "Season 1 – Tournament Kickoff"
                : "Season 2 – The Grand Championship"}
            </span>
          </h1>

          <p className="text-xl text-[#F1F5F9] max-w-2xl mx-auto leading-relaxed">
            {isSeasonOne
              ? "Relive the thrilling opening matches, powerful performances and unforgettable highlights from Season 1."
              : "Witness the intense battles, electrifying moments and glorious championship highlights from Season 2."}
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { icon: Camera, label: "Photos", value: images.length },
              {
                icon: Users,
                label: "Participants",
                value: isSeasonOne ? "500+" : "800+",
              },
              {
                icon: Calendar,
                label: "Event Date",
                value: isSeasonOne ? "June 2025" : "December 2025",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10"
              >
                <stat.icon className="w-5 h-5 text-white" />
                <div>
                  <div className="text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#F1F5F9]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-end mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-xl ${
                viewMode === "grid"
                  ? "bg-[#0A2472]"
                  : "hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4 inline mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode("compact")}
              className={`px-4 py-2 rounded-xl ${
                viewMode === "compact"
                  ? "bg-[#0A2472]"
                  : "hover:text-white"
              }`}
            >
              <Maximize2 className="w-4 h-4 inline mr-2" />
              Compact
            </button>
          </div>
        </div>

        {/* ================= GRID ================= */}
        {loading ? (
          <div className="text-center text-xl">
            Loading Images...
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
            }`}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => openLightbox(index)}
                className="group cursor-pointer relative overflow-hidden rounded-2xl"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A2472]/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 p-3 bg-white/10 rounded-full"
            >
              <ChevronLeft />
            </button>

            <motion.img
              src={selectedImage.src}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 p-3 bg-white/10 rounded-full"
            >
              <ChevronRight />
            </button>

            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-full"
            >
              <X />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}