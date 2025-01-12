import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AddProductPage from './pages/products/AddProductPage';
import ProfilePage from './pages/Profile/ProfilePage';
import ProductPage from './pages/products/ProductPage';
import PrivateRoute from './components/common/PrivateRoute';
import HomePage from './pages/home/HomePage';
import ProductFeed from '../src/pages/products/ProductFeed';
// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
      
//       {/* מוצרים */}
//       <Route path="/products/add" element={
//         <PrivateRoute>
//           <AddProductPage />
//         </PrivateRoute>
//       } />
//       <Route path="/products/:id" element={<ProductPage />} />
//       <Route path="/profile" element={<ProfilePage />} />
//       {/* נוסיף עוד routes בהמשך */}
//     </Routes>
//   );
// };
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/product" replace />} />
        <Route path="/product" element={<ProductFeed />} />
        <Route path="/product/:id" element={<ProductFeed />} />
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products/add" element={
        <PrivateRoute>
          <AddProductPage />
        </PrivateRoute>
      } />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};


// קומפוננטת Layout חדשה
// const Layout = () => (
//   <div className="min-h-screen bg-gray-100">
//     <header className="fixed top-0 right-0 left-0 z-40">
//       <SearchPanel />
//     </header>
//     <CategoryWheel />
//     <Outlet /> {/* כאן יוצג ProductFeed */}
//     <ProfileCircle />
//   </div>
// );

export default App;