import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaCode, FaRocket, FaHeart } from "react-icons/fa";

export default function FooterCom() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sachin-kumar-90884117a/",
      icon: FaLinkedin,
      color: "hover:text-blue-600"
    },
    {
      name: "GitHub", 
      url: "https://github.com/SKSingh0703",
      icon: FaGithub,
      color: "hover:text-gray-800 dark:hover:text-gray-200"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sachin_kumar_singh_07/",
      icon: FaInstagram,
      color: "hover:text-pink-600"
    }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dashboard", path: "/dashboard?tab=dash" },
    { name: "DSA Sheet", path: "/dashboard?tab=posts" },
    { name: "Contests", path: "/dashboard?tab=contests" }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <FaCode className="text-2xl text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-lg">
                  Scripted
                </span>
                <span className="text-xl font-bold">Sphere</span>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Empowering your coding journey with seamless integration. Track progress, 
              master DSA, and excel in contests - all in one platform.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 ${social.color}`}
                  title={social.name}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FaRocket className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Connect</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FaLinkedin className="text-sm" />
                </div>
                <a 
                  href="https://www.linkedin.com/in/sachin-kumar-90884117a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Sachin Kumar Singh
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FaGithub className="text-sm" />
                </div>
                <a 
                  href="https://github.com/SKSingh0703" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  SKSingh0703
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-600 rounded-lg">
                  <FaInstagram className="text-sm" />
                </div>
                <a 
                  href="https://www.instagram.com/sachin_kumar_singh_07/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  sachin_kumar_singh_07
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {new Date().getFullYear()} Scripted Sphere. Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>by Sachin Kumar Singh</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}