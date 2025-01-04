
import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";

export default function Socials() {
    const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-[90%] mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
        <h1 className="text-3xl font-semibold opacity-80 text-gray-800 dark:text-white">
        Social Profile
        </h1>
        <p className="text-sm mt-2">You can update your social media details here.</p>
        </div>
      </div>
      <div className="">        
        <div className="mt-8 grid grid-cols-1 gap-6 ">
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <FaLinkedin className="align-middle" />
                <p className="opacity-80 ml-1">Linkedin &nbsp;  </p>
                <TextInput className="opacity-90 w-[40%]" value={currentUser.linkedin } placeholder="https://www.linkedin.com/in/JohnDoe " />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <FaGithub className="align-middle" />
                <p className="opacity-80">Github &nbsp;&nbsp;&nbsp;&nbsp; </p>
                <TextInput className="opacity-90 w-[40%]" value={currentUser.github } placeholder="https://github.com/JohnDoe " />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <FaInstagram className="align-middle" />
                <p className="opacity-80"> Instagram </p>
                <TextInput className="opacity-90 w-[40%]" value={currentUser.instagram } placeholder="https://www.instagram.com/JohnDoe" />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <GrDocumentText className="align-middle" />
                <p className="opacity-80"> Resume &nbsp;&nbsp;&nbsp; </p>
                <TextInput className="opacity-90 w-[40%]" value={currentUser.resume } placeholder="http://drive.com/resume " />
            </div>
        </div>
        <div className="mt-4">
            <Button className="mx-auto w-[40%] " >Save</Button>
        </div>
      </div>
    </div>
  );
}
