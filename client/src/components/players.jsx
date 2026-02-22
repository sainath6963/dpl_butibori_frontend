import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../store/slices/playerSlice";
import { Users, Loader2, Search, UserCheck, UserX } from "lucide-react";

const Players = () => {
  const dispatch = useDispatch();
  const { players, loading, error } = useSelector((state) => state.players);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllPlayers());
  }, [dispatch]);

  // Filter players based on search
  const filteredPlayers = players?.filter(player => 
    player.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-6">
        Error loading players: {error}
      </div>
    );
  }

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          Players Management
        </h1>

        {/* Stats Card */}
        <div className="bg-white shadow-lg rounded-xl p-4 border">
          <p className="text-gray-500 text-sm">Total Players</p>
          <h2 className="text-2xl font-bold">{players?.length || 0}</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search players by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-lg">No players found</p>
          {searchTerm && (
            <p className="text-gray-400">Try adjusting your search</p>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers?.map((player) => (
            <div
              key={player._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border"
            >
              {/* Player Header with Avatar */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <div className="flex items-center gap-4">
                  {player.avatar?.url ? (
                    <img
                      src={player.avatar.url}
                      alt={player.fullName}
                      className="w-16 h-16 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-2 border-white">
                      <span className="text-2xl font-bold text-white">
                        {player.fullName?.charAt(0) || "P"}
                      </span>
                    </div>
                  )}
                  <div className="text-white">
                    <h3 className="font-bold text-lg">{player.fullName}</h3>
                    <p className="text-sm text-blue-100">Player</p>
                  </div>
                </div>
              </div>

              {/* Player Details */}
              <div className="p-4 space-y-3">
                {/* Email */}
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{player.email || "No email"}</span>
                </div>

                {/* Contact Number */}
                {player.contactNumber && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">{player.contactNumber}</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="flex items-center gap-2 pt-2">
                  {player.isActive ? (
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                      <UserCheck className="w-4 h-4" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
                      <UserX className="w-4 h-4" />
                      Inactive
                    </span>
                  )}
                </div>

                {/* Joined Date */}
                <p className="text-xs text-gray-400 mt-2">
                  Joined: {new Date(player.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;