import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app2 } from "../firebase";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashProfile() {
  const {currentUser} = useSelector((state)=>state.user);
  const [imageFileUrl,setImageFileUrl] = useState(null);

  const [imageFile,setImageFile] = useState(null);
  const filePickerRef = useRef();

  const [imageFileUploadingProgress,setImageFileUploadingProgress] = useState(null);
  const [imageFIleUploadError,setImageFileUploadError]= useState(null);

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

  console.log(imageFileUploadingProgress);
  console.log(imageFIleUploadError);
  console.log(imageFileUrl);
  
  

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
        })
      }
    )
  }
  

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4 " >

        <input hidden ref={filePickerRef} type="file" accept="image/*" onChange={handleImageChange} />
        

        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ">
          <img src={imageFileUrl || currentUser.profilePicture || "../../public/profile.png"} alt="Profile Pic" className = {`rounded-full h-full border-8 border-[lightgray] object-cover  ${imageFileUploadingProgress && imageFileUploadingProgress<100 && "opacity-60" } `}  />
          {imageFileUploadingProgress && (
            <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}` } 
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:"absolute",
                  top:0,left:0,
                },
                path:{
                  stroke:`rgba (62,152,199,${imageFileUploadingProgress /100})`,
                }
              }}
            /> 
          )}
        </div>
        <Button onClick={()=>filePickerRef.current.click()} className="w-52 mx-auto"  >Change Profile Picture</Button>
        {imageFIleUploadError && 
          <Alert color="failure" > {imageFIleUploadError} </Alert>
        }
        <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
        <TextInput type="text" id="email" placeholder="Username" defaultValue={currentUser.email} />
        <Button type="submit" gradientDuoTone="prupleToBlue" outline >Update</Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5 ">
        <span className="cursor-pointer" >Delete Account</span>
        <span className="cursor-pointer" >Sign Out</span>
      </div>
    </div>
  )
}
