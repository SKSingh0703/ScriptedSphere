
import {  Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
import { MdDarkMode, } from "react-icons/md";
import { FaSun, FaUser, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice";

export default function Header() {
    const path=useLocation().pathname;
    const {currentUser} = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    const {theme} = useSelector(state=> state.theme );

    const handleSignOut = async () => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch('/api/user/signout',{
            method:"POST"
          });
          const data= await res.json();
          if(!res.ok){
            dispatch(signOutUserFailure(data.message));
          }
          else{
            dispatch(signOutUserSuccess());
          }
        } catch (error) {
          console.log(error);
          dispatch(signOutUserFailure(error));
        }
      }

  return (
    <Navbar className="relative z-50 bg-transparent py-3 px-6">
        <Link to="/" className="flex gap-2 self-center whitespace-nowrap text-base sm:text-lg font-semibold dark:text-white">
            <span>
                <img className="h-7 w-7" src="/logoSS.png " alt="" />
            </span>
            <div className="">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-md text-white text-sm">Scripted</span>
            <span className="ml-1">Sphere</span>
            </div>
        </Link>
        
        <div className="flex items-center gap-3 md:order-2">
            <button 
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors duration-200 self-center" 
                onClick={() => dispatch(toggleTheme())}
            >
                {theme==='light' ? <FaSun className="text-lg text-gray-700 dark:text-gray-300" /> : <MdDarkMode className="text-lg text-gray-700 dark:text-gray-300" /> }  
            </button>
            {currentUser ? (
                <>
                <Link to="/dashboard?tab=dash">
                <Button className="bg-black text-white px-4 py-2 text-sm font-semibold" gradientDuoTone="white">
                    Dashboard
                </Button>
            </Link>
                <Dropdown 
                    arrowIcon={false} 
                    inline 
                    label={
                        <Avatar 
                            size="md" 
                            alt="user" 
                            img={currentUser.profilePicture} 
                            rounded 
                            className="ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-blue-500 dark:hover:ring-blue-400 transition-all duration-200 cursor-pointer"
                            onError={(e) => e.target.src = "./profile.png"} 
                        />
                    }
                    className="w-64"
                >
                    <Dropdown.Header className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 p-2">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <FaEnvelope className="text-blue-600 dark:text-blue-400 text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
                                <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                                    {currentUser.email}
                                </p>
                            </div>
                        </div>
                    </Dropdown.Header>
                    
                    <Link to={'/dashboard?tab=profile&tabProfile=basicInfo'}>
                        <Dropdown.Item className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <FaUser className="text-gray-600 dark:text-gray-400 text-sm" />
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Profile</span>
                        </Dropdown.Item>
                    </Link>
                    
                    <Dropdown.Divider className="my-1" />
                    
                    <Dropdown.Item 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-red-600 dark:text-red-400"
                    >
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <FaSignOutAlt className="text-red-600 dark:text-red-400 text-sm" />
                        </div>
                        <span className="font-medium">Sign Out</span>
                    </Dropdown.Item>
                </Dropdown>
                </>
            ): (<>
                <Link to="/sign-in">
                <Button className="background-none hidden sm:inline px-4 py-2 text-sm font-semibold" gradientDuoTone="none">
                    Log In
                </Button>
            </Link>
            <Link to="/sign-up">
                <Button className="bg-black text-white px-4 py-2 text-sm font-semibold" gradientDuoTone="white">
                    Sign Up
                </Button>
            </Link>
            </>
            )}
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="text-base">
            <Navbar.Link active={path==='/'} as={'div'} className="py-1">
                <Link  to="/" className="text-base font-medium">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/about'} as={'div'} className="py-1">
                <Link  to="/about" className="text-base font-medium">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/project'} as={'div'} className="py-1">
                <Link  to="/dashboard?tab=posts" className="text-base font-medium">DSA Sheet</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/project'} as={'div'} className="py-1">
                <Link  to="/dashboard?tab=contests" className="text-base font-medium">Contests</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
