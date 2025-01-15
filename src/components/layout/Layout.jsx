import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchPanel from '../search/SearchPanel';
import CategoryWheel from '../categories/CategoryWheel';
import ProfileCircle from '../home/navigation/ProfileCircle';
import SelectedCategory from '../categories/SelectedCategory';
import logoSvg  from '../../assets/logo/new.svg';

const Layout = () => {
    
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 right-0 left-0 z-40">
        <div className="bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="max-w-[550px] mx-auto px-4 flex items-center justify-between py-0.5">
            {/* לוגו */}
            <div className="w-28 flex-shrink-0">
              <img 
                src={logoSvg} 
                alt="BuyWise" 
                className="h-14 object-contain"
              />
            </div>
            
            {/* שורת חיפוש */}
            <div className="flex-1 mx-4">
              <SearchPanel />
            </div>
          </div>
        </div>
        <SelectedCategory />
      </header>
    <CategoryWheel />
    <main className="pt-24 pb-24">
      <Outlet />
    </main>
    <ProfileCircle />
  </div>
  );
};

export default Layout;