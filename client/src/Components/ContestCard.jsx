import { useState } from "react";
import { FaCalendarAlt, FaClock, FaExternalLinkAlt, FaTrophy, FaUsers, FaCode, FaRocket, FaCodeBranch } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiHackerrank, SiCodechef } from "react-icons/si";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function ContestCard({ contest }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClickContest = () => {
    window.open(contest.contestUrl, '_blank');
  };

  const handleClickCalendar = () => {
    const startDate = new Date(contest.contestStartDate).toISOString().split('T')[0];
    const startTime = new Date(contest.contestStartDate).toLocaleTimeString('en-GB');
    const endTime = new Date(new Date(contest.contestStartDate).getTime() + contest.contestDuration * 1000).toLocaleTimeString('en-GB');
    const title = contest.contestName;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDate}T${startTime}%2F${startDate}T${endTime}&details=&location=&sf=true&output=xml&title=${title}`;
    window.open(url, '_blank');
  };

  const getPlatformConfig = (platform) => {
    const platformLower = platform.toLowerCase();
    
    switch (platformLower) {
      case 'leetcode':
        return {
          icon: SiLeetcode,
          gradient: 'from-orange-400 to-red-500',
          bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          textColor: 'text-orange-600 dark:text-orange-400',
          buttonColor: 'bg-orange-500 hover:bg-orange-600',
          accentColor: 'text-orange-500'
        };
      case 'codeforces':
        return {
          icon: SiCodeforces,
          gradient: 'from-red-400 to-pink-500',
          bgGradient: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-600 dark:text-red-400',
          buttonColor: 'bg-red-500 hover:bg-red-600',
          accentColor: 'text-red-500'
        };
      case 'atcoder':
        return {
          icon: FaCodeBranch,
          gradient: 'from-blue-400 to-cyan-500',
          bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          textColor: 'text-blue-600 dark:text-blue-400',
          buttonColor: 'bg-blue-500 hover:bg-blue-600',
          accentColor: 'text-blue-500'
        };
      case 'hackerrank':
        return {
          icon: SiHackerrank,
          gradient: 'from-green-400 to-emerald-500',
          bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-600 dark:text-green-400',
          buttonColor: 'bg-green-500 hover:bg-green-600',
          accentColor: 'text-green-500'
        };
      case 'codechef':
        return {
          icon: SiCodechef,
          gradient: 'from-yellow-400 to-orange-500',
          bgGradient: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-600 dark:text-yellow-400',
          buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
          accentColor: 'text-yellow-500'
        };
      default:
        return {
          icon: FaCode,
          gradient: 'from-gray-400 to-slate-500',
          bgGradient: 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          textColor: 'text-gray-600 dark:text-gray-400',
          buttonColor: 'bg-gray-500 hover:bg-gray-600',
          accentColor: 'text-gray-500'
        };
    }
  };

  const platformConfig = getPlatformConfig(contest.platform);
  const PlatformIcon = platformConfig.icon || FaCode;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const { date, time } = formatDate(contest.contestStartDate);
  const duration = formatDuration(contest.contestDuration);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${platformConfig.bgGradient} border-2 ${platformConfig.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 group`}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${platformConfig.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Platform Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-white dark:bg-gray-800 shadow-lg ${platformConfig.textColor}`}>
          <PlatformIcon className="w-4 h-4" />
          <span className="text-xs font-semibold capitalize">{contest.platform}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Contest Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
            {contest.contestName}
          </h3>
          
          {/* Contest Type Indicator */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FaTrophy className={`w-3 h-3 ${platformConfig.accentColor}`} />
            <span>Competitive Programming</span>
          </div>
        </div>

        {/* Contest Details */}
        <div className="space-y-3 mb-6">
          {/* Date & Time */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${platformConfig.accentColor}`}>
              <FaCalendarAlt className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">{date}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{time}</p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${platformConfig.accentColor}`}>
              <FaClock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Duration</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{duration}</p>
            </div>
          </div>

          {/* Platform Info */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${platformConfig.accentColor}`}>
              <FaRocket className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Platform</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{contest.platform}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClickContest}
            className={`w-full ${platformConfig.buttonColor} text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2`}
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            <span>Register Now</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClickCalendar}
            className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <FaCalendarAlt className="w-4 h-4" />
            <span>Add to Calendar</span>
          </motion.button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${platformConfig.gradient} opacity-5 pointer-events-none`}
      />
    </motion.div>
  );
}
