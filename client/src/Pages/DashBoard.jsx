import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/DashProfile';
import DashPost from '../Components/DashPost';

export default function DashBoard() {

  const location = useLocation();
  const [tab,setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    
    if(tabFromUrl) setTab(tabFromUrl);

  },[location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className="md:w-52">
        <DashSidebar />
      </div>
      {/* profile  */}
      <div className="w-full">
        {tab==='profile' && <DashProfile />}
      </div>
      {/* posts  */}
      <div className="w-full">
        {tab==='posts' && <DashPost />}
      </div>
    </div>
  )
}
