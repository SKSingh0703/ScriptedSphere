
// import Profile from "./Profile"; // Commented out - profile modal removed
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import RatingChart from "./Profile/RatingChart";
import RatingChartCodeforces from "./Profile/CodeforcesRatingContest";
import { motion } from "framer-motion";
import { 
  FaCode, 
  FaTrophy, 
  FaCalendarAlt, 
  FaChartLine, 
  FaFire, 
  FaStar,
  FaMedal,
  FaRocket,
  FaBrain,
  FaClock,
  FaUsers,
  FaAward
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef, SiGeeksforgeeks } from "react-icons/si";
import Toast from "./Toast";

export default function DashHero() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [cacheStatus, setCacheStatus] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info", isVisible: false });
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the new cached endpoint
      const res = await fetch(`/api/code/cachedPlatformData/${currentUser?._id}`);
      if (res.ok) {
        const response = await res.json();
        console.log('Cached data response:', response);
        
        if (response.success) {
          setDataLoaded(true);
          setData(response.data);
          setCacheStatus({
            fromCache: response.fromCache,
            lastUpdated: response.lastUpdated
          });
          
          // Show cache status in console for debugging
          if (response.fromCache) {
            console.log('✅ Data loaded from cache (instant)');
          } else {
            console.log('🔄 Data loaded fresh (first time or cache expired)');
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const refreshPlatformData = async () => {
    try {
      setRefreshing(true);
      setError(null);
      setToast({ message: "Refreshing platform data...", type: "info", isVisible: true });
      
      const res = await fetch('/api/code/refreshPlatformData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (res.ok) {
        const response = await res.json();
        if (response.success && response.data) {
          setData(response.data);
          setCacheStatus({
            fromCache: false,
            lastUpdated: response.lastUpdated
          });
          setToast({ message: "Platform data refreshed successfully! 🎉", type: "success", isVisible: true });
          console.log('✅ Platform data refreshed successfully');
        } else {
          setToast({ message: response.message || 'No data available. Please check your platform URLs.', type: "warning", isVisible: true });
          setError(response.message || 'No data available. Please check your platform URLs.');
        }
      } else {
        throw new Error('Failed to refresh data');
      }
    } catch (err) {
      console.error('Refresh error:', err);
      setToast({ message: err.message || 'Failed to refresh platform data', type: "error", isVisible: true });
      setError(err.message || 'Failed to refresh platform data');
    } finally {
      setRefreshing(false);
      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
      }, 5000);
    }
  };
  
  useEffect(() => {
    if (!currentUser || (!currentUser.leetcode && !currentUser.codeforces && !currentUser.codechef && !currentUser.geekforgeeks)) {
      navigate("?tab=profile&tabProfile=platform");
    } else {
      fetchData();
    }
  }, [currentUser, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'leetcode': return SiLeetcode;
      case 'codeforces': return SiCodeforces;
      case 'codechef': return SiCodechef;
      case 'geekforgeeks': return SiGeeksforgeeks;
      default: return FaCode;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform.toLowerCase()) {
      case 'leetcode': return 'from-orange-400 to-red-500';
      case 'codeforces': return 'from-red-400 to-pink-500';
      case 'codechef': return 'from-yellow-400 to-orange-500';
      case 'geekforgeeks': return 'from-green-400 to-emerald-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };
  
  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {currentUser?.username || 'Coder'}
          </span>! 🚀
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Ready to conquer today's coding challenges?
        </p>
        
        {/* Cache Status Indicator */}
        <div className="flex justify-center items-center gap-4">
          {cacheStatus && (
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              cacheStatus.fromCache 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            }`}>
              {cacheStatus.fromCache ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Data loaded instantly from cache
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Fresh data loaded
                </>
              )}
            </div>
          )}
          
          <button
            onClick={refreshPlatformData}
            disabled={refreshing}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
          >
            {refreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Refreshing...
              </>
            ) : (
              <>
                <FaRocket className="mr-2" />
                Refresh Data
              </>
            )}
          </button>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Platform Ratings - Smart Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {(() => {
            const platforms = [];
            if (currentUser.leetcode) platforms.push({
              name: 'LeetCode',
              rating: data.leetcodeRating || "0",
              icon: SiLeetcode,
              colors: {
                bg: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
                border: 'border-orange-200 dark:border-orange-800',
                icon: 'text-orange-500',
                text: 'text-orange-600 dark:text-orange-400',
                rating: 'text-orange-800 dark:text-orange-200'
              }
            });
            if (currentUser.codeforces) platforms.push({
              name: 'Codeforces',
              rating: data.codeforcesRating || "0",
              icon: SiCodeforces,
              colors: {
                bg: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
                border: 'border-red-200 dark:border-red-800',
                icon: 'text-red-500',
                text: 'text-red-600 dark:text-red-400',
                rating: 'text-red-800 dark:text-red-200'
              }
            });
            if (currentUser.codechef) platforms.push({
              name: 'CodeChef',
              rating: data.codechefRating || "0",
              icon: SiCodechef,
              colors: {
                bg: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
                border: 'border-yellow-200 dark:border-yellow-800',
                icon: 'text-yellow-500',
                text: 'text-yellow-600 dark:text-yellow-400',
                rating: 'text-yellow-800 dark:text-yellow-200'
              }
            });
            if (currentUser.geekforgeeks) platforms.push({
              name: 'GeeksforGeeks',
              rating: data.geekforgeeksRating || "0",
              icon: SiGeeksforgeeks,
              colors: {
                bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
                border: 'border-green-200 dark:border-green-800',
                icon: 'text-green-500',
                text: 'text-green-600 dark:text-green-400',
                rating: 'text-green-800 dark:text-green-200'
              }
            });

            // Smart grid layout based on number of platforms
            let gridClass = '';
            if (platforms.length === 1) {
              gridClass = 'flex justify-center';
            } else if (platforms.length === 2) {
              gridClass = 'grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto';
            } else if (platforms.length === 3) {
              gridClass = 'grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto';
            } else {
              gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4';
            }

            return (
              <div className={gridClass}>
                {platforms.map((platform, index) => {
                  const IconComponent = platform.icon;
                  return (
                    <div
                      key={platform.name}
                      className={`bg-gradient-to-br ${platform.colors.bg} rounded-2xl p-6 shadow-lg border ${platform.colors.border}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className={`text-3xl ${platform.colors.icon}`} />
                        <span className={`text-sm font-semibold ${platform.colors.text}`}>{platform.name}</span>
                      </div>
                      <p className={`text-3xl font-bold ${platform.colors.rating}`}>{platform.rating}</p>
                      <p className={`text-sm ${platform.colors.text} mt-1`}>Current Rating</p>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </motion.div>

        {/* Empty State Check */}
        {dataLoaded && (!data || Object.keys(data).length === 0 || (data.totalQuestions === 0 && data.totalContests === 0 && data.totalActiveDays === 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 shadow-lg border border-yellow-200 dark:border-yellow-800 text-center"
          >
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-fit mx-auto mb-6">
              <FaRocket className="text-4xl text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
              No Data Found
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 mb-6 max-w-2xl mx-auto">
              It looks like we couldn't fetch your coding platform data. This might be because:
            </p>
            <ul className="text-left text-yellow-700 dark:text-yellow-300 mb-6 max-w-md mx-auto space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Your platform URLs might be incorrect
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Your profiles might be private
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                The platforms might be temporarily unavailable
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={refreshPlatformData}
                disabled={refreshing}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                {refreshing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <FaRocket className="mr-2" />
                    Try Again
                  </>
                )}
              </button>
              <button
                onClick={() => navigate("?tab=profile&tabProfile=platform")}
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-yellow-700 dark:text-yellow-300 border-2 border-yellow-300 dark:border-yellow-600 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-200 font-medium"
              >
                <FaUser className="mr-2" />
                Update Profiles
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">Total Questions</p>
                  <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{data.totalQuestions || "0"}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <FaCode className="text-2xl text-white" />
                </div>
              </div>
        </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 shadow-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-400 text-sm font-semibold">Total Contests</p>
                  <p className="text-3xl font-bold text-green-800 dark:text-green-200">{data.totalContests || "0"}</p>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <FaTrophy className="text-2xl text-white" />
              </div>
            </div>
              </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 shadow-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-semibold">Active Days</p>
                  <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">{data.totalActiveDays || "0"}</p>
            </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <FaFire className="text-2xl text-white" />
              </div>
            </div>
          </div>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Donut Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaChartLine className="mr-2 text-blue-500" />
                Problems Solved
              </h3>
              {dataLoaded && (
                <div className="flex flex-col items-center">
                  <DonutChart  
                  easy={data.easy} 
                  medium={data.medium} 
                  hard={data.hard} 
                  totalQuestions={data.totalQuestions} 
                  />
                  <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-green-600 dark:text-green-400 font-semibold">Easy</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-200">{data.easy || "0"}</p>
              </div>
                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-yellow-600 dark:text-yellow-400 font-semibold">Medium</p>
                      <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{data.medium || "0"}</p>
                </div>
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 font-semibold">Hard</p>
                      <p className="text-2xl font-bold text-red-800 dark:text-red-200">{data.hard || "0"}</p>
                </div>
              </div>
            </div>
              )}
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaBrain className="mr-2 text-purple-500" />
                DSA Topics Analysis
              </h3>
              {dataLoaded && <BarChart topics={data.topics} />}
          </div> 
          </motion.div>


          {/* Rating Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {currentUser.leetcode && dataLoaded && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <SiLeetcode className="mr-2 text-orange-500" />
                  LeetCode Rating History
                </h3>
                <RatingChart platform={"Leetcode"} rankingHistory={data.leetcodeRankingHistory} />
              </div>
            )}

            {currentUser.codeforces && dataLoaded && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <SiCodeforces className="mr-2 text-red-500" />
                  Codeforces Rating History
                </h3>
                <RatingChartCodeforces platform={"Codeforces"} rankingHistory={data.codeforcesRankingHistory} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}
