// pages/ManagingDirector.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Target, 
  TrendingUp, 
  Users, 
  Trophy,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Quote,
  Star,
  Shield,
  Heart,
  Building,
  School,
  Newspaper,
  Globe
} from "lucide-react";
import mdImage from "../assets/director.jpeg";

const ManagingDirector = () => {
  const ventures = [
    { icon: Trophy, name: "DCC - Dream Cricket Club", description: "Nurturing young cricketing talent nationwide" },
    { icon: School, name: "Dream Group of Schools", description: "Chain of 3 schools fostering academic excellence" },
    { icon: Building, name: "Dream Developers", description: "Growing name in real estate" },
    { icon: Newspaper, name: "Star Apex News", description: "Media outlet amplifying authentic voices" }
  ];

  const achievements = [
    "Organized Dream Premier League (DPL) 2025 - National-level cricket tournament",
    "Players from across India participated in DPL 2025",
    "Discovered and promoted talent from rural and underrepresented regions",
    "Created platform for untapped potential across the nation",
    "Founded Dream Group of Schools - 3 institutions for academic excellence",
    "Established Dream Developers in real estate sector",
    "Launched Star Apex News for authentic storytelling"
  ];

  const philosophy = [
    {
      icon: Target,
      title: "Mission",
      description: "To ensure that no dream is left behind, no matter where it's born - providing opportunities to every aspiring talent."
    },
    {
      icon: Heart,
      title: "Vision",
      description: "Create a dynamic platform dedicated to discovering, nurturing, and promoting young talent from every corner of the nation."
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Transforming lives by giving dreams the right direction - helping them soar, inspire, and create lasting change."
    }
  ];

  const stats = [
    { icon: Trophy, value: "2025", label: "DPL Inaugural Year" },
    { icon: Users, value: "Nationwide", label: "Talent Reach" },
    { icon: School, value: "3", label: "Dream Schools" },
    { icon: Building, value: "4", label: "Business Ventures" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2472] via-[#1E293B] to-[#0A2472] text-white">
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#94A3B8]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <Award className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">The Visionary</span>
            <Star className="w-4 h-4 text-[#94A3B8]" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent">
              Mr. Mujib Pathan
            </span>
          </h1>
          
          <p className="text-2xl text-[#F1F5F9] max-w-3xl mx-auto font-light">
            Founder & Managing Director — DCC (Dream Cricket Club)
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#94A3B8] to-transparent mx-auto mt-6"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2472] to-[#1E293B] rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <img
                src={mdImage}
                alt="Mr. Mujib Pathan - Founder & Managing Director, DCC"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2472] via-transparent to-transparent"></div>
              
              {/* Name Tag */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A2472] to-transparent">
                <h2 className="text-3xl font-bold text-white mb-1">Mr. Mujib Pathan</h2>
                <p className="text-[#F1F5F9] text-lg">Founder & Managing Director, DCC</p>
              </div>
            </div>
            
            {/* Quote Badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#1E293B] p-4 rounded-2xl border border-white/20 shadow-xl backdrop-blur-sm">
              <Quote className="w-8 h-8 text-[#94A3B8]" />
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-[#94A3B8]" />
                The Visionary Behind Dreams Turned Reality
              </h3>
              <p className="text-[#F1F5F9] text-lg leading-relaxed mb-4">
                Mr. Mujib Pathan is not just a name, but a mission in motion. As the Founder and Managing Director of DCC - Dream Cricket Club, he has created a dynamic platform dedicated to discovering, nurturing, and promoting young cricketing talent from every corner of the nation — especially from rural and underrepresented regions where potential often remains untapped.
              </p>
              <p className="text-[#F1F5F9] text-lg leading-relaxed">
                Hailing from a humble village himself, Mr. Pathan has lived the struggle of limited opportunities. Determined to rewrite that story for future generations, he launched DCC with one goal: to ensure that no dream is left behind, no matter where it's born.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <stat.icon className="w-5 h-5 text-[#94A3B8] mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-[#F1F5F9]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* DPL Achievement Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-[#0A2472] to-[#1E293B] rounded-3xl p-10 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            
            <Trophy className="w-16 h-16 text-[#94A3B8] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Dream Premier League 2025</h2>
            <p className="text-2xl text-[#F1F5F9] max-w-3xl mx-auto">
              A groundbreaking national-level cricket tournament that saw players from all across India come together to compete, connect, and shine.
            </p>
            <div className="mt-6 text-[#94A3B8] text-lg">
              More than just a tournament — a celebration of talent, unity, and limitless possibility.
            </div>
          </div>
        </motion.div>

        {/* Ventures Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-white to-[#94A3B8] bg-clip-text text-transparent">
              Beyond Cricket — Empowering Through Multiple Ventures
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ventures.map((venture, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-[#0A2472] rounded-xl flex items-center justify-center mb-4">
                  <venture.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{venture.name}</h3>
                <p className="text-sm text-[#F1F5F9]">{venture.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {philosophy.map((item, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="w-14 h-14 bg-[#0A2472] rounded-2xl flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-[#F1F5F9] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="bg-gradient-to-br from-[#0A2472] to-[#1E293B] rounded-3xl p-10 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-[#94A3B8]" />
            <h2 className="text-3xl font-bold text-white">Key Milestones</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="w-6 h-6 bg-[#94A3B8]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#94A3B8] rounded-full"></div>
                </div>
                <span className="text-[#F1F5F9]">{achievement}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block max-w-4xl mx-auto">
            <Quote className="w-12 h-12 text-[#94A3B8] mx-auto mb-6 opacity-50" />
            <p className="text-2xl md:text-3xl text-[#F1F5F9] italic leading-relaxed mb-8">
              "When dreams are given the right direction, they don't just take flight — they soar, inspire, and transform lives."
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#94A3B8] to-transparent mx-auto"></div>
            <p className="text-xl text-white font-semibold mt-4">— Mr. Mujib Pathan</p>
            <p className="text-base text-[#94A3B8]">Founder & Managing Director, DCC - Dream Cricket Club</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManagingDirector;