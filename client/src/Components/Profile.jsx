import { useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { FaLocationDot, FaUniversity, FaLinkedinIn, FaCode, FaTrophy, FaFire, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomGradient = () => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-blue-600',
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-teal-500 to-green-600',
      'from-pink-500 to-rose-600'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-6"
    >
      {/* Profile Picture */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg">
          <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
            {currentUser.profilePicture ? (
              <img
                className="w-full h-full object-cover"
                src={currentUser.profilePicture}
                alt="Profile"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`w-full h-full bg-gradient-to-br ${getRandomGradient()} flex items-center justify-center text-white text-2xl font-bold ${currentUser.profilePicture ? 'hidden' : 'flex'}`}
            >
              {getInitials(currentUser.firstname + ' ' + currentUser.lastname)}
            </div>
          </div>
        </div>
        
        {/* Online Status Indicator */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {currentUser.firstname} {currentUser.lastname}
        </h2>
        <p className="text-blue-600 dark:text-blue-400 font-semibold">
          @{currentUser.username}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
          {currentUser.aboutMe || "Life goal: Stable Lifestyle. 🚀"}
        </p>
      </div>

      {/* Contact Information */}
      <div className="w-full space-y-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <div className="p-2 bg-blue-500 rounded-lg">
            <MdEmail className="text-white text-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Email</p>
            <p className="text-sm text-gray-800 dark:text-gray-200 truncate">
              {currentUser.email}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800"
        >
          <div className="p-2 bg-green-500 rounded-lg">
            <FaLocationDot className="text-white text-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Location</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {currentUser.country || "Not specified"}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800"
        >
          <div className="p-2 bg-purple-500 rounded-lg">
            <FaUniversity className="text-white text-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Education</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {currentUser.college || "Not specified"}
            </p>
          </div>
        </motion.div>

        <motion.a
          whileHover={{ scale: 1.02 }}
          href={currentUser.linkedIn || "https://www.linkedin.com/in/sachin-kumar-90884117a/"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl border border-indigo-200 dark:border-indigo-800 hover:shadow-md transition-all duration-200">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <FaLinkedinIn className="text-white text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">LinkedIn</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {currentUser.linkedin || "Connect with me"}
              </p>
            </div>
          </div>
        </motion.a>
      </div>

      {/* Quick Stats */}
      <div className="w-full grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <FaCode className="text-blue-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600 dark:text-gray-400">Coder</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <FaTrophy className="text-yellow-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600 dark:text-gray-400">Competitor</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <FaFire className="text-red-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600 dark:text-gray-400">Passionate</p>
        </div>
      </div>
    </motion.div>
  );
}
