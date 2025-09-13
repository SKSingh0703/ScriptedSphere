import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold text-gray-300 dark:text-gray-600 mb-4">
            404
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Oops! Nothing Here
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Don't worry, even the best coders encounter 404 errors sometimes!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FaHome className="text-lg" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            <FaArrowLeft className="text-lg" />
            Go Back
          </button>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaSearch className="text-blue-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Looking for something specific?
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Try visiting our <Link to="/" className="text-blue-500 hover:underline">homepage</Link> or 
            <Link to="/dashboard" className="text-blue-500 hover:underline ml-1">dashboard</Link> to find what you need.
          </p>
        </motion.div>

        {/* Fun Coding Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/30"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            "The best error messages are the ones that help you debug, not the ones that make you cry." 
            <span className="block mt-1 text-xs text-gray-500 dark:text-gray-500">
              - Every Developer Ever
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
