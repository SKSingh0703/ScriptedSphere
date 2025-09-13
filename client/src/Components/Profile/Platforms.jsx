
import { Alert, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useDispatch,  } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart,updateUserSuccess,updateUserFailure,updateUserEnd} from "../../redux/user/userSlice";
import {useLocation} from "react-router-dom";
import { TbBrandLeetcode } from "react-icons/tb";
import { SiCodechef, SiCodeforces, SiGeeksforgeeks } from "react-icons/si";
import { motion } from "framer-motion";
import { FaCode, FaSave, FaCheck, FaTimes, FaSpinner, FaExternalLinkAlt } from "react-icons/fa";

export default function Platforms() {
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
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full">
            <FaCode className="text-2xl text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
          Coding Platforms
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          Connect your coding profiles to view your dashboard
        </p>
        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
          ⚠️ Fill at least one platform to access the dashboard
        </p>
      </motion.div>

      {/* Platform Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {/* LeetCode Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-500 rounded-lg">
              <TbBrandLeetcode className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">LeetCode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Algorithm and data structure problems</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 text-sm font-mono">
              https://leetcode.com/u/
            </span>
            <input
              type="text"
              id="leetcode"
              className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
              defaultValue={currentUser.leetcode?.replace("https://leetcode.com/u/", "") || ""}
              placeholder="Enter your LeetCode username"
            />
            {currentUser.leetcode && (
              <a 
                href={currentUser.leetcode.startsWith('http') ? currentUser.leetcode : `https://leetcode.com/u/${currentUser.leetcode}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </motion.div>

        {/* Codeforces Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border border-red-200 dark:border-red-700/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500 rounded-lg">
              <SiCodeforces className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Codeforces</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Competitive programming contests</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 text-sm font-mono">
              https://codeforces.com/profile/
            </span>
            <input
              type="text"
              id="codeforces"
              className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
              defaultValue={currentUser.codeforces?.replace("https://codeforces.com/profile/", "") || ""}
              placeholder="Enter your Codeforces handle"
            />
            {currentUser.codeforces && (
              <a 
                href={currentUser.codeforces.startsWith('http') ? currentUser.codeforces : `https://codeforces.com/profile/${currentUser.codeforces}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </motion.div>

        {/* CodeChef Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-yellow-500 rounded-lg">
              <SiCodechef className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">CodeChef</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Programming challenges and contests</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 text-sm font-mono">
              https://www.codechef.com/users/
            </span>
            <input
              type="text"
              id="codechef"
              className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
              defaultValue={currentUser.codechef?.replace("https://www.codechef.com/users/", "") || ""}
              placeholder="Enter your CodeChef username"
            />
            {currentUser.codechef && (
              <a 
                href={currentUser.codechef.startsWith('http') ? currentUser.codechef : `https://www.codechef.com/users/${currentUser.codechef}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-yellow-500 hover:text-yellow-600 transition-colors"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </motion.div>

        {/* GeeksforGeeks Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500 rounded-lg">
              <SiGeeksforgeeks className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">GeeksforGeeks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Computer science portal and practice</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 text-sm font-mono">
              https://www.geeksforgeeks.org/user/
            </span>
            <input
              type="text"
              id="geekforgeeks"
              className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
              defaultValue={currentUser.geekforgeeks?.replace("https://www.geeksforgeeks.org/user/", "") || ""}
              placeholder="Enter your GeeksforGeeks username"
            />
            {currentUser.geekforgeeks && (
              <a 
                href={currentUser.geekforgeeks.startsWith('http') ? currentUser.geekforgeeks : `https://www.geeksforgeeks.org/user/${currentUser.geekforgeeks}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-green-500 hover:text-green-600 transition-colors"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
      >
        <Button 
          onClick={handleSubmit}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
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
              Save Platforms
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
