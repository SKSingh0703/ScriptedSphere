
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiWelcometothejungle } from "react-icons/si";
import OAuth from '../Components/OAuth';

export default function SignUp() {

  const [formdata,setFormData]= useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formdata,
      [e.target.id]:e.target.value.trim()
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formdata.username || !formdata.email || !formdata.password){
      return setErrorMessage("Please Fill out all fields");
    }
    try {
      setErrorMessage(null);
      setLoading(true);
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(formdata),
      });

      const data = await res.json();
      setLoading(false);
      if(data.success===false){
        return setErrorMessage(data.message);
      }
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-[90%] md:w-[80%] lg:w-[70%] overflow-hidden">
        {/* Left Section: Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900">
          <img
            src="https://cdn.dribbble.com/userupload/8432950/file/original-0c14504bd291054d76548cb015dff89a.png?resize=1200x900&vertical=center"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 px-8 py-12">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome</h1>
              <SiWelcometothejungle className='ml-2 text-2xl text-green-600 dark:text-green-400' />
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Please enter your details to get started
            </p>
          </div>
          <form className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <Label value="Your Username" className="text-gray-700 dark:text-gray-300 font-medium" />
              <TextInput onChange={handleChange}
                type="text"
                placeholder="Enter your username"
                id="username"
                className="mt-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400"
              />
            </div>
            {/* Email */}
            <div>
              <Label value="Your Email" className="text-gray-700 dark:text-gray-300 font-medium" />
              <TextInput onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                id="email"
                className="mt-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400"
              />
            </div>
            {/* Password */}
            <div>
              <Label value="Your Password" className="text-gray-700 dark:text-gray-300 font-medium" />
              <TextInput onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                id="password"
                className="mt-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400"
              />
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit" onClick={handleSubmit} disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg py-3 mt-4 transition-colors duration-200"
            >
              {
                loading ? (
                  <Spinner size='sm' />
                ):'Sign Up'
              }
            </Button>
            <OAuth />
          </form>

          {/* Footer Links */}
          <div className="text-sm text-center mt-6">
            <span className="text-gray-600 dark:text-gray-400">Have an account? </span>
            <Link to="/sign-in" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium hover:underline transition-colors">
              Sign in
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
