import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleRegisterPopup } from "../store/slices/popUpSlice";
import { getAllVideos } from "../store/slices/videoSlice";
import RegisterPopup from "../popups/RegisterPopup";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/1.jpg.jpeg";
import img2 from "../assets/2.jpg.jpeg";
import img3 from "../assets/3.jpg.jpeg";
import img4 from "../assets/4.jpg.jpeg";
import img5 from "../assets/5.jpg.jpeg";
import img6 from "../assets/6.jpg.jpeg";
import img7 from "../assets/7.jpg.jpeg";
import img8 from "../assets/8.jpg.jpeg";
import img9 from "../assets/9.jpg.jpeg";
import img10 from "../assets/10.jpg.jpeg";
import img11 from "../assets/11.jpg.jpeg";
import img12 from "../assets/12.jpg.jpeg";
import img13 from "../assets/13.jpg.jpeg";
import img14 from "../assets/14.jpg.jpeg";
import img15 from "../assets/15.jpg.jpeg";
import img16 from "../assets/16.jpg.jpeg";
import winnerImg from "../assets/winnerImg.jpeg";
import runnerupImg from "../assets/winner2.jpeg";

const FrontPageDpl = () => {
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    
    // Get videos from Redux store - match your backend response structure
    const { videos: videoList, loading: videosLoading } = useSelector((state) => state.videos);
    
    const [isVisible, setIsVisible] = useState({});
    const [currentVideo, setCurrentVideo] = useState(0);
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 8,
        minutes: 30,
        seconds: 0
    });

    // Fetch videos on component mount
    useEffect(() => {
        dispatch(getAllVideos());
    }, [dispatch]);

    // Transform videos from backend to format needed for display
    const videos = videoList?.map(video => ({
        id: video.youtubeId, // Use the youtubeId from backend
        title: video.title,
        description: video.description || '',
        thumbnail: video.thumbnail,
        category: video.category,
        uploadDate: video.uploadDate,
        _id: video._id
    })) || [];

    // Fallback videos if no videos from backend
    const fallbackVideos = [
        { id: 'lcw4TDMBjZA', title: 'CCL 2026 - Official Teaser' },
        { id: '3tmd-ClpJxA', title: 'Highlights: Mumbai vs Pune' },
        { id: 'fRd6wJ5J2eM', title: 'Behind the Scenes - Jersey Launch' },
        { id: 'ZwT7Jc2n5dE', title: 'Player Interviews' },
    ];

    // Use backend videos if available, otherwise use fallback
    const displayVideos = videos.length > 0 ? videos : fallbackVideos;

    // Reset current video index if it's out of bounds
    useEffect(() => {
        if (currentVideo >= displayVideos.length) {
            setCurrentVideo(0);
        }
    }, [displayVideos.length, currentVideo]);

    // Sponsors Images
    const sponsors = [
        img1, img2, img3, img4,
        img5, img6, img7, img8,
        img9, img10, img11, img12,
        img13, img14, img15, img16,
    ];

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Animation on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="font-sans bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
            
            {/* Top Notification Bar - Sleek & Modern */}
            <div className="bg-slate-900 text-white py-3 px-4 border-b border-amber-500/20 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                            </span>
                            <i className="fa-solid fa-circle-check text-amber-400 text-lg"></i>
                        </div>
                        <span className="hidden md:inline font-medium text-slate-300">Early bird registrations closing soon!</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-1.5 rounded-full">
                            <i className="fa-regular fa-clock text-amber-400 text-sm"></i>
                            <span className="font-mono font-bold text-amber-400">
                                {String(timeLeft.days).padStart(2, '0')}d:{String(timeLeft.hours).padStart(2, '0')}h:{String(timeLeft.minutes).padStart(2, '0')}m:{String(timeLeft.seconds).padStart(2, '0')}s
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <a href="#" className="text-slate-400 hover:text-amber-400 transition-all hover:scale-110"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="text-slate-400 hover:text-amber-400 transition-all hover:scale-110"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#" className="text-slate-400 hover:text-amber-400 transition-all hover:scale-110"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section - Modern Minimalist with Impact */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-32 text-center overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.1),transparent_50%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                </div>
                
                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
                </div>
                
                <div className="relative z-10 max-w-6xl mx-auto px-6" data-animate="hero">
                    <div className="space-y-8">
                        {/* Animated Badge */}
                        <div className="flex justify-center mb-4">
                            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                                <span className="text-amber-400 font-medium">TOURNAMENT BEGINS IN 10 DAYS</span>
                            </div>
                        </div>
                        
                        <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tight leading-none">
                            <span className="bg-gradient-to-r from-amber-400 via-white to-amber-400 bg-clip-text text-transparent">
                            DPL Butibori
                            </span>
                            <br />
                            <span className="relative">
                                <span className="bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                                    CRICKET LEAGUE
                                </span>
                                <span className="absolute -top-6 -right-12 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 text-sm px-3 py-1 rounded-full font-bold rotate-12 shadow-lg">
                                    2026
                                </span>
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl mb-6 text-slate-300 flex items-center justify-center gap-4 flex-wrap">
                            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                                <i className="fa-regular fa-calendar text-amber-400"></i>
                                10–20 March 2026
                            </span>
                            <span className="w-1 h-1 bg-amber-400/50 rounded-full"></span>
                            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                                <i className="fa-solid fa-location-dot text-amber-400"></i>
                                Butibori, Maharashtra 441108
                            </span>
                        </p>
                        
                        {/* Prize Pool Badge - Modern Card */}
                        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-amber-500/10 to-amber-400/5 backdrop-blur-sm border border-amber-500/20 rounded-2xl px-8 py-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-400 rounded-xl flex items-center justify-center">
                                <i className="fa-solid fa-trophy text-white text-xl"></i>
                            </div>
                            <div>
                                <span className="text-3xl font-bold text-amber-400">₹4,00,000</span>
                                <span className="text-sm ml-2 text-slate-300">Prize Pool</span>
                            </div>
                        </div>
                        
                        {/* CTA Buttons - Modern & Bold */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => dispatch(toggleRegisterPopup())}
                                className="group relative bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 px-10 py-4 rounded-xl font-bold text-xl shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <i className="fa-solid fa-cricket"></i>
                                    REGISTER NOW
                                    <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                            
                            <button className="group relative bg-white/5 backdrop-blur-sm border border-white/10 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-white/10 transition-all duration-300">
                                <span className="flex items-center gap-2">
                                    <i className="fa-regular fa-circle-play"></i>
                                    WATCH TRAILER
                                </span>
                            </button>

                            {/* 🔐 ADMIN LOGIN */}
                            <button
                                onClick={() => navigate("/login")}
                                className="group relative bg-gradient-to-r from-blue-500 to-blue-400 text-white px-10 py-4 rounded-xl font-bold text-xl shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <i className="fa-solid fa-user-shield"></i>
                                    ADMIN LOGIN
                                    <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                                </span>
                            </button>
                        </div>

                        {/* Match Ticker - Modern */}
                        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl py-3 px-6 border border-white/10 max-w-3xl mx-auto">
                            <div className="flex items-center justify-between text-sm overflow-hidden">
                                <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
                                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span> <span className="text-slate-300">Mumbai Strikers vs Pune Warriors - Today 7:30 PM</span></span>
                                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-amber-400 rounded-full"></span> <span className="text-slate-300">Delhi Kings vs Chennai Smashers - Tomorrow 4:00 PM</span></span>
                                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-400 rounded-full"></span> <span className="text-slate-300">Kolkata Tigers vs Bangalore Bulls - 15th March</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
            </section>

            {/* YouTube Video Slider Section - Modern Card Design */}
            <section className="py-24 px-6 bg-slate-50" data-animate="videos">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                LATEST VIDEOS
                            </span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            {videosLoading ? 'Loading videos...' : 'Watch highlights, interviews & behind the scenes'}
                        </p>
                        {!videosLoading && videos.length === 0 && (
                            <p className="text-amber-500 text-sm mt-2">No videos available yet. Check back soon!</p>
                        )}
                    </div>

                    {displayVideos.length > 0 && (
                        <div className="space-y-6">
                           {/* Main Video Display */}
<div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
    <div className="aspect-video relative">
        <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${displayVideos[currentVideo].id}`}
            title={displayVideos[currentVideo].title}
            allowFullScreen
        ></iframe>
        
        {/* Video Info Overlay - IMPROVED FOR BETTER READABILITY */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
            <h3 className="text-white text-2xl font-bold flex items-center gap-2 drop-shadow-lg">
                <span className="w-1 h-8 bg-amber-400 rounded-full"></span>
                {displayVideos[currentVideo].title}
            </h3>
            {displayVideos[currentVideo].description && (
                <p className="text-white/90 text-sm mt-2 line-clamp-1 font-medium drop-shadow">
                    {displayVideos[currentVideo].description}
                </p>
            )}
            {displayVideos[currentVideo].category && (
                <span className="absolute top-4 right-4 bg-amber-500 text-slate-900 text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                    {displayVideos[currentVideo].category}
                </span>
            )}
        </div>
    </div>
</div>

                          {/* Video Thumbnails - Modern Grid */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {displayVideos.map((video, index) => (
        <button
            key={video._id || index}
            onClick={() => setCurrentVideo(index)}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 group ${
                currentVideo === index ? 'ring-2 ring-amber-400 ring-offset-2' : 'hover:ring-2 hover:ring-slate-300 hover:ring-offset-2'
            }`}
        >
            <div className="aspect-video">
                <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
                    }}
                />
            </div>
            {/* IMPROVED OVERLAY FOR THUMBNAILS */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium line-clamp-1 text-left drop-shadow-lg">
                    {video.title}
                </p>
            </div>
            {currentVideo === index && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            )}
            <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/10 transition-colors"></div>
        </button>
    ))}
</div>
                            
                            {/* Video count indicator */}
                            <div className="text-center text-slate-500 text-sm">
                                Showing {displayVideos.length} video{displayVideos.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Counter Section - Modern Minimal */}
            <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "16", label: "Teams", icon: "fa-solid fa-people-group" },
                            { number: "32", label: "Matches", icon: "fa-solid fa-calendar-check" },
                            { number: "150", label: "Players", icon: "fa-solid fa-user" },
                            { number: "50K", label: "Audience", icon: "fa-solid fa-eye" },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-500/10 group-hover:scale-110 transition-all duration-300">
                                    <i className={`${item.icon} text-2xl text-amber-400`}></i>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">
                                    {item.number}+
                                </div>
                                <div className="text-slate-400 text-sm font-medium">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teams Carousel - Modern Card Grid */}
            <section className="py-24 px-6 bg-white" data-animate="teams">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
                                FEATURED TEAMS
                            </span>
                        </h2>
                        <p className="text-slate-500 text-lg">16 Teams battling for glory</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Mumbai Strikers', captain: 'Rohit S.', color: 'from-blue-500 to-blue-600', icon: '⚡', bg: 'bg-blue-50' },
                            { name: 'Pune Warriors', captain: 'Virat K.', color: 'from-red-500 to-red-600', icon: '🛡️', bg: 'bg-red-50' },
                            { name: 'Delhi Kings', captain: 'Rishabh P.', color: 'from-purple-500 to-purple-600', icon: '👑', bg: 'bg-purple-50' },
                            { name: 'Chennai Smashers', captain: 'MS Dhoni', color: 'from-yellow-500 to-yellow-600', icon: '🔥', bg: 'bg-yellow-50' },
                            { name: 'Kolkata Tigers', captain: 'Andre R.', color: 'from-orange-500 to-orange-600', icon: '🐯', bg: 'bg-orange-50' },
                            { name: 'Bangalore Bulls', captain: 'Faf D.', color: 'from-red-600 to-red-700', icon: '🐂', bg: 'bg-red-50' },
                            { name: 'Lucknow Lions', captain: 'KL Rahul', color: 'from-cyan-500 to-cyan-600', icon: '🦁', bg: 'bg-cyan-50' },
                            { name: 'Hyderabad Hawks', captain: 'Pat C.', color: 'from-orange-600 to-orange-700', icon: '🦅', bg: 'bg-orange-50' },
                        ].map((team, i) => (
                            <div key={i} className="group relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${team.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                                <div className={`relative ${team.bg} rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100`}>
                                    <div className="text-3xl mb-3">{team.icon}</div>
                                    <h3 className="font-bold text-base text-slate-800">{team.name}</h3>
                                    <p className="text-xs text-slate-500">Captain: {team.captain}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prize Pool - Modern Cards */}
            <section className="py-24 px-6 bg-slate-50" data-animate="prize">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
                                PRIZE POOL
                            </span>
                        </h2>
                        <p className="text-slate-500 text-lg">Total worth ₹1,00,000 + Trophies + Exciting Prizes</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Winner */}
                        <div className="group relative bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                            <div className="absolute -top-3 -right-3">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <i className="fa-solid fa-crown text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                                <i className="fa-solid fa-trophy text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">WINNER</h3>
                            <div className="text-3xl font-black text-slate-900 mb-2">₹50,000</div>
                            <p className="text-slate-500 text-sm">+ Trophy & Gold Medals</p>
                        </div>

                        {/* Runner Up */}
                        <div className="group relative bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                                <i className="fa-solid fa-medal text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">RUNNER UP</h3>
                            <div className="text-3xl font-black text-slate-900 mb-2">₹25,000</div>
                            <p className="text-slate-500 text-sm">+ Trophy & Silver Medals</p>
                        </div>

                        {/* Man of Series */}
                        <div className="group relative bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                                <i className="fa-solid fa-star text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">MAN OF SERIES</h3>
                            <div className="text-3xl font-black text-slate-900 mb-2">₹15,000</div>
                            <p className="text-slate-500 text-sm">+ Special Trophy & Award</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Match Preview - Modern & Sleek */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-2">LIVE MATCH PREVIEW</h2>
                        <p className="text-slate-400">Today's marquee clash</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            {/* Team 1 */}
                            <div className="text-center group">
                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 border-2 border-amber-400/50 group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-shirt text-3xl text-white"></i>
                                </div>
                                <h3 className="font-bold text-xl">MUMBAI STRIKERS</h3>
                                <p className="text-slate-400 text-sm mb-2">Captain: Rohit S.</p>
                                <div className="inline-block bg-white/10 rounded-full px-3 py-1 text-xs">
                                    <i className="fa-regular fa-chart-line mr-1 text-amber-400"></i> W W L W
                                </div>
                            </div>
                            
                            {/* VS & Match Info */}
                            <div className="text-center">
                                <div className="text-4xl font-black text-amber-400 mb-4">VS</div>
                                <div className="bg-white/10 rounded-xl py-3 px-6">
                                    <p className="text-xs text-slate-400">Match 7 • Finals Week</p>
                                    <p className="text-xl font-bold">7:30 PM</p>
                                    <p className="text-xs text-slate-400">Shivaji Ground, Pune</p>
                                </div>
                                <div className="mt-4 flex justify-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs text-slate-300">Live on YouTube</span>
                                </div>
                            </div>
                            
                            {/* Team 2 */}
                            <div className="text-center group">
                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 border-2 border-blue-400/50 group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-shirt text-3xl text-white"></i>
                                </div>
                                <h3 className="font-bold text-xl">PUNE WARRIORS</h3>
                                <p className="text-slate-400 text-sm mb-2">Captain: Virat K.</p>
                                <div className="inline-block bg-white/10 rounded-full px-3 py-1 text-xs">
                                    <i className="fa-regular fa-chart-line mr-1 text-amber-400"></i> W W W L
                                </div>
                            </div>
                        </div>
                        
                        {/* Match Stats Preview */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { label: 'Avg Score', value: '185' },
                                { label: 'Top Scorer', value: 'Virat (450)' },
                                { label: 'Best Bowling', value: 'Bumrah (15)' },
                                { label: 'Head to Head', value: '5-3' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                                    <div className="text-xs text-slate-400">{stat.label}</div>
                                    <div className="font-bold text-lg text-amber-400">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Season 1 Winners Section */}
            <section className="py-28 px-6 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-7xl mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
                                SEASON 1 CHAMPIONS
                            </span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Celebrating the winners & runner-ups of DPL Season 1
                        </p>
                    </div>

                    {/* Images Grid */}
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Winner */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition"></div>
                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                                <img
                                    src={winnerImg}
                                    alt="Season 1 Winners"
                                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-slate-800">
                                        🏆 Champions
                                    </h3>
                                    <p className="text-slate-500">
                                        DPL Season 1 Winners
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Runner Up */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-slate-300/20 blur-2xl opacity-0 group-hover:opacity-100 transition"></div>
                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                                <img
                                    src={runnerupImg}
                                    alt="Season 1 Runner Up"
                                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-slate-800">
                                        🥈 Runner Up
                                    </h3>
                                    <p className="text-slate-500">
                                        DPL Season 1 Finalists
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsors Section - Ultra Premium Design */}
            <section className="relative py-32 px-6 overflow-hidden bg-slate-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Gradient Orbs */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-5" 
                        style={{ 
                            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}>
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400/30 rounded-full animate-float"></div>
                    <div className="absolute bottom-40 right-40 w-3 h-3 bg-blue-400/30 rounded-full animate-float delay-700"></div>
                    <div className="absolute top-60 right-60 w-2 h-2 bg-purple-400/30 rounded-full animate-float delay-1500"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header - Premium */}
                    <div className="text-center mb-20">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span className="text-amber-400 text-sm font-medium tracking-wider">PARTNERS & SPONSORS</span>
                        </div>
                        
                        {/* Main Heading */}
                        <h2 className="text-5xl md:text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-amber-400 via-white to-amber-400 bg-clip-text text-transparent">
                                OUR SPONSORS
                            </span>
                        </h2>
                        
                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                            <i className="fa-solid fa-star text-amber-400 text-sm"></i>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        </div>
                        
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Proudly supported by industry leaders who believe in the spirit of cricket
                        </p>
                    </div>

                    {/* Main Slider Container */}
                    <div className="relative">
                        {/* Gradient Fades - Enhanced */}
                        <div className="absolute left-0 top-0 w-48 h-full bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-20"></div>
                        <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-20"></div>

                        {/* Slider Track - Two Rows for Visual Interest */}
                        <div className="space-y-8">
                            
                            {/* First Row - Moving Left */}
                            <div className="flex gap-8 w-max sponsor-scroll-left hover:[animation-play-state:paused]">
                                {[...sponsors, ...sponsors].map((logo, i) => (
                                    <div
                                        key={`row1-${i}`}
                                        className="group relative flex items-center justify-center min-w-[320px] h-56"
                                    >
                                        {/* Card with Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Main Card */}
                                        <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden group-hover:border-amber-500/50 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                                            
                                            {/* Inner Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/0 to-blue-500/0 group-hover:from-amber-500/10 group-hover:via-transparent group-hover:to-blue-500/10 transition-all duration-700"></div>
                                            
                                            {/* Logo Container */}
                                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                                <img
                                                    src={logo}
                                                    alt={`Sponsor`}
                                                    className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                                                />
                                            </div>
                                            
                                            {/* Hover Overlay with Shine Effect */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Second Row - Moving Right (Opposite Direction) */}
                            <div className="flex gap-8 w-max sponsor-scroll-right hover:[animation-play-state:paused]">
                                {[...sponsors, ...sponsors].reverse().map((logo, i) => (
                                    <div
                                        key={`row2-${i}`}
                                        className="group relative flex items-center justify-center min-w-[220px] h-40"
                                    >
                                        {/* Card with Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Main Card */}
                                        <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden group-hover:border-amber-500/50 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                                            
                                            {/* Inner Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/0 to-blue-500/0 group-hover:from-amber-500/10 group-hover:via-transparent group-hover:to-blue-500/10 transition-all duration-700"></div>
                                            
                                            {/* Logo Container */}
                                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                                <img
                                                    src={logo}
                                                    alt={`Sponsor`}
                                                    className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                                                />
                                            </div>
                                            
                                            {/* Hover Overlay with Shine Effect */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Scroll Indicators */}
                        <div className="flex justify-center gap-3 mt-12">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                                <span className="text-slate-500 text-sm">Scrolling</span>
                            </div>
                            <i className="fa-solid fa-arrow-left text-slate-600"></i>
                            <i className="fa-solid fa-arrow-right text-slate-600"></i>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-8 mt-20">
                        {[
                            { icon: 'fa-solid fa-medal', text: 'Official Partners' },
                            { icon: 'fa-solid fa-handshake', text: '100+ Brands' },
                            { icon: 'fa-solid fa-globe', text: 'Global Presence' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                                <i className={`${item.icon} text-amber-400 text-sm`}></i>
                                <span className="text-slate-300 text-sm font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Modern & Bold */}
            <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        READY TO COMPETE?
                    </h2>
                    <p className="text-xl text-slate-300 mb-4">
                        Limited slots available • Register your team before 5th March
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto mb-8">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                            <span>8 spots remaining</span>
                            <span>Early bird ends soon</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"></div>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => dispatch(toggleRegisterPopup())}
                        className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 px-12 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105 transition-all duration-300"
                    >
                        <i className="fa-solid fa-cricket mr-2"></i>
                        REGISTER YOUR TEAM
                    </button>
                </div>
            </section>

            {/* Footer - Modern & Clean */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-400 rounded-lg flex items-center justify-center">
                                    <i className="fa-solid fa-shirt text-white text-sm"></i>
                                </div>
                                <span className="font-bold text-lg">CCL 2026</span>
                            </div>
                            <p className="text-slate-400 text-sm">Premium cricket tournament for champions. Live streaming on YouTube.</p>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-300">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition">Schedule</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition">Teams</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition">Points Table</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-amber-400 transition">Highlights</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-300">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2 text-slate-400">
                                    <i className="fa-solid fa-phone text-amber-400 text-xs"></i>
                                    +91 98765 43210
                                </li>
                                <li className="flex items-center gap-2 text-slate-400">
                                    <i className="fa-solid fa-envelope text-amber-400 text-xs"></i>
                                    info@ccl2026.com
                                </li>
                                <li className="flex items-center gap-2 text-slate-400">
                                    <i className="fa-solid fa-location-dot text-amber-400 text-xs"></i>
                                    Pune, India
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-300">Subscribe</h4>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="bg-slate-800 rounded-l-xl px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-slate-500"
                                />
                                <button className="bg-amber-500 text-slate-900 px-4 rounded-r-xl font-bold hover:bg-amber-400 transition">
                                    <i className="fa-regular fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-slate-800 pt-6 flex flex-wrap justify-between items-center text-slate-400 text-sm">
                        <span>© 2026 Champions Cricket League. All rights reserved.</span>
                        <div className="flex gap-4 mt-2 md:mt-0">
                            <a href="#" className="hover:text-amber-400 transition">Privacy</a>
                            <a href="#" className="hover:text-amber-400 transition">Terms</a>
                            <a href="#" className="hover:text-amber-400 transition">FAQ</a>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }
                
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                .sponsor-scroll-left {
                    animation: scroll-left 40s linear infinite;
                }
                
                .sponsor-scroll-right {
                    animation: scroll-right 40s linear infinite;
                }
                
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                @keyframes scroll-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes shine {
                    100% { left: 150%; }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-shine {
                    animation: shine 1.5s ease-in-out;
                }
                
                .delay-700 {
                    animation-delay: 700ms;
                }
                
                .delay-1000 {
                    animation-delay: 1000ms;
                }
                
                .delay-1500 {
                    animation-delay: 1500ms;
                }
                
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default FrontPageDpl;