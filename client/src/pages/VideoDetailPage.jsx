// // components/Admin/VideoManagement.jsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllVideos } from '../store/slices/videoSlice';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Plus, Trash2, Edit, Eye, CheckCircle, XCircle, X, Play } from 'lucide-react';
// import { toast } from 'react-toastify';

// const VideoManagement = () => {
//   const dispatch = useDispatch();
//   const { videos, loading } = useSelector((state) => state.videos);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'table'
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     videoUrl: '',
//     category: 'Highlights',
//     isPublished: true
//   });

//   useEffect(() => {
//     dispatch(getAllVideos());
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const extractYoutubeId = (url) => {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return (match && match[2].length === 11) ? match[2] : null;
//   };



//   const playVideo = (video) => {
//     setSelectedVideo(video);
//   };

//   const closeVideoPlayer = () => {
//     setSelectedVideo(null);
//   };

//   // Gallery View Component
//   const GalleryView = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {videos.map((video, index) => (
//         <motion.div
//           key={video._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.05 }}
//           className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
//           onClick={() => playVideo(video)}
//         >
//           <div className="relative aspect-video">
//             <img
//               src={video.thumbnail}
//               alt={video.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//               <Play size={48} className="text-white" />
//             </div>
//             {!video.isPublished && (
//               <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500/90 text-white text-xs rounded-full">
//                 Draft
//               </div>
//             )}
//           </div>
//           <div className="p-4">
//             <div className="flex justify-between items-start mb-2">
//               <h3 className="text-white font-semibold line-clamp-1">{video.title}</h3>
//               <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs whitespace-nowrap ml-2">
//                 {video.category}
//               </span>
//             </div>
//             <p className="text-gray-400 text-sm line-clamp-2 mb-3">{video.description}</p>
//        <div className="flex justify-between items-center">
//   <span className="text-gray-500 text-xs">
//     {new Date(video.uploadDate).toLocaleDateString()}
//   </span>
// </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );

//   // Table View Component (keeping your original table view as an option)
//   const TableView = () => (
//     <div className="bg-gray-800 rounded-xl overflow-hidden">
//       <table className="w-full">
//         <thead className="bg-gray-700">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Video</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Upload Date</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-700">
//           {videos.map((video) => (
//             <tr 
//               key={video._id} 
//               className="hover:bg-gray-700/50 cursor-pointer"
//               onClick={() => playVideo(video)}
//             >
//               <td className="px-6 py-4">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-16 h-9 object-cover rounded"
//                   />
//                   <div>
//                     <p className="text-white font-medium">{video.title}</p>
//                     <p className="text-gray-400 text-sm truncate max-w-xs">{video.description}</p>
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">
//                   {video.category}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 {video.isPublished ? (
//                   <span className="flex items-center gap-1 text-green-400">
//                     <CheckCircle size={16} />
//                     Published
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-1 text-yellow-400">
//                     <XCircle size={16} />
//                     Draft
//                   </span>
//                 )}
//               </td>
//               <td className="px-6 py-4 text-gray-300">
//                 {new Date(video.uploadDate).toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => playVideo(video)}
//                     className="p-2 text-blue-400 hover:text-blue-300 transition"
//                   >
//                     <Play size={18} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   // Video Player Modal
//   const VideoPlayerModal = () => (
//     <AnimatePresence>
//       {selectedVideo && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-black/90"
//             onClick={closeVideoPlayer}
//           />
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden"
//           >
//             <div className="absolute top-4 right-4 z-10 flex gap-2">
//               <button
//                 onClick={closeVideoPlayer}
//                 className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="aspect-video">
//               <iframe
//                 width="100%"
//                 height="100%"
//                 src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
//                 title={selectedVideo.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; ; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full"
//               />
//             </div>
            
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
//                   <div className="flex gap-2">
//                     <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
//                       {selectedVideo.category}
//                     </span>
//                     {selectedVideo.isPublished ? (
//                       <span className="flex items-center gap-1 text-green-400 text-sm">
//                         <CheckCircle size={16} />
//                         Published
//                       </span>
//                     ) : (
//                       <span className="flex items-center gap-1 text-yellow-400 text-sm">
//                         <XCircle size={16} />
//                         Draft
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <p className="text-gray-300">{selectedVideo.description}</p>
//               <p className="text-gray-500 text-sm mt-4">
//                 Uploaded on {new Date(selectedVideo.uploadDate).toLocaleDateString()}
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-white">Video Management</h1>
//         <div className="flex gap-3">
//           {/* View Toggle */}
//           <div className="flex bg-gray-800 rounded-lg p-1">
//             <button
//               onClick={() => setViewMode('gallery')}
//               className={`px-4 py-2 rounded-lg transition ${
//                 viewMode === 'gallery' 
//                   ? 'bg-blue-600 text-white' 
//                   : 'text-gray-400 hover:text-white'
//               }`}
//             >
//               Gallery
//             </button>
//             <button
//               onClick={() => setViewMode('table')}
//               className={`px-4 py-2 rounded-lg transition ${
//                 viewMode === 'table' 
//                   ? 'bg-blue-600 text-white' 
//                   : 'text-gray-400 hover:text-white'
//               }`}
//             >
//               Table
//             </button>
//           </div>
          
//         </div>
//       </div>

//       {/* Videos Display */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       ) : videos.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-400 text-lg">No videos found. Click "Add Video" to get started!</p>
//         </div>
//       ) : (
//         viewMode === 'gallery' ? <GalleryView /> : <TableView />
//       )}

//       {/* Video Player Modal */}
//       <VideoPlayerModal />

//       {/* Add Video Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/60" onClick={() => setShowAddModal(false)} />
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="relative bg-gray-800 rounded-xl p-6 max-w-2xl w-full"
//           >
//             <h2 className="text-xl font-bold text-white mb-4">Add New Video</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">YouTube URL *</label>
//                 <input
//                   type="url"
//                   name="videoUrl"
//                   value={formData.videoUrl}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="https://youtu.be/..."
//                   className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Highlights">Highlights</option>
//                     <option value="Full Match">Full Match</option>
//                     <option value="Interview">Interview</option>
//                     <option value="Analysis">Analysis</option>
//                     <option value="Training">Training</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
//                   <label className="flex items-center gap-2 text-white">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="w-4 h-4"
//                     />
//                     Published
//                   </label>
//                 </div>
//               </div>
//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {loading ? 'Adding...' : 'Add Video'}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoManagement;

// components/Admin/VideoManagement.jsx

// components/Admin/VideoManagement.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideos } from '../store/slices/videoSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Eye, CheckCircle, XCircle, X, Play } from 'lucide-react';
import { toast } from 'react-toastify';

const VideoManagement = () => {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.videos);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'table'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    category: 'Highlights',
    isPublished: true
  });

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };



  const playVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  // Gallery View Component
  const GalleryView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-[#1E293B] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group border border-[#E2E8F0]/10"
          onClick={() => playVideo(video)}
        >
          <div className="relative aspect-video">
         <img
  src={
    video.thumbnail ||
    `https://img.youtube.com/vi/${
      video.videoId || video.youtubeId
    }/mqdefault.jpg`
  }
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0A2472]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play size={48} className="text-white" />
            </div>
            {!video.isPublished && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-[#94A3B8] text-[#0A2472] text-xs rounded-full">
                Draft
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-semibold line-clamp-1">{video.title}</h3>
              <span className="px-2 py-1 bg-[#0A2472] text-white rounded-full text-xs whitespace-nowrap ml-2">
                {video.category}
              </span>
            </div>
            <p className="text-[#F1F5F9] text-sm line-clamp-2 mb-3">{video.description}</p>
       <div className="flex justify-between items-center">
  <span className="text-[#94A3B8] text-xs">
    {new Date(video.uploadDate).toLocaleDateString()}
  </span>
</div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Table View Component (keeping your original table view as an option)
  const TableView = () => (
    <div className="bg-[#1E293B] rounded-xl overflow-hidden border border-[#E2E8F0]/10">
      <table className="w-full">
        <thead className="bg-[#0A2472]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Video</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Upload Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]/10">
          {videos.map((video) => (
            <tr 
              key={video._id} 
              className="hover:bg-[#0A2472]/20 cursor-pointer transition-colors"
              onClick={() => playVideo(video)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
  src={
    video.thumbnail ||
    `https://img.youtube.com/vi/${
      video.videoId || video.youtubeId
    }/mqdefault.jpg`
  }
                    alt={video.title}
                    className="w-16 h-9 object-cover rounded"
                  />
                  <div>
                    <p className="text-white font-medium">{video.title}</p>
                    <p className="text-[#F1F5F9] text-sm truncate max-w-xs">{video.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-[#0A2472] text-white rounded-full text-xs">
                  {video.category}
                </span>
              </td>
              <td className="px-6 py-4">
                {video.isPublished ? (
                  <span className="flex items-center gap-1 text-white">
                    <CheckCircle size={16} className="text-white" />
                    Published
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[#94A3B8]">
                    <XCircle size={16} className="text-[#94A3B8]" />
                    Draft
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-[#F1F5F9]">
                {new Date(video.uploadDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                  <button
                    onClick={() => playVideo(video)}
                    className="p-2 text-white hover:text-[#94A3B8] transition"
                  >
                    <Play size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Video Player Modal
  const VideoPlayerModal = () => (
    <AnimatePresence>
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0A2472]/90"
            onClick={closeVideoPlayer}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-[#1E293B] rounded-xl overflow-hidden border border-[#E2E8F0]/10"
          >
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={closeVideoPlayer}
                className="p-2 bg-[#0A2472] hover:bg-[#0A2472]/70 text-white rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
               src={`https://www.youtube.com/embed/${
  selectedVideo.videoId || selectedVideo.youtubeId
}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; ; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#0A2472] text-white rounded-full text-sm">
                      {selectedVideo.category}
                    </span>
                    {selectedVideo.isPublished ? (
                      <span className="flex items-center gap-1 text-white text-sm">
                        <CheckCircle size={16} className="text-white" />
                        Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#94A3B8] text-sm">
                        <XCircle size={16} className="text-[#94A3B8]" />
                        Draft
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[#F1F5F9]">{selectedVideo.description}</p>
              <p className="text-[#94A3B8] text-sm mt-4">
                Uploaded on {new Date(selectedVideo.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2472] via-[#1E293B] to-[#0A2472] text-white p-6">
      {/* Centered Heading */}
      <div className="flex justify-center w-full mb-6">
        <h1 className="text-5xl md:text-7xl font-black text-center">
          <span className="bg-gradient-to-r from-white via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent">
            Video Management
          </span>
        </h1>
      </div>

      {/* View Toggle - Right Aligned (below heading) */}
      <div className="flex justify-end mb-8">
        <div className="flex bg-[#1E293B] rounded-lg p-1 border border-[#E2E8F0]/10">
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-6 py-2 rounded-lg transition ${
              viewMode === 'gallery' 
                ? 'bg-[#0A2472] text-white' 
                : 'text-[#F1F5F9] hover:text-white'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-6 py-2 rounded-lg transition ${
              viewMode === 'table' 
                ? 'bg-[#0A2472] text-white' 
                : 'text-[#F1F5F9] hover:text-white'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Videos Display */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#F1F5F9] text-lg">No videos found. Click "Add Video" to get started!</p>
        </div>
      ) : (
        viewMode === 'gallery' ? <GalleryView /> : <TableView />
      )}

      {/* Video Player Modal */}
      <VideoPlayerModal />

      {/* Add Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2472]/60" onClick={() => setShowAddModal(false)} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-[#1E293B] rounded-xl p-6 max-w-2xl w-full border border-[#E2E8F0]/10"
          >
            <h2 className="text-xl font-bold text-white mb-4">Add New Video</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#F1F5F9] mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-[#0A2472] border border-[#E2E8F0]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white placeholder-[#94A3B8]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F1F5F9] mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-[#0A2472] border border-[#E2E8F0]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white placeholder-[#94A3B8]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F1F5F9] mb-1">YouTube URL *</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://youtu.be/..."
                  className="w-full px-4 py-2 bg-[#0A2472] border border-[#E2E8F0]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white placeholder-[#94A3B8]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#F1F5F9] mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0A2472] border border-[#E2E8F0]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="Highlights">Highlights</option>
                    <option value="Full Match">Full Match</option>
                    <option value="Interview">Interview</option>
                    <option value="Analysis">Analysis</option>
                    <option value="Training">Training</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F1F5F9] mb-1">Status</label>
                  <label className="flex items-center gap-2 text-white">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-white"
                    />
                    Published
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#1E293B] text-white rounded-lg hover:bg-[#0A2472] border border-[#E2E8F0]/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#0A2472] text-white rounded-lg hover:bg-[#0A2472]/80 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Video'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VideoManagement;