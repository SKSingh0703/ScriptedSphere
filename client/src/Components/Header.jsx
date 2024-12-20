
import {  Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdDarkMode, } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
    const path=useLocation().pathname;
    const {currentUser} = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    const {theme} = useSelector(state=> state.theme );

  return (
    <Navbar className="relative z-50 bg-transparent ">
        <Link to="/" className="flex gap-2 self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span>
                <img className="h-8 w-8" src="../../public/logoSS.png " alt="" />
            </span>
            <div className="">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg text-white ">Scripted</span>
            <span>Sphere</span>
            </div>
        </Link>
        <form >
            <TextInput 
                type="text"
                placeholder="Search..."
                rightIcon={CiSearch}
                className="hidden lg:inline"
            />
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray"> 
            <CiSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10 hidden sm:inline " color="gray" onClick={() => dispatch(toggleTheme())}>
                {theme==='light' ? <FaSun /> : <MdDarkMode /> }  
            </Button>
            {currentUser ? (
                <>
                <Link to="/dashboard">
                <Button className="bg-black text-white" gradientDuoTone="white">
                    DashBoard
                </Button>
            </Link>
                <Dropdown arrowIcon={false} inline label={
                    <Avatar  alt="user" img={currentUser.profilePicture} rounded onError={(e) => e.target.src = "../../public/profile.png"} />
                    
                } >
                   <Dropdown.Header>
                    <span className="block text-sm ">@{currentUser.username}</span>
                    <span className="block text-sm font-medium truncate">@{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item>SignOut</Dropdown.Item>
                </Dropdown>
                </>
            ): (<>
                <Link to="/sign-in">
                <Button className="background-none hidden sm:inline" gradientDuoTone="none">
                    Log In
                </Button>
            </Link>
            <Link to="/sign-up">
                <Button className="bg-black text-white" gradientDuoTone="white">
                    Sign Up
                </Button>
            </Link>
            </>
            )}
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="">
            <Navbar.Link active={path==='/'} as={'div'}>
                <Link  to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/about'} as={'div'}>
                <Link  to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/project'} as={'div'}>
                <Link  to="/projects">Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
