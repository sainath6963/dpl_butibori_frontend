


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleRegisterPopup } from "../store/slices/popUpSlice";
import { getAllVideos } from "../store/slices/videoSlice";
import PlayerRegistrationPopup from "../popups/PlayerRegistrationPopup";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dpl-logo.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


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
    const { registerPopup } = useSelector((state) => state.popup);
    
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

    // Teams Images
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
        <div className="font-sans bg-gradient-to-b from-[#F8FAFC] to-white overflow-x-hidden">
            
            {/* Top Notification Bar */}
            {/* <div className="bg-[#0A2472] text-white py-3 px-4 border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            <i className="fa-solid fa-circle-check text-white text-lg"></i>
                        </div>
                        <span className="hidden md:inline font-medium text-blue-100">Early bird registrations closing soon!</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-[#1E293B]/50 px-4 py-1.5 rounded-full">
                            <i className="fa-regular fa-clock text-white text-sm"></i>
                            <span className="font-mono font-bold text-white">
                                {String(timeLeft.days).padStart(2, '0')}d:{String(timeLeft.hours).padStart(2, '0')}h:{String(timeLeft.minutes).padStart(2, '0')}m:{String(timeLeft.seconds).padStart(2, '0')}s
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <a href="#" className="text-blue-200 hover:text-white transition-all hover:scale-110"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="text-blue-200 hover:text-white transition-all hover:scale-110"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#" className="text-blue-200 hover:text-white transition-all hover:scale-110"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0A2472] via-[#1E293B] to-[#0A2472] text-white py-32 text-center overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(148,163,184,0.1),transparent_50%)]"></div>
                </div>
                
                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
                </div>
                
<div className="relative z-10 max-w-6xl mx-auto px-6" data-animate="hero">
  <div className="space-y-8">
   

{/* Logo + Title Vertical Layout */}
<div className="flex flex-col items-center justify-center text-center gap-4">

  {/* Top Logo */}
  <img
    src={logo}
    alt="DPL Logo"
    className="w-[110px] md:w-[130px] lg:w-[160px] object-contain"
  />

  {/* Title Block */}
  <div className="font-['Inter',_system-ui,_sans-serif] tracking-tight">

    {/* Dinshaw's — Sponsor Focus */}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold 
                   text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.8)]">
      Dinshaw’s
    </h2>

    {/* Dream Premier League — MAIN TITLE */}
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black 
                   leading-[1.05] tracking-[-0.02em]
                   bg-gradient-to-r from-white via-blue-200 to-blue-400 
                   bg-clip-text text-transparent 
                   drop-shadow-[0_0_18px_rgba(59,130,246,0.7)]">
      Dream Premier League
    </h1>

    {/* Butibori — Secondary */}
    <h3 className="mt-2 text-xl md:text-2xl lg:text-3xl 
                   text-white/80 font-semibold">
      Butibori
    </h3>

    {/* Flood Light Cricket Tournament — Subtitle */}
    <h2 className="text-2xl md:text-3xl lg:text-4xl 
                   text-yellow-200 font-bold tracking-wide">
      Flood Light Cricket Tournament
    </h2>

  </div>
</div>

  {/* Season Text - Smaller than flood light text */}
    <div className="text-center mt-2">
      <p className="text-3xl md:text-4xl text-blue-200 font-light">
        SEASON – 2   (2026)  . <span className="text-blue-200 font-light"> The Game Changer In Butibori</span>
      </p>
    </div>

    {/* Date - Bigger Size */}
    <div className="text-center">
      <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
        1st TO 6TH JUNE 2026
      </p>
    </div>

    {/* Prize Display - Professional & Attractive */}
<div className="flex flex-col items-center">
  {/* Main Prize Pool Label */}
  <div className="text-sm uppercase tracking-wider text-blue-200 mb-3 font-medium">
    TOTAL PRIZE POOL
  </div>
  
  <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
    {/* 1st Prize - Gold/Champion Style */}
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full"></div>
      
      {/* Prize Card */}
      <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 md:p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-yellow-300/30">
        {/* Crown Icon */}
        <div className="absolute -top-4 -right-2">
          <span className="text-3xl filter drop-shadow-lg">👑</span>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-semibold text-yellow-900 uppercase tracking-wider mb-1">
            Winner
          </div>
          <div className="text-4xl md:text-5xl font-black text-white mb-1">
            ₹4,00,000
          </div>
          <div className="text-xs text-yellow-900 font-medium">
            1st Prize
          </div>
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl"></div>
      </div>
    </div>

    {/* VS Divider - Optional */}
    <div className="text-3xl font-black text-white/40 hidden md:block">⚡</div>

    {/* 2nd Prize - Silver/Elegant Style */}
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gray-400/20 blur-2xl rounded-full"></div>
      
      {/* Prize Card */}
      <div className="relative bg-gradient-to-br from-gray-300 to-gray-500 rounded-2xl p-6 md:p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-gray-400/30">
        {/* Medal Icon */}
        <div className="absolute -top-4 -right-2">
          <span className="text-3xl filter drop-shadow-lg">🥈</span>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Runner Up
          </div>
          <div className="text-4xl md:text-5xl font-black text-white mb-1">
            ₹2,11,000
          </div>
          <div className="text-xs text-gray-700 font-medium">
            2nd Prize
          </div>
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl"></div>
      </div>
    </div>
  </div>

  {/* Additional Prizes Tag */}
  <div className="mt-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
    <span className="text-yellow-400 text-sm">🏆</span>
    <span className="text-white/90 text-sm">Registration Starts On 1st March 2026 to 10th April 2026</span>
    <span className="text-yellow-400 text-sm">🏆</span>
  </div>
</div>
    {/* CTA Buttons */}
    <div className="flex flex-wrap gap-4 justify-center pt-6">
      <button
        onClick={() => dispatch(toggleRegisterPopup())}
        className="px-10 py-4 bg-white text-[#0A2472] rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
      >
        REGISTER NOW
      </button>
      
      <button className="px-10 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
        WATCH TRAILER
      </button>

      <button
        onClick={() => navigate("/login")}
        className="px-10 py-4 bg-[#1E293B]/80 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-[#1E293B] transition-all duration-300 transform hover:-translate-y-1 border border-white/10"
      >
        ADMIN LOGIN
      </button>
    </div>
  </div>
</div>       
                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* YouTube Video Slider Section */}
            <section className="py-24 px-6 bg-white" data-animate="videos">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-[#0A2472] to-[#1E293B] bg-clip-text text-transparent">
                                LATEST VIDEOS
                            </span>
                        </h2>
                        <p className="text-[#1E293B] text-lg">
                            {videosLoading ? 'Loading videos...' : 'Watch highlights, interviews & behind the scenes'}
                        </p>
                        {!videosLoading && videos.length === 0 && (
                            <p className="text-[#94A3B8] text-sm mt-2">No videos available yet. Check back soon!</p>
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
        
        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A2472] via-[#0A2472]/80 to-transparent p-6">
            <h3 className="text-white text-2xl font-bold flex items-center gap-2 drop-shadow-lg">
                <span className="w-1 h-8 bg-white rounded-full"></span>
                {displayVideos[currentVideo].title}
            </h3>
            {displayVideos[currentVideo].description && (
                <p className="text-white/90 text-sm mt-2 line-clamp-1 font-medium drop-shadow">
                    {displayVideos[currentVideo].description}
                </p>
            )}
            {displayVideos[currentVideo].category && (
                <span className="absolute top-4 right-4 bg-white text-[#0A2472] text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                    {displayVideos[currentVideo].category}
                </span>
            )}
        </div>
    </div>
</div>

                          {/* Video Thumbnails */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {displayVideos.map((video, index) => (
        <button
            key={video._id || index}
            onClick={() => setCurrentVideo(index)}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 group ${
                currentVideo === index ? 'ring-2 ring-white ring-offset-2' : 'hover:ring-2 hover:ring-[#94A3B8] hover:ring-offset-2'
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2472] via-[#0A2472]/60 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium line-clamp-1 text-left drop-shadow-lg">
                    {video.title}
                </p>
            </div>
            {currentVideo === index && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
        </button>
    ))}
</div>
                            
                            {/* Video count indicator */}
                            <div className="text-center text-[#1E293B] text-sm">
                                Showing {displayVideos.length} video{displayVideos.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Counter Section */}
            <section className="py-20 bg-gradient-to-r from-[#0A2472] to-[#1E293B] text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "16", label: "Teams", icon: "fa-solid fa-people-group" },
                            { number: "32", label: "Matches", icon: "fa-solid fa-calendar-check" },
                            { number: "150", label: "Players", icon: "fa-solid fa-user" },
                            { number: "50K", label: "Audience", icon: "fa-solid fa-eye" },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                                    <i className={`${item.icon} text-2xl text-white`}></i>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">
                                    {item.number}+
                                </div>
                                <div className="text-blue-200 text-sm font-medium">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teams Carousel */}
{/* Teams Carousel */}
<section className="py-24 px-6 bg-white" data-animate="teams">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-black mb-4">
        <span className="bg-gradient-to-r from-[#0A2472] to-[#1E293B] bg-clip-text text-transparent">
          FRINCHIES TEAMS
        </span>
      </h2>
      <p className="text-[#0A2472] text-lg">
        Proud partners supporting DPL Season 2
      </p>
    </div>

<Swiper
  modules={[Autoplay, Navigation]}
  spaceBetween={30}
  slidesPerView={2}
  loop={true}
  speed={2000}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
  }}
  navigation
  breakpoints={{
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }}
  className="py-8"
>
  {sponsors.map((sponsor, index) => (
    <SwiperSlide key={index}>
      
      {/* Card */}
      <div className="
        bg-white
        rounded-2xl
        p-4 md:p-6
        shadow-md
        hover:shadow-xl
        transition-all
        duration-500
        flex
        items-center
        justify-center
        h-44 md:h-48
        border
        border-gray-100
        group
      ">
        
        {/* Bigger Logo */}
        <img
          src={sponsor}
          alt={`Sponsor ${index + 1}`}
          className="
            h-24 md:h-28 lg:h-32
            w-auto
            object-contain
            transition-all
            duration-500
            group-hover:scale-110
          "
        />

      </div>

    </SwiperSlide>
  ))}
</Swiper>

    {/* Supporting Text */}
    <div className="text-center mt-10">
    </div>
  </div>
</section>

           {/* Prize Pool */}
<section className="py-24 px-6 bg-[#F8FAFC]" data-animate="prize">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black mb-4">
        <span className="bg-gradient-to-r from-[#0A2472] to-[#1E293B] bg-clip-text text-transparent">
          PRIZE POOL
        </span>
      </h2>
      <p className="text-[#0A2472] text-lg">
        Total worth ₹6,32,000 + Trophies + Exciting Prizes
      </p>
    </div>

    {/* Top 4 Prize Cards */}
    <div className="grid md:grid-cols-4 gap-6">

      {/* Winner */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-8 text-center shadow-xl text-white">
        <div className="text-5xl mb-4">🥇</div>
        <h3 className="text-xl font-bold mb-2">WINNER</h3>
        <div className="text-3xl font-black">₹4,00,000</div>
        <p className="text-sm mt-2">+ Trophy & Gold Medals</p>
      </div>

      {/* Runner Up */}
      <div className="bg-gradient-to-br from-gray-300 to-gray-500 rounded-2xl p-8 text-center shadow-xl text-white">
        <div className="text-5xl mb-4">🥈</div>
        <h3 className="text-xl font-bold mb-2">RUNNER UP</h3>
        <div className="text-3xl font-black">₹2,11,000</div>
        <p className="text-sm mt-2">+ Trophy & Silver Medals</p>
      </div>

      {/* Man of Series */}
      <div className="bg-white rounded-2xl p-8 text-center shadow-lg border">
        <div className="text-5xl mb-4">🏅</div>
        <h3 className="text-xl font-bold text-[#0A2472] mb-2">
          MAN OF SERIES
        </h3>
        <div className="text-3xl font-black text-[#0A2472]">
          ₹21,000
        </div>
      </div>

      {/* Man of Match */}
      <div className="bg-white rounded-2xl p-8 text-center shadow-lg border">
        <div className="text-5xl mb-4">⭐</div>
        <h3 className="text-xl font-bold text-[#0A2472] mb-2">
          MAN OF THE MATCH
        </h3>
        <div className="text-3xl font-black text-[#0A2472]">
          ₹11,000
        </div>
      </div>

    </div>

    {/* Extra Prize Strips */}
    <div className="mt-10 grid md:grid-cols-3 gap-4">

      {[
        "Bid Price",
        "Best Player of Nagpur Rural",
        "Best Player of Butibori",
        "Other Exciting Prizes"
      ].map((item, i) => (
        <div
          key={i}
          className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg text-center font-semibold shadow-md"
        >
          • {item}
        </div>
      ))}

    </div>

  </div>
</section>

          

            {/* Season 1 Winners Section */}
            <section className="py-28 px-6 bg-gradient-to-b from-white to-[#F8FAFC]">
                <div className="max-w-7xl mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-[#0A2472] to-[#1E293B] bg-clip-text text-transparent">
                                SEASON 1 CHAMPIONS
                            </span>
                        </h2>
                        <p className="text-[#0A2472] text-lg">
                            Celebrating the winners & runner-ups of DPL Season 1
                        </p>
                    </div>

                    {/* Images Grid */}
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Winner */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition"></div>
                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-[#E2E8F0]">
                                <img
                                    src={winnerImg}
                                    alt="Season 1 Winners"
                                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-[#0A2472]">
                                        🏆 Champions
                                    </h3>
                                    <p className="text-[#1E293B]">
                                        DPL Season 1 Winners
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Runner Up */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#94A3B8]/20 to-[#94A3B8]/20 blur-2xl opacity-0 group-hover:opacity-100 transition"></div>
                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-[#E2E8F0]">
                                <img
                                    src={runnerupImg}
                                    alt="Season 1 Runner Up"
                                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-[#0A2472]">
                                        🥈 Runner Up
                                    </h3>
                                    <p className="text-[#1E293B]">
                                        DPL Season 1 Finalists
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-[#0A2472] to-[#1E293B]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        READY TO COMPETE?
                    </h2>
                    <p className="text-xl text-blue-200 mb-4">
                        Limited slots available • Register your team before 5th March
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto mb-8">
                        <div className="flex justify-between text-sm text-blue-200 mb-2">
                            <span>8 spots remaining</span>
                            <span>Early bird ends soon</span>
                        </div>
                        <div className="h-2 bg-[#1E293B] rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-white to-white rounded-full"></div>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => dispatch(toggleRegisterPopup())}
                        className="bg-white text-[#0A2472] px-12 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-white/30 transform hover:scale-105 transition-all duration-300"
                    >
                        <i className="fa-solid fa-cricket mr-2"></i>
                        REGISTER 
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0A2472] text-white py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <i className="fa-solid fa-shirt text-[#0A2472] text-sm"></i>
                                </div>
                                <span className="font-bold text-lg">DPL BUTIBORI 2026</span>
                            </div>
                            <p className="text-blue-200 text-sm">Premium cricket tournament for champions. Live streaming on YouTube.</p>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-blue-200">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-blue-200 hover:text-white transition">Schedule</a></li>
                                <li><a href="#" className="text-blue-200 hover:text-white transition">Teams</a></li>
                                <li><a href="#" className="text-blue-200 hover:text-white transition">Points Table</a></li>
                                <li><a href="#" className="text-blue-200 hover:text-white transition">Highlights</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-blue-200">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2 text-blue-200">
                                    <i className="fa-solid fa-phone text-white text-xs"></i>
                                    8698108101
                                </li>
                                <li className="flex items-center gap-2 text-blue-200">
                                    <i className="fa-solid fa-envelope text-white text-xs"></i>
                                    dplbutibori@gmail.com
                                </li>
                                <li className="flex items-center gap-2 text-blue-200">
                                    <i className="fa-solid fa-location-dot text-white text-xs"></i>
                                HBL Tower, Main Road Butibori, Nagpur 441108
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-blue-200">Subscribe</h4>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="bg-[#1E293B] rounded-l-xl px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-blue-300"
                                />
                                <button className="bg-white text-[#0A2472] px-4 rounded-r-xl font-bold hover:bg-[#F1F5F9] transition">
                                    <i className="fa-regular fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-[#1E293B] pt-6 flex flex-wrap justify-between items-center text-blue-200 text-sm">
                        <span>© 2026 DPL BUTIBORI All rights reserved.</span>
                        <div className="flex gap-4 mt-2 md:mt-0">
                            <a href="#" className="hover:text-white transition">Privacy</a>
                            <a href="#" className="hover:text-white transition">Terms</a>
                            <a href="#" className="hover:text-white transition">FAQ</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Player Registration Popup */}
<PlayerRegistrationPopup
  isOpen={registerPopup}
  onClose={() => dispatch(toggleRegisterPopup())}
/>

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
        animation: scroll-left 120s linear infinite; /* Changed from 40s to 80s */
    }
    
    .sponsor-scroll-right {
        animation: scroll-right 120s linear infinite; /* Changed from 40s to 80s */
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