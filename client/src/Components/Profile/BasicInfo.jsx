import { Button, Textarea, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Alert } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch  } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app2 } from "../../firebase";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart,updateUserSuccess,updateUserFailure,updateUserEnd} from "../../redux/user/userSlice";
import {useLocation} from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaGlobe, FaEdit, FaCheck, FaTimes, FaUpload, FaSpinner } from "react-icons/fa";


export default function BasicInfo() {
  
  const {currentUser,error,loading} = useSelector((state)=>state.user);
  const [imageFileUrl,setImageFileUrl] = useState(null);

  const [imageFile,setImageFile] = useState(null);
  const filePickerRef = useRef();

  const [imageFileUploadingProgress,setImageFileUploadingProgress] = useState(null);
  const [imageFIleUploadError,setImageFileUploadError]= useState(null);

  const [formdata,setFormData] = useState({});
  const [imageUpladSuccess , setImageUpladSuccess] = useState(false);
  const [uploadSuccess , setUploadSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);

  const dispatch = useDispatch();

  const location = useLocation();
  const [tab,setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tabProfile');
    
    if(tabFromUrl) setTab(tabFromUrl);

  },[location.search]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if(imageFile){
      uploadImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[imageFile]);  
  

  const uploadImage = async ()=>{
    setImageFileUploadError(null);

    const storage = getStorage(app2);
    const fileName = new Date().getTime() + imageFile.name;

    const storageRef = ref(storage,fileName);

    const uploadTask = uploadBytesResumable(storageRef,imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /snapshot.totalBytes) *100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        console.log(error);
        setImageFileUrl(null);
        setImageFileUploadingProgress(null);
        setImageFileUploadError("Could not upload image (File must be less than 2mb) ");
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setImageFileUploadingProgress(null);
          setFormData({...formdata,profilePicture:downloadUrl});
          setImageUpladSuccess(true);
          setTimeout(()=>{
            setImageUpladSuccess(false);
          },5000);
        })
      }
    )
  }

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
    if(imageFileUploadingProgress){
      setUpdateUserError("Please wait for image to upload");
      setTimeout(()=>{
        setUpdateUserError(null);
      },5000);
      return;
    }
    try {
     dispatch( updateUserStart());
     console.log(formdata);
     
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
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <FaUser className="text-2xl text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
          Basic Info
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Manage your personal details and profile information
        </p>
      </motion.div>

      {/* Profile Picture Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="relative group">
          <div className="relative">
            <img 
              className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105" 
              src={imageFileUrl || currentUser.profilePicture || "./profile.png"} 
              onError={(e)=>e.target.src="./profile.png"} 
              alt="Profile" 
            />
            {imageFileUploadingProgress && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <CircularProgressbar 
                  value={imageFileUploadingProgress || 0} 
                  text={`${imageFileUploadingProgress}%`} 
                  className="w-20 h-20"
                  styles={{
                    path: {
                      stroke: `rgba(59, 130, 246, ${imageFileUploadingProgress / 100})`,
                    },
                    text: {
                      fill: 'white',
                      fontSize: '12px',
                    }
                  }}
                />
              </div>
            )}
          </div>
          <button
            onClick={() => filePickerRef.current?.click()}
            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <FaUpload className="text-sm" />
          </button>
          <input hidden ref={filePickerRef} type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        
        <button
          onClick={() => filePickerRef.current?.click()}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FaEdit className="text-sm" />
          Change Picture
        </button>

        {/* Upload Status Messages */}
        {imageFIleUploadError && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 w-full max-w-md"
          >
            <Alert color="failure" className="flex items-center gap-2">
              <FaTimes className="text-red-500" />
              {imageFIleUploadError}
            </Alert>
          </motion.div>
        )}
        {imageUpladSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 w-full max-w-md"
          >
            <Alert color="success" className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              Image uploaded successfully!
            </Alert>
          </motion.div>
        )}
      </motion.div>

      {/* Form Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-8"
      >
        {/* Basic Details */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaUser className="text-blue-500" />
            Basic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <TextInput 
                id="firstname" 
                onChange={handleChange} 
                defaultValue={currentUser.firstname} 
                placeholder="Enter your first name" 
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <TextInput 
                id="lastname" 
                onChange={handleChange} 
                defaultValue={currentUser.lastname} 
                placeholder="Enter your last name" 
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaEnvelope className="text-green-500" />
            Contact Information
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <TextInput 
                id="email" 
                onChange={handleChange} 
                defaultValue={currentUser.email} 
                placeholder="Enter your email" 
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <TextInput 
                id="country" 
                onChange={handleChange} 
                defaultValue={currentUser.country} 
                placeholder="Enter your country" 
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaGlobe className="text-purple-500" />
            About You
          </h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bio (Max 200 Characters)
            </label>
            <Textarea 
              rows={4} 
              id="bio" 
              onChange={handleChange} 
              defaultValue={currentUser.bio} 
              placeholder="Tell us about yourself..."
              className="w-full resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formdata.bio?.length || currentUser.bio?.length || 0}/200 characters
            </p>
          </div>
        </div>
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
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <FaCheck />
              Update Profile
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
