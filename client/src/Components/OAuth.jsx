import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {

    const dispatch = useDispatch();
    const auth = getAuth(app);
    const navigate = useNavigate();

    const handleGoogleClick =async ()=>{
        
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try {
            const resultsFromGoogle = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify({
                    name:resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    googlePhotoUrl:resultsFromGoogle.user.photoURL
                }),
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <Button 
      type="button" 
      outline 
      onClick={handleGoogleClick}
      className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
    >
        <FcGoogle className="w-5 h-5 mr-3" />
        Continue with Google
    </Button>
  )
}
