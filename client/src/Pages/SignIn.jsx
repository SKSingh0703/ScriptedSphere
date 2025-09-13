import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';



export default function SignIn() {

  const [formdata,setFormData]= useState({});

  const {loading,error:errorMessage} = useSelector(state => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formdata,
      [e.target.id]:e.target.value.trim()
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formdata.email || !formdata.password){
      return dispatch(signInFailure("Please Fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(formdata),
      });

      const data = await res.json();
      if(data.success===false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-[90%] md:w-[80%] lg:w-[70%] overflow-hidden">
        {/* Left Section: Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
          <img
            src="https://cdn.dribbble.com/userupload/8432950/file/original-0c14504bd291054d76548cb015dff89a.png?resize=1200x900&vertical=center"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back!</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Please enter your details to continue
            </p>
          </div>
          <form className="flex flex-col gap-4">
            
            {/* Email */}
            <div>
              <Label value="Your Email" className="text-gray-700 dark:text-gray-300 font-medium" />
              <TextInput onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                id="email"
                className="mt-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>
            {/* Password */}
            <div>
              <Label value="Your Password" className="text-gray-700 dark:text-gray-300 font-medium" />
              <TextInput onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                id="password"
                className="mt-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            {/* Sign In Button */}
            <Button
              type="submit" onClick={handleSubmit} disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg py-3 mt-4 transition-colors duration-200"
            >
              {
                loading ? (
                  <Spinner size='sm' />
                ):'Log In'
              }
            </Button>
            <OAuth />
          </form>

          {/* Footer Links */}
          <div className="text-sm text-center mt-6">
            <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
            <Link to="/sign-up" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors">
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure' >{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
