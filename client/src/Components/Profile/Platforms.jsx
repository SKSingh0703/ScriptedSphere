
import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { TbBrandLeetcode } from "react-icons/tb";
import { SiCodechef, SiCodeforces, SiGeeksforgeeks } from "react-icons/si";

export default function Platforms() {
    const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-[90%] mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
        <h1 className="text-3xl font-semibold opacity-80 text-gray-800 dark:text-white">
            Platforms
        </h1>
        <p className="text-sm mt-2">You can update and verify your platform details here.</p>
        </div>
      </div>
      <div className="">        
        <div className="mt-8 grid grid-cols-1 gap-6 ">
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <TbBrandLeetcode className="align-middle" />
                <p className="opacity-80 mr-9">Leetcode   </p>
                <TextInput className="opacity-90 w-[40%]" value={currentUser.leetcode } placeholder="https://leetcode.com/u/JohnDoe/ " />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <SiCodeforces className="align-middle" />
                <p className="opacity-80 mr-6">Codeforces  </p>
                <TextInput className="opacity-90  w-[40%]" value={currentUser.codeforces } placeholder="https://codeforces.com/profile/JohnDoe " />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <SiCodechef className="align-middle" />
                <p className="opacity-80 mr-9 "> Codechef </p>
                <TextInput className="opacity-90 w-[40%]" value={currentUser.codechef } placeholder="https://www.codechef.com/users/sksingh0703" />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <SiGeeksforgeeks className="align-middle" />
                <p className="opacity-80 mr-1"> GeekforGeeks  </p>
                <TextInput className="opacity-90 w-[40%]" value={currentUser.geekforgeeks } placeholder="https://www.geeksforgeeks.org/user/sachinkumarc4bc" />
            </div>
        </div>
        <div className="mt-4">
            <Button className="mx-auto w-[40%] " >Save</Button>
        </div>
      </div>
    </div>
  );
}
