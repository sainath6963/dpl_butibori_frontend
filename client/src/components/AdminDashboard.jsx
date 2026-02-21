import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideos, addVideo, deleteVideo } from "../store/slices/videoSlice";
import logo from "../assets/black-logo.png";
import { Trash2, Plus, Video, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { videos, loading, error, message } = useSelector((state) => state.videos);

  // Form state for adding video - MATCHING BACKEND FIELDS
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "", // Changed from 'url' to 'youtubeUrl' to match backend
    category: "Highlights", // Default category
  });

  // Fetch videos on component mount
  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  // Show success/error messages
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle add video submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to match backend structure
      const videoData = {
        title: formData.title,
        description: formData.description,
        youtubeUrl: formData.youtubeUrl, // This matches your backend field
        category: formData.category || "Highlights",
        season: "DPL 2026", // Add default season if your backend expects it
        isFeatured: false, // Add default value
      };

      console.log("Submitting video data:", videoData); // Debug log
      
      await dispatch(addVideo(videoData)).unwrap();
      
      // Reset form on success
      setFormData({ 
        title: "", 
        description: "", 
        youtubeUrl: "",
        category: "Highlights" 
      });
      setShowAddForm(false);
      toast.success("Video added successfully!");
    } catch (error) {
      console.error("Failed to add video:", error);
      toast.error(error || "Failed to add video");
    }
  };

  // Handle delete video
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      dispatch(deleteVideo(id))
        .then(() => {
          toast.success("Video deleted successfully!");
        })
        .catch((error) => {
          toast.error("Failed to delete video");
        });
    }
  };

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10" />
          Video Management Dashboard
        </h1>

        <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-xl shadow border">
          <img
            src={user?.avatar?.url || "/default-avatar.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border shadow"
          />
          <p className="text-gray-700 text-lg font-medium">
            Welcome, <span className="text-blue-600">{user?.name}</span>
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 border mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <Video className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Videos</p>
            <h2 className="text-3xl font-bold">{videos?.length || 0}</h2>
          </div>
        </div>
      </div>

      {/* Add Video Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
            showAddForm 
              ? "bg-gray-500 hover:bg-gray-600" 
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {showAddForm ? (
            <>
              <Plus className="w-5 h-5 rotate-45" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add New Video
            </>
          )}
        </button>
      </div>

      {/* Add Video Form */}
      {showAddForm && (
        <div className="bg-white shadow-xl rounded-xl p-6 border mb-8 animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Add New Video</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter video title"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter video description"
              />
            </div>

            {/* YouTube URL Field - CHANGED to match backend */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="youtubeUrl" // Changed from 'url' to 'youtubeUrl'
                value={formData.youtubeUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://youtu.be/VIDEO_ID or https://youtube.com/watch?v=VIDEO_ID"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supports YouTube, YouTube Shorts, and youtu.be links
              </p>
            </div>

            {/* Category Field - Optional but recommended */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Highlights">Highlights</option>
                <option value="Interviews">Interviews</option>
                <option value="Behind the Scenes">Behind the Scenes</option>
                <option value="Promos">Promos</option>
                <option value="Full Matches">Full Matches</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Video"
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos List */}
      <div className="bg-white shadow-xl rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">Video Library</h2>

        {loading && !videos.length ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p className="text-gray-500 mt-2">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Video className="w-16 h-16 mx-auto text-gray-300 mb-3" />
            <p className="text-lg">No videos found</p>
            <p className="text-sm">Click "Add New Video" to get started</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Showing {videos.length} video{videos.length !== 1 ? 's' : ''}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-gray-200 relative group">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <Video className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                    {/* Category Badge */}
                    {video.category && (
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {video.category}
                      </span>
                    )}
                    {/* Duration/Year Badge */}
                    {video.season && (
                      <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {video.season}
                      </span>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description || "No description"}
                    </p>
                    
                    {/* Video URL */}
                    <a
                      href={video.youtubeUrl || video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm block mb-3 truncate hover:underline"
                    >
                      {video.youtubeUrl || video.url}
                    </a>

                    {/* Upload Date */}
                    <p className="text-xs text-gray-400 mb-3">
                      Added: {new Date(video.uploadDate || video.createdAt).toLocaleDateString()}
                    </p>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(video._id, video.title)}
                      className="flex items-center justify-center gap-2 w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;