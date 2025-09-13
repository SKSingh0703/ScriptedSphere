import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/Profile/DashProfile';
import DashPost from '../Components/DashPost';
import DasUsers from '../Components/DasUsers';
import { useSelector } from 'react-redux';
import DashHero from '../Components/DashHero';
import Contest from './Contest';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../Components/ErrorBoundary';

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const renderContent = () => {
    switch (tab) {
      case 'profile':
        return <DashProfile />;
      case 'contests':
        return <Contest />;
      case 'posts':
        return <DashPost />;
      case 'users':
        return currentUser.isAdmin ? <DasUsers /> : null;
      case 'dash':
      default:
        return <DashHero />;
    }
  };

  return (
    <ErrorBoundary>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
        <div className='flex flex-col lg:flex-row min-h-screen'>
          {/* Sidebar */}
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:w-64 w-full"
          >
            <DashSidebar />
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab || 'dash'}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
