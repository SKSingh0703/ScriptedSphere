import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaRocket, 
  FaCode, 
  FaTrophy, 
  FaChartLine, 
  FaBrain, 
  FaUsers, 
  FaUser,
  FaArrowRight,
  FaChevronRight,
  FaPlay,
  FaStar,
  FaMedal,
  FaFire,
  FaGraduationCap,
  FaLaptopCode,
  FaLightbulb,
  FaCogs
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

        <div className="relative z-10 flex flex-col gap-8 py-32 px-6 max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Main Heading */}
            <div className="mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Code. Compete. Conquer.
                </span>
              </motion.h1>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
              >
                Your All-in-One Coding Platform
              </motion.h2>
            </div>

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6">
                Master <span className="font-semibold text-blue-600 dark:text-blue-400">Data Structures & Algorithms</span>, 
                dominate <span className="font-semibold text-purple-600 dark:text-purple-400">coding contests</span>, 
                and track your <span className="font-semibold text-pink-600 dark:text-pink-400">progress</span> — all in one place.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>500+ DSA Problems</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Live Contest Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Progress Tracking</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <Link
                to="/dashboard?tab=dash"
                className="group px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg"
                >
                <FaRocket className="text-xl" />
                Get Started
                <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </Link>
              
                <Link
                to="/dashboard?tab=posts"
                className="group px-10 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-bold rounded-2xl border-2 border-gray-200 dark:border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg"
              >
                <FaCode className="text-xl" />
                Practice DSA
                <FaChevronRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              { icon: FaChartLine, title: "Progress Tracking", desc: "Monitor your coding journey" },
              { icon: FaTrophy, title: "Contest Prep", desc: "Excel in coding competitions" },
              { icon: FaBrain, title: "DSA Mastery", desc: "Master data structures & algorithms" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-fit mx-auto mb-4">
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
      </div>
      </motion.div>

      {/* Feature Cards Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Explore Our Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Click on any card to explore different sections of our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Link to="/dashboard?tab=dash" className="block">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-200 dark:border-blue-700/30 h-full">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaChartLine className="text-3xl text-white" />
            </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Dashboard
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Track your coding progress, view statistics, and monitor your performance across all platforms.
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    View Dashboard
                    <FaArrowRight className="ml-2" />
                  </div>
      </div>
              </Link>
            </motion.div>

            {/* DSA Sheet Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Link to="/dashboard?tab=posts" className="block">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200 dark:border-green-700/30 h-full">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaCode className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    DSA Sheet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Master data structures and algorithms with our curated collection of problems and solutions.
                  </p>
                  <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Start Learning
                    <FaArrowRight className="ml-2" />
                  </div>
            </div>
                </Link>
            </motion.div>

            {/* Contests Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Link to="/dashboard?tab=contests" className="block">
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-200 dark:border-purple-700/30 h-full">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaTrophy className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Contests
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Stay updated with upcoming coding contests and competitions across all major platforms.
                  </p>
                  <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    View Contests
                    <FaArrowRight className="ml-2" />
              </div>
            </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* DSA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                  <FaLaptopCode className="text-3xl text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                  Master DSA
                </h2>
      </div>

              <h3 className="text-2xl md:text-3xl font-semibold text-green-600 dark:text-green-400">
                One Step at a Time
              </h3>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Unlock your problem-solving potential with a curated collection of DSA questions, 
              progress tracking, and solutions across all formats—all in one place!
              </p>

              {/* Features List */}
              <div className="space-y-4">
                {[
                  { icon: FaLightbulb, text: "Curated problem sets by difficulty" },
                  { icon: FaChartLine, text: "Track your progress in real-time" },
                  { icon: FaMedal, text: "Solutions and explanations included" },
                  { icon: FaFire, text: "Daily challenges and streaks" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <feature.icon className="text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  to="/dashboard?tab=posts"
                  className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaCode className="text-lg" />
                  Start DSA Sheet
                  <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/dashboard?tab=posts"
                  className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-600 flex items-center justify-center gap-2"
                >
                  <FaGraduationCap className="text-lg" />
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Icon Display */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              <div className="relative">
                {/* Main Icon Container */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-80 h-80 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl"
                >
                  <FaCode className="text-8xl text-white" />
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
                >
                  <FaStar className="text-yellow-500 text-3xl" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: 1 
                  }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
                >
                  <FaTrophy className="text-yellow-500 text-3xl" />
                </motion.div>

                <motion.div
                  animate={{ 
                    x: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: 0.5 
                  }}
                  className="absolute top-1/2 -left-8 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl"
                >
                  <FaMedal className="text-orange-500 text-2xl" />
                </motion.div>

                <motion.div
                  animate={{ 
                    x: [0, -10, 0],
                    y: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: 1.5 
                  }}
                  className="absolute top-1/2 -right-8 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl"
                >
                  <FaFire className="text-red-500 text-2xl" />
                </motion.div>
              </div>
            </motion.div>
            </div>
          </div>
      </motion.div>
    </div>
  );
}
