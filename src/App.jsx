// /* needed */
// // App.jsx - עם נתיבים מתוקנים למוכרים ומוצרים
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import Layout from './components/layout/Layout';
// import LoginPage from './pages/auth/LoginPage';
// import ProfilePage from './pages/Profile/ProfilePage';
// import PrivateRoute from './components/common/PrivateRoute';
// import { ProductFeed } from './components/product-viewer';
// import VendorProductsPage from './pages/vendor/VendorProductsPage';
// import VendorProductDetails from './pages/vendor/VendorProductDetails';
// import EditProductPage from './pages/vendor/EditProductPage';
// import ProductForm from './newProductFormComponent/ProductFormComponent';
// import { ProductViewerProvider } from './contexts/ProductViewerContext';
// import FavoritesPage from './pages/favorites/FavoritesPage';
// import QuestionsPage from './pages/vendor/QuestionsPage';
// import { SearchProvider } from './contexts/SearchContext';
// import SearchConnector from './components/common/SearchConnector';
// import DebugRouter from './components/common/DebugRouter';
// import ProductViewerWrapper from './components/common/ProductViewerWrapper';

// // ProductFeed עם wrapper
// const ProductFeedWithWrapper = () => {
//   return (
//     <ProductViewerWrapper>
//       <ProductFeed />
//     </ProductViewerWrapper>
//   );
// };

// const App = () => {
//   return (
//     <ProductViewerProvider>
//       <SearchProvider>
//         <SearchConnector />
//         <DebugRouter />
//         <Routes>
//           {/* נתיבים ציבוריים */}
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Navigate to="/products" replace />} />
            
//             {/* נתיבי מוצרים רגילים */}
//             <Route path="products" element={<ProductFeedWithWrapper />} />
//             <Route path="product/:id" element={<ProductFeedWithWrapper />} />
            
//             {/* 🔧 נתיבי מוכר - הסדר חשוב! נתיב ספציפי לפני כללי */}
//             <Route path="vendor/:vendorId/:id" element={<ProductFeedWithWrapper />} />
//             <Route path="vendor/:vendorId" element={<ProductFeedWithWrapper />} />
//           </Route>
          
//           <Route path="/login" element={<LoginPage />} />
          
//           {/* נתיבים מוגנים */}
//           <Route path="/addProducts" element={
//             <PrivateRoute>
//               <ProductForm />
//             </PrivateRoute>
//           } />
//           <Route path="/favorites" element={
//             <PrivateRoute>
//               <FavoritesPage />
//             </PrivateRoute>
//           } />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/vendorPrivate/questions" element={
//             <PrivateRoute>
//               <QuestionsPage />
//             </PrivateRoute>
//           } />

//           {/* נתיבי מוכר פרטיים - לניהול */}
//           <Route path="/vendorPrivate/*" element={
//             <PrivateRoute>
//               <Routes>
//                 <Route path="productsVendor" element={<VendorProductsPage />} />
//                 <Route path="productsVendor/:id" element={<VendorProductDetails />} />
//                 <Route path="productsVendor/:id/edit" element={<EditProductPage />} />
//               </Routes>
//             </PrivateRoute>
//           } />
//         </Routes>
//       </SearchProvider>
//     </ProductViewerProvider>
//   );
// };

// export default App;
// src/App.jsx - עם הארכיטקטורה החדשה
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import PrivateRoute from './components/common/PrivateRoute';
import { ProductFeed } from './components/product-viewer';
import VendorProductsPage from './pages/vendor/VendorProductsPage';
import VendorProductDetails from './pages/vendor/VendorProductDetails';
import EditProductPage from './pages/vendor/EditProductPage';
import ProductForm from './newProductFormComponent/ProductFormComponent';
import FavoritesPage from './pages/favorites/FavoritesPage';
import QuestionsPage from './pages/vendor/QuestionsPage';
import ProductsManager from './components/common/ProductsManager';
import DebugRouter from './components/common/DebugRouter';

// ProductFeed עם ProductsManager - פשוט ונקי!
const ManagedProductFeed = () => {
  return (
    <ProductsManager>
      {({ products, isLoading, hasMore, loadMore, isSearchMode, specificProduct, vendorInfo }) => (
        <ProductFeed 
          products={products}
          loading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
          isSearchMode={isSearchMode}
          specificProduct={specificProduct}
          vendorInfo={vendorInfo}
        />
      )}
    </ProductsManager>
  );
};

const App = () => {
  return (
    <>
      <DebugRouter />
      <Routes>
        {/* נתיבים ציבוריים */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/products" replace />} />
          
          {/* נתיבי מוצרים - הכל עם ManagedProductFeed */}
          <Route path="products" element={<ManagedProductFeed />} />
          <Route path="product/:id" element={<ManagedProductFeed />} />
          
          {/* נתיבי מוכר */}
          <Route path="vendor/:vendorId/:id" element={<ManagedProductFeed />} />
          <Route path="vendor/:vendorId" element={<ManagedProductFeed />} />
        </Route>
        
        <Route path="/login" element={<LoginPage />} />
        
        {/* נתיבים מוגנים */}
        <Route path="/addProducts" element={
          <PrivateRoute>
            <ProductForm />
          </PrivateRoute>
        } />
        <Route path="/favorites" element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        } />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/vendorPrivate/questions" element={
          <PrivateRoute>
            <QuestionsPage />
          </PrivateRoute>
        } />

        {/* נתיבי מוכר פרטיים - לניהול */}
        <Route path="/vendorPrivate/*" element={
          <PrivateRoute>
            <Routes>
              <Route path="productsVendor" element={<VendorProductsPage />} />
              <Route path="productsVendor/:id" element={<VendorProductDetails />} />
              <Route path="productsVendor/:id/edit" element={<EditProductPage />} />
            </Routes>
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
};

export default App;