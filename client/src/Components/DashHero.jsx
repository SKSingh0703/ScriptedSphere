
import Profile from "./Profile";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

export default function DashHero() {
  const {currentUser} = useSelector((state)=>state.user);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const [data,setData] = useState({});
  useEffect(()=>{
    if(!currentUser.leetcode && !currentUser.codeforces && !currentUser.codechef && !currentUser.geekforgeeks){
      navigate("?tab=profile&tabProfile=platform")
    }
    
    const fetchData =async ()=>{
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/code/platformData/${currentUser._id}`);
      if(res.ok){
        const data = await res.json();
        setData(data);
      }
      else{
        setError("Something went wrong");
      }
      setLoading(false);
    }
    fetchData();
  },[currentUser]);
  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="profile h-[50vh] md:h-[100vh] w-full md:w-[25vw] bg-white border dark:bg-gray-800 dark:border-black rounded-lg">
          <Profile />
        </div>

        <div className="right w-full bg-gray-100 dark:bg-gray-900 dark:border-black h-full">
          <div className="flex flex-col md:flex-row gap-3 h-[25vh] p-5">
            <div className="question basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="basis-1/3 self-center text-2xl m-3 dark:text-white ">
                  Total Questions
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                  {data.totalQuestions || "637"}
                </h1>
              </div>
            </div>
            <div className="question basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="basis-1/3 self-center text-2xl m-3">
                  Total Contests
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                 {data.totalContests || "25"}
                </h1>
              </div>
            </div>
            <div className="question basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="basis-1/3 self-center text-2xl m-3 hidden md:block ">
                  Total Active Days
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                  {data.totalActiveDays || "220"}
                </h1>
              </div>
            </div>
          </div>
          <div className="ps flex flex-col mt-14 md:mt-0 md:flex-row h-[75vh] p-5 gap-3">
            <div className="bg-white border flex-1 dark:bg-gray-800 dark:border-black">
              <div className="chart">
                <DonutChart  
                  easy={data.easy} 
                  medium={data.medium} 
                  hard={data.hard} 
                  totalQuestions={data.totalQuestions} 
                />
              </div>
              <div className="text-center flex flex-col gap-2 mt-4">
                <div className="flex flex-row gap-4 justify-between bg-grey-100 border w-[50%] mx-auto h-8 rounded-lg items-center p-5">
                  <span className="text-green-500">Easy</span>
                  <span>{data.easy || "179"}</span>
                </div>
                <div className="flex flex-row gap-4 justify-between bg-grey-100 border w-[50%] mx-auto h-8 rounded-lg items-center p-5">
                  <span className="text-yellow-500">Medium</span>
                  <span>{data.medium || "374"}</span>
                </div>
                <div className="flex flex-row gap-4 justify-between bg-grey-100 border w-[50%] mx-auto h-8 rounded-lg items-center p-5">
                  <span className="text-red-500">Hard</span>
                  <span>{data.hard || "57"}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex-col text-center gap-3 bg-white border dark:bg-gray-800 dark:border-black hidden md:flex">
                <h1 className="font-semibold mt-3">DSA Topic wise AnaLysis</h1>
              <BarChart topics={data.topics}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
