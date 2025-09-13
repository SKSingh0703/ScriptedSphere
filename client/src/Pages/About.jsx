import { motion } from "framer-motion";
import { 
  FaCogs, 
  FaCalendarAlt, 
  FaLock, 
  FaBook, 
  FaCode, 
  FaLaptopCode, 
  FaUserGraduate, 
  FaBullseye,
  FaGithub,
  FaLinkedin,
  FaInstagram
} from "react-icons/fa";

const AboutSection = () => {
  const features = [
    {
      icon: FaCogs,
      title: "Platform Management",
      description: "Unified dashboard for all coding platforms",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      darkBgColor: "from-blue-900/20 to-blue-800/20",
      borderColor: "border-blue-200 dark:border-blue-700/30"
    },
    {
      icon: FaCalendarAlt,
      title: "Contest Updates",
      description: "Live contest schedules and notifications",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
      darkBgColor: "from-indigo-900/20 to-indigo-800/20",
      borderColor: "border-indigo-200 dark:border-indigo-700/30"
    },
    {
      icon: FaLock,
      title: "Secure Auth",
      description: "Safe login with progress tracking",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      darkBgColor: "from-green-900/20 to-green-800/20",
      borderColor: "border-green-200 dark:border-green-700/30"
    },
    {
      icon: FaBook,
      title: "DSA Practice",
      description: "Curated problems for skill building",
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-50 to-orange-100",
      darkBgColor: "from-yellow-900/20 to-orange-800/20",
      borderColor: "border-yellow-200 dark:border-yellow-700/30"
    }
  ];

  const personalInfo = [
    {
      icon: FaCode,
      title: "Skills",
      description: "React, Node.js, JavaScript",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      darkBgColor: "from-blue-900/20 to-blue-800/20",
      borderColor: "border-blue-200 dark:border-blue-700/30"
    },
    {
      icon: FaLaptopCode,
      title: "Projects",
      description: "Web applications & clones",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
      darkBgColor: "from-indigo-900/20 to-indigo-800/20",
      borderColor: "border-indigo-200 dark:border-indigo-700/30"
    },
    {
      icon: FaUserGraduate,
      title: "Education",
      description: "B.Tech, BIT Mesra",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      darkBgColor: "from-green-900/20 to-green-800/20",
      borderColor: "border-green-200 dark:border-green-700/30"
    },
    {
      icon: FaBullseye,
      title: "Goals",
      description: "Impactful tech career",
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-50 to-orange-100",
      darkBgColor: "from-yellow-900/20 to-orange-800/20",
      borderColor: "border-yellow-200 dark:border-yellow-700/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-16"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="text-gray-800 dark:text-white">About</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Scripted Sphere
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8"
          >
            Your all-in-one platform for <span className="font-semibold text-blue-600 dark:text-blue-400">coding excellence</span>
          </motion.p>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-sm md:text-base text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>DSA Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Contest Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span>Progress Tracking</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Everything you need for coding success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-r ${feature.bgColor} dark:${feature.darkBgColor} rounded-2xl p-8 border ${feature.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-xl w-fit mb-6`}>
                  <feature.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Me Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              About the Creator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Meet the developer behind this platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Personal Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Hi, I&apos;m Sachin Kumar Singh
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Full-stack developer passionate about creating impactful web solutions.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/sachin-kumar-90884117a/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a 
                    href="https://github.com/SKSingh0703" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                  <a 
                    href="https://www.instagram.com/sachin_kumar_singh_07/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {personalInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-r ${info.bgColor} dark:${info.darkBgColor} rounded-xl p-6 border ${info.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`p-3 bg-gradient-to-r ${info.color} rounded-lg w-fit mb-4`}>
                    <info.icon className="text-2xl text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {info.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {info.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
