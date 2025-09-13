import { useEffect, useState } from "react";
import ContestCard from "../Components/ContestCard";
import ErrorBoundary from "../Components/ErrorBoundary";
import { FaTrophy, FaCalendarAlt, FaClock, FaRocket, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contest() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, leetcode, codeforces, atcoder

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/code/getcontests");
        if (!res.ok) {
          return console.log("Something went wrong");
        }
        const data = await res.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredAndSortedContests = data.data
          .filter((contest) => new Date(contest.contestStartDate) > today)
          .sort((a, b) => {
            return new Date(a.contestStartDate) - new Date(b.contestStartDate);
          });

        setContests(filteredAndSortedContests);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const filteredContests = contests.filter(contest => 
    filter === 'all' || contest.platform.toLowerCase() === filter.toLowerCase()
  );

  const getPlatformStats = () => {
    const stats = contests.reduce((acc, contest) => {
      const platform = contest.platform.toLowerCase();
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {});
    return stats;
  };

  const platformStats = getPlatformStats();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-ping"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex justify-center items-center space-x-4 mb-6">
              <FaTrophy className="text-6xl text-yellow-400 animate-bounce" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Coding Contests
              </h1>
              <FaRocket className="text-6xl text-yellow-400 animate-pulse" />
            </div>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Compete with the best, sharpen your skills, and climb the leaderboards
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                <FaCalendarAlt className="inline mr-2" />
                {contests.length} Upcoming Contests
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                <FaClock className="inline mr-2" />
                Multiple Platforms
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Filter by Platform
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All ({contests.length})
            </button>
            
            {Object.entries(platformStats).map(([platform, count]) => (
              <button
                key={platform}
                onClick={() => setFilter(platform)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  filter === platform
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {platform} ({count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contests Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <FaSpinner className="text-6xl text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-400">Loading contests...</p>
            </div>
          </div>
        ) : filteredContests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <FaTrophy className="text-8xl text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-4">
              No contests found
            </h3>
            <p className="text-lg text-gray-500 dark:text-gray-500">
              {filter === 'all' 
                ? "No upcoming contests available at the moment." 
                : `No upcoming ${filter} contests available.`}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContests.map((contest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ContestCard contest={contest} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      </div>
    </ErrorBoundary>
  );
}
