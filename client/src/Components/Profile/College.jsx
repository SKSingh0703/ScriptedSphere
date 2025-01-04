import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function College() {
    const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-[90%] mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
        <h1 className="text-3xl font-semibold opacity-80 text-gray-800 dark:text-white">
          Educational Details
        </h1>
        </div>
      </div>
      <div className="">        
        <div className="mt-8 grid grid-cols-1 gap-6">
            <div className="flex flex-col">
                <p className="opacity-80">College</p>
                <TextInput className="opacity-90 mt-3" value={currentUser.college } placeholder="Enter your college name " />
            </div>
            <div className="flex flex-col ">
                <p className="opacity-80" >Degree</p>
                <TextInput className="opacity-90 mt-3" value={currentUser.degree } placeholder="Enter degree " />
            </div>
            <div className="flex flex-col">
                <p className="opacity-80">Branch</p>
                <TextInput className="opacity-90 mt-3" value={currentUser.branch } placeholder="Enter Branch" />
            </div>
            <div className="flex flex-col">
                <p className="opacity-80">Year Of Graduation</p>
                <TextInput className="opacity-90 mt-3" value={currentUser.yearOfGraduation } placeholder="Enter Year Of Graduation" />
            </div>
        </div>
        <div className="mt-4">
            <Button className="mx-auto w-[40%] " >Save</Button>
        </div>
      </div>
    </div>
  );
}
