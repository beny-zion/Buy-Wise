import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AddProductPage from './pages/products/AddProductPage';
import ProfilePage from './pages/Profile/ProfilePage';
import ProductPage from './pages/products/ProductPage';
import PrivateRoute from './components/common/PrivateRoute';
// import HomePage from './pages/home/HomePage';
// import ProductFeed from '../src/pages/products/ProductFeed';
import ProductFeed from './components/products/ProductFeed/ProductFeed';
import VendorProductsPage from './pages/vendor/VendorProductsPage';
import VendorProductDetails from './pages/vendor/VendorProductDetails';
import EditProductPage from './pages/vendor/EditProductPage';

const App = () => {
  return (
    <Routes>
      {/* נתיבים ציבוריים */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/product" replace />} />
        <Route path="/product" element={<ProductFeed />} />
        <Route path="/product/:id" element={<ProductFeed />} />
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* נתיבים מוגנים */}
      <Route path="/products/add" element={
        <PrivateRoute>
          <AddProductPage />
        </PrivateRoute>
      } />
      <Route path="/profile" element={<ProfilePage />} />

      {/* נתיבי מוכר - מקובצים יחד */}
      <Route path="/vendor/*" element={
        <PrivateRoute>
          <Routes>
            <Route path="products" element={<VendorProductsPage />} />
            <Route path="products/:id" element={<VendorProductDetails />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
          </Routes>
        </PrivateRoute>
      } />
    </Routes>
  );
};
// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Navigate to="/product" replace />} />
//         <Route path="/product" element={<ProductFeed />} />
//         <Route path="/product/:id" element={<ProductFeed />} />
//       </Route>
      
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/products/add" element={
//         <PrivateRoute>
//           <AddProductPage />
//         </PrivateRoute>
//       } />
//       <Route path="/profile" element={<ProfilePage />} />
//       <Route path="/vendor/products" element={<VendorProductsPage />} />
//       <Route path="/vendor/products/:id" element={<VendorProductDetails />} />
//       <Route path="products/:id/edit" element={<EditProductPage />} />
//     </Routes>
//   );
// };


export default App;