// import React from 'react'
import {  Button, Navbar, TextInput } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export default function Header() {
    const path=useLocation().pathname;
    
  return (
    <Navbar>
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">Scripted</span>
            <span>Sphere</span>
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
            <Button className="w-12 h-10 hidden sm:inline " color="gray">
                <MdDarkMode />
            </Button>
            <Link to="/sign-in">
                <Button className="" gradientDuoTone="purpleToBlue">
                    Sign In
                </Button>
            </Link>
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path==='/'} as={'div'}>
                <Link to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/about'} as={'div'}>
                <Link to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/project'} as={'div'}>
                <Link to="/projects">Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
