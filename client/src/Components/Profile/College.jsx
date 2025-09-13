import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Alert } from "flowbite-react";
import { useEffect,useState } from "react";
import { useDispatch,  } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart,updateUserSuccess,updateUserFailure,updateUserEnd} from "../../redux/user/userSlice";
import {useLocation} from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity, FaAward, FaCalendarAlt, FaSave, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";

export default function College() {
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
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
            <FaGraduationCap className="text-2xl text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
          Educational Details
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Share your academic background and achievements
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-8"
      >
        {/* College Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaUniversity className="text-indigo-500" />
            Institution Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                College/University
              </label>
              <TextInput 
                id="college" 
                onChange={handleChange} 
                defaultValue={currentUser.college} 
                placeholder="Enter your college/university name" 
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Degree
              </label>
              <TextInput 
                id="degree" 
                onChange={handleChange} 
                defaultValue={currentUser.degree} 
                placeholder="e.g., B.Tech, B.E., M.Tech" 
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaAward className="text-purple-500" />
            Academic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Branch/Stream
              </label>
              <TextInput 
                id="branch" 
                onChange={handleChange} 
                defaultValue={currentUser.branch} 
                placeholder="e.g., Computer Science, IT, ECE" 
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Year of Graduation
              </label>
              <TextInput 
                id="yearOfGraduation" 
                onChange={handleChange} 
                defaultValue={currentUser.yearOfGraduation} 
                placeholder="e.g., 2024, 2025" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
      >
        <Button 
          onClick={handleSubmit} 
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
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
              Save Educational Details
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
