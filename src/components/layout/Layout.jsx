import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchPanel from '../search/SearchPanel';
import CategoryWheel from '../categories/CategoryWheel';
import ProfileCircle from '../home/navigation/ProfileCircle';
import { CategoryProvider } from '../../contexts/CategoryContext';

const Layout = () => {
  return (
    <CategoryProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="fixed top-0 right-0 left-0 z-40">
          <SearchPanel />
        </header>
        <CategoryWheel />
        <main className="pt-16 pb-24">
          <Outlet />
        </main>
        <ProfileCircle />
      </div>
    </CategoryProvider>
  );
};

export default Layout;