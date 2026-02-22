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

// ✅ Import all images
import pc1 from "../assets/pressConference/pc1.jpg";
import pc2 from "../assets/pressConference/pc2.jpg";
import pc3 from "../assets/pressConference/pc3.jpg";
import pc4 from "../assets/pressConference/pc4.jpg";
import pc5 from "../assets/pressConference/pc5.jpg";
import pc6 from "../assets/pressConference/pc6.jpg";
import pc7 from "../assets/pressConference/pc7.jpg";
import pc8 from "../assets/pressConference/pc8.jpg";
import pc9 from "../assets/pressConference/pc9.jpg";
import pc10 from "../assets/pressConference/pc10.jpg";
import pc11 from "../assets/pressConference/pc11.jpg";
import pc12 from "../assets/pressConference/pc12.jpg";
import pc13 from "../assets/pressConference/pc13.jpg";
import pc14 from "../assets/pressConference/pc14.jpg";

// ✅ Put in array with metadata
const images = [
  { src: pc1, title: "Opening Statement", date: "March 15, 2024", attendees: 45 },
  { src: pc2, title: "Media Q&A Session", date: "March 15, 2024", attendees: 52 },
  { src: pc3, title: "Key Announcement", date: "March 15, 2024", attendees: 48 },
  { src: pc4, title: "Panel Discussion", date: "March 15, 2024", attendees: 38 },
  { src: pc5, title: "Press Briefing", date: "March 15, 2024", attendees: 41 },
  { src: pc6, title: "Interview Session", date: "March 15, 2024", attendees: 33 },
  { src: pc7, title: "Networking Moment", date: "March 15, 2024", attendees: 29 },
  { src: pc8, title: "Keynote Speech", date: "March 15, 2024", attendees: 56 },
  { src: pc9, title: "Media Coverage", date: "March 15, 2024", attendees: 44 },
  { src: pc10, title: "Behind the Scenes", date: "March 15, 2024", attendees: 27 },
  { src: pc11, title: "Press Registration", date: "March 15, 2024", attendees: 62 },
  { src: pc12, title: "Live Streaming", date: "March 15, 2024", attendees: 35 },
  { src: pc13, title: "Closing Remarks", date: "March 15, 2024", attendees: 49 },
  { src: pc14, title: "Group Photo", date: "March 15, 2024", attendees: 58 }
];

export default function PressConferenceGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'compact'

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
      transition: {
        staggerChildren: 0.1
      }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12">
        
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <Camera className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-white/90">Media Gallery</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Press Conference
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Capturing the defining moments, impactful statements, and exclusive media interactions
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
              { icon: Users, label: "Attendees", value: "617+" },
              { icon: Calendar, label: "Event Date", value: "March 2024" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10">
                <stat.icon className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-end mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl transition-all ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4 inline mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`px-4 py-2 rounded-xl transition-all ${
                viewMode === 'compact' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Maximize2 className="w-4 h-4 inline mr-2" />
              Compact
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
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
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image Info - Only show in grid mode */}
              {viewMode === 'grid' && (
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-semibold text-white mb-1">{image.title}</h3>
                  <p className="text-sm text-white/70">{image.date}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-white/60">{image.attendees} attendees</span>
                  </div>
                </div>
              )}
              
              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-purple-400/50 rounded-2xl transition-all duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
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

            {/* Image Container */}
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
              
              {/* Image Details */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-md rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedImage.title}</h3>
                    <p className="text-white/70">{selectedImage.date}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{selectedImage.attendees} attendees</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white/80">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}