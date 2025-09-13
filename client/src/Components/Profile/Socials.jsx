
import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaInstagram, FaLinkedin, FaGithub, FaFileAlt, FaSave, FaCheck, FaTimes, FaSpinner, FaExternalLinkAlt } from "react-icons/fa";

import { Alert } from "flowbite-react";
import { useEffect,useState } from "react";
import { useDispatch,  } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart,updateUserSuccess,updateUserFailure,updateUserEnd} from "../../redux/user/userSlice";
import {useLocation} from "react-router-dom";
import { motion } from "framer-motion";

export default function Socials() {
  const {currentUser,error,loading} = useSelector((state)=>state.user);

  const [formdata,setFormData] = useState({});
  const [uploadSuccess , setUploadSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);

  const dispatch = useDispatch();

  const location = useLocation();
  const [,setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tabProfile');
    
    if(tabFromUrl) setTab(tabFromUrl);

  },[location.search]);


  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]:e.target.value,
    });
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    if(Object.keys(formdata).length===0){
      setUpdateUserError("No chages Made");
      setTimeout(()=>{
        setUpdateUserError(null);
      },5000);
      return;
    }
    
    try {
     dispatch( updateUserStart());
     const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(formdata),
     })
     const data = await res.json();
     if(!res.ok){
        setUpdateUserError(data.message);
        setTimeout(()=>{
          setUpdateUserError(null);
        },5000);
        dispatch(updateUserFailure());
     }
     else{
      dispatch(updateUserSuccess(data));
      setUploadSuccess("User's profile updated successfully !!!");
      setTimeout(()=>{
        setUploadSuccess(null);
      },5000);
     }
     dispatch(updateUserEnd());
    } catch (error) {
      dispatch(updateUserFailure(error));
      dispatch(updateUserEnd());
    }
  }
  const socialPlatforms = [
    {
      id: 'linkedin',
      icon: FaLinkedin,
      name: 'LinkedIn',
      placeholder: 'https://www.linkedin.com/in/yourname',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100',
      darkBgColor: 'from-blue-900/20 to-blue-800/20',
      borderColor: 'border-blue-200 dark:border-blue-700/30',
      iconColor: 'text-blue-600',
      focusColor: 'focus:ring-blue-500'
    },
    {
      id: 'github',
      icon: FaGithub,
      name: 'GitHub',
      placeholder: 'https://github.com/yourname',
      color: 'from-gray-800 to-gray-900',
      bgColor: 'from-gray-50 to-gray-100',
      darkBgColor: 'from-gray-900/20 to-gray-800/20',
      borderColor: 'border-gray-200 dark:border-gray-700/30',
      iconColor: 'text-gray-800 dark:text-gray-200',
      focusColor: 'focus:ring-gray-500'
    },
    {
      id: 'instagram',
      icon: FaInstagram,
      name: 'Instagram',
      placeholder: 'https://www.instagram.com/yourname',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'from-pink-50 to-purple-100',
      darkBgColor: 'from-pink-900/20 to-purple-800/20',
      borderColor: 'border-pink-200 dark:border-pink-700/30',
      iconColor: 'text-pink-600',
      focusColor: 'focus:ring-pink-500'
    },
    {
      id: 'resume',
      icon: FaFileAlt,
      name: 'Resume',
      placeholder: 'https://drive.google.com/file/your-resume',
      color: 'from-green-600 to-emerald-700',
      bgColor: 'from-green-50 to-emerald-100',
      darkBgColor: 'from-green-900/20 to-emerald-800/20',
      borderColor: 'border-green-200 dark:border-green-700/30',
      iconColor: 'text-green-600',
      focusColor: 'focus:ring-green-500'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl max-w-4xl mx-auto p-8 border border-gray-100 dark:border-gray-700"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
            <FaInstagram className="text-2xl text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
          Social Profile
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Connect your social media and professional profiles
        </p>
      </motion.div>

      {/* Social Platform Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {socialPlatforms.map((platform, index) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`bg-gradient-to-r ${platform.bgColor} dark:${platform.darkBgColor} rounded-xl p-6 border ${platform.borderColor}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 bg-gradient-to-r ${platform.color} rounded-lg`}>
                <platform.icon className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {platform.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {platform.id === 'resume' ? 'Share your resume/CV' : `Connect your ${platform.name} profile`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TextInput
                id={platform.id}
                onChange={handleChange}
                defaultValue={currentUser[platform.id]}
                placeholder={platform.placeholder}
                className={`flex-1 ${platform.focusColor}`}
              />
              {currentUser[platform.id] && (
                <a 
                  href={currentUser[platform.id]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 ${platform.iconColor} hover:opacity-80 transition-opacity`}
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
      >
        <Button 
          onClick={handleSubmit} 
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaSave />
              Save Social Profiles
            </>
          )}
        </Button>
      </motion.div>

      {/* Status Messages */}
      {uploadSuccess && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6"
        >
          <Alert color="success" className="flex items-center gap-2">
            <FaCheck className="text-green-500" />
            {uploadSuccess}
          </Alert>
        </motion.div>
      )}
      {updateUserError && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6"
        >
          <Alert color="failure" className="flex items-center gap-2">
            <FaTimes className="text-red-500" />
            {updateUserError}
          </Alert>
        </motion.div>
      )}
    </motion.div>
  );
}
