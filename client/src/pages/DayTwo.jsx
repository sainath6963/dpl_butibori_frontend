import React, { useState } from "react";
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
  Users
} from "lucide-react";

// ✅ Import Trial & Selection Images
import img1 from "../assets/day2/File Name Lost (84).jpg";
import img2 from "../assets/day2/File Name Lost (87).jpg";
import img3 from "../assets/day2/File Name Lost (92).jpg";
import img4 from "../assets/day2/File Name Lost (93).jpg";
import img5 from "../assets/day2/File Name Lost (94).jpg";
import img6 from "../assets/day2/File Name Lost (96).jpg";
import img7 from "../assets/day2/File Name Lost (97).jpg";
import img9 from "../assets/day2/File Name Lost (98).jpg";
import img10 from "../assets/day2/IMG_0406.jpg";
import img11 from "../assets/day2/IMG_0409.jpg";
import img12 from "../assets/day2/IMG_0420.jpg";
import img13 from "../assets/day2/IMG_0425.jpg";
import img14 from "../assets/day2/IMG_0425.jpg";


// ✅ Metadata
const images = [
  { src: img1 },
  { src: img2 },
  { src: img3 },
  { src: img4 },
  { src: img5 },
  { src: img6 },
  { src: img7 },
  { src: img9 },
  { src: img10 },
  { src: img11 },
  { src: img12 },
  { src: img13 },
  { src: img14 },
  
].map((img, index) => ({
  ...img,
  title: `Day 2 – Sports Tournament Highlights`,
  date: "June 2025",
  attendees: "500+"
}));

export default function DayTwo() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2472] via-[#1E293B] to-[#0A2472] text-white">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#94A3B8]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12">
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <Camera className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">DPL 2025 Gallery</span>
            <Sparkles className="w-4 h-4 text-[#94A3B8]" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent">
              Day 2 – Tournament Highlights
            </span>
          </h1>
          
          <p className="text-xl text-[#F1F5F9] max-w-2xl mx-auto leading-relaxed">
            Experience the electrifying start of the tournament — powerful performances, unmatched team spirit, and unforgettable moments from Day 2.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { icon: Camera, label: "Photos", value: images.length },
              { icon: Users, label: "Participants", value: "500+" },
              { icon: Calendar, label: "Event Date", value: "June 2025" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10">
                <stat.icon className="w-5 h-5 text-white" />
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-[#F1F5F9]">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="flex justify-end mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl transition-all ${
                viewMode === 'grid' 
                  ? 'bg-[#0A2472] text-white' 
                  : 'text-[#F1F5F9] hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4 inline mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`px-4 py-2 rounded-xl transition-all ${
                viewMode === 'compact' 
                  ? 'bg-[#0A2472] text-white' 
                  : 'text-[#F1F5F9] hover:text-white'
              }`}
            >
              <Maximize2 className="w-4 h-4 inline mr-2" />
              Compact
            </button>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'
          }`}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => openLightbox(index)}
              className={`group cursor-pointer relative overflow-hidden rounded-2xl ${
                viewMode === 'compact' ? 'aspect-square' : 'aspect-[4/5]'
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2472] via-[#0A2472]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {viewMode === 'grid' && (
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-semibold text-white mb-1">{image.title}</h3>
                  <p className="text-sm text-[#F1F5F9]">{image.date}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="w-3 h-3 text-white" />
                    <span className="text-xs text-[#F1F5F9]">{image.attendees} participants</span>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-2xl transition-all duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

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
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-7xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[85vh] max-w-full object-contain rounded-2xl"
              />
              
              <div className="absolute bottom-6 left-6 right-6 bg-[#1E293B]/80 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedImage.title}</h3>
                    <p className="text-[#F1F5F9]">{selectedImage.date}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-white">{selectedImage.attendees} participants</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#1E293B]/80 backdrop-blur-md px-4 py-2 rounded-full text-white/80 border border-white/10">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}