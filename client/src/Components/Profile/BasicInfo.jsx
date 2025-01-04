import { Button, Textarea, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function BasicInfo() {
    const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-[90%] mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
        <h1 className="text-3xl font-semibold opacity-80 text-gray-800 dark:text-white">
          Basic Info
        </h1>
        <p className="mt-4 opacity-90 text-gray-600 dark:text-gray-300 leading-relaxed">
          You can manage your details here.
        </p>
        </div>
        <div className="">
            <Button className="w-[140%] " >Save</Button>
        </div>
      </div>
      <div className="">
        <h3 className="text-xl mt-5 font-semibold opacity-80">Basic Details</h3>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className=" text-white rounded-full">
              <img className="rounded-full max-w-fit" src={currentUser.profilePicture} onError={(e)=>e.target.source="/profile.png"} alt="" />
            </div>
            <div>
              <Button>Change Pic</Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg opacity-85 font-semibold text-gray-800 dark:text-white">
                First Name
              </h2>
              <TextInput className="opacity-90 mt-3 w-[130%]" value={currentUser.firstName} placeholder="Enter Name" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg opacity-85 font-semibold text-gray-800 dark:text-white">
                Last Name
              </h2>
              <TextInput className="opacity-90 mt-3 w-[130%]" value={currentUser.firstName } placeholder="Enter Title " />
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6">
            <div className="flex flex-col">
                <p className="opacity-80">Email</p>
                <TextInput className="opacity-90 mt-3" value={currentUser.email } placeholder="Enter Email " />
            </div>
            <div className="flex flex-col ">
                <p className="opacity-80" >Bio(Max 200 Characters)</p>
                <Textarea rows={6} className="opacity-90 mt-3 " value={currentUser.bio }/>
            </div>
            <div className="flex flex-col">
                <p className="opacity-80">Country</p>
                <TextInput className="opacity-90 mt-3" value={currentUser.country }  />
            </div>
        </div>
        <div className="mt-4">
            <Button className="mx-auto w-[40%] " >Save</Button>
        </div>
      </div>
    </div>
  );
}
