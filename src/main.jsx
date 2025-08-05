// // /* needed */
// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import './index.css';
// // import App from './App';
// // import { BrowserRouter } from 'react-router-dom';

// // import { QueryClientProvider } from '@tanstack/react-query';
// // import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// // import { queryClient } from './lib/queryClient';

// // import { AuthProvider } from './contexts/AuthContext';
// // import axios from 'axios';


// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //      <QueryClientProvider client={queryClient}>
// //       <AuthProvider>
// //         <App />
// //       </AuthProvider>

// // {/* כלי פיתוח של React Query - רק בסביבת פיתוח */}
// //       {'development' === 'development' && (
// //         <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
// //       )}
// //     </QueryClientProvider>
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );
// // axios.defaults.baseURL = 'http://localhost:3333';
// // ///////////////////////////////////////
// // src/main.jsx - עם הארכיטקטורה החדשה
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';

// import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { queryClient } from './lib/queryClient';

// import { AuthProvider } from './contexts/AuthContext';
// import { SearchProvider } from './contexts/SearchContext';
// import { ProductModalProvider } from './contexts/ProductModalContext';
// import { ProductViewerProvider } from './contexts/ProductViewerContext';
// import axios from 'axios';

// // הגדרת axios
// axios.defaults.baseURL = 'http://localhost:3333';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   // <React.StrictMode>
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <AuthProvider>
//           {/* שכבה 1: חיפוש ופילטרים */}
//           <SearchProvider>
//             {/* שכבה 2: ניהול UI - מודלים וניווט */}
//             <ProductModalProvider>
//               {/* שכבה 3: תאימות אחורה */}
//               <ProductViewerProvider>
//                 <App />
//               </ProductViewerProvider>
//             </ProductModalProvider>
//           </SearchProvider>
//         </AuthProvider>

//         {/* כלי פיתוח של React Query - רק בסביבת פיתוח */}
//         {'development' === 'development' && (
//           <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
//         )}
//       </QueryClientProvider>
//     </BrowserRouter>
//   // </React.StrictMode>
// );
// src/main.jsx - עם קונפיגורציית environment מלאה
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';

import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import { ProductModalProvider } from './contexts/ProductModalContext';
import { ProductViewerProvider } from './contexts/ProductViewerContext';
import axios from 'axios';

// 🌍 **הגדרות Environment**
const isDevelopment = import.meta.env.VITE_APP_ENV === 'development';
const enableLogs = import.meta.env.VITE_ENABLE_LOGS === 'true';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';

// 🔧 **הגדרת axios עם Environment**
axios.defaults.baseURL = apiUrl;

// 📊 **לוגר מפורט - רק בפיתוח**
if (enableLogs && isDevelopment) {
  let requestCounter = 0;
  let requestLog = [];
  const startTime = Date.now();

  // 🚀 **Request Interceptor - רישום בקשות יוצאות**
  axios.interceptors.request.use(
    (config) => {
      requestCounter++;
      const requestId = `REQ-${requestCounter}`;
      const timestamp = new Date().toLocaleTimeString();
      
      // שמירת זמן התחלה ו-ID בבקשה
      config.metadata = { 
        startTime: Date.now(), 
        requestId,
        timestamp 
      };
      
      // לוג מפורט
      console.log(`🚀 [${requestId}] ${timestamp} - ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data ? 'Has data' : 'No data',
        headers: config.headers.Authorization ? 'Authenticated' : 'Public'
      });
      
      // שמירה בלוג
      requestLog.push({
        id: requestId,
        method: config.method?.toUpperCase(),
        url: config.url,
        timestamp,
        params: config.params,
        startTime: config.metadata.startTime
      });
      
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // 📥 **Response Interceptor - רישום תגובות**
  axios.interceptors.response.use(
    (response) => {
      const { metadata } = response.config;
      const duration = Date.now() - metadata.startTime;
      const timestamp = new Date().toLocaleTimeString();
      
      // עדכון הלוג
      const logEntry = requestLog.find(req => req.id === metadata.requestId);
      if (logEntry) {
        logEntry.duration = duration;
        logEntry.status = response.status;
        logEntry.success = true;
        logEntry.responseSize = JSON.stringify(response.data).length;
      }
      
      // לוג תגובה
      console.log(`✅ [${metadata.requestId}] ${timestamp} - SUCCESS ${response.status} (${duration}ms)`, {
        dataSize: `${Math.round(JSON.stringify(response.data).length / 1024)}KB`,
        cached: response.headers['x-cache'] === 'HIT' ? '🎯 CACHED' : '🌐 FRESH'
      });
      
      return response;
    },
    (error) => {
      const { metadata } = error.config || {};
      const duration = metadata ? Date.now() - metadata.startTime : 0;
      const timestamp = new Date().toLocaleTimeString();
      
      // עדכון הלוג
      if (metadata) {
        const logEntry = requestLog.find(req => req.id === metadata.requestId);
        if (logEntry) {
          logEntry.duration = duration;
          logEntry.status = error.response?.status || 0;
          logEntry.success = false;
          logEntry.error = error.message;
        }
      }
      
      console.error(`❌ [${metadata?.requestId || 'UNKNOWN'}] ${timestamp} - ERROR ${error.response?.status || 'Network'} (${duration}ms)`, {
        message: error.message,
        url: error.config?.url
      });
      
      return Promise.reject(error);
    }
  );

  // 📊 **פונקציות סיכום וניתוח**
  const printRequestSummary = () => {
    const totalTime = Date.now() - startTime;
    const successfulRequests = requestLog.filter(req => req.success).length;
    const failedRequests = requestLog.filter(req => req.success === false).length;
    const avgDuration = requestLog.filter(req => req.duration).reduce((sum, req) => sum + req.duration, 0) / requestLog.length;
    
    console.group('📊 סיכום בקשות HTTP');
    console.log(`🔢 סה"כ בקשות: ${requestCounter}`);
    console.log(`✅ הצליחו: ${successfulRequests}`);
    console.log(`❌ נכשלו: ${failedRequests}`);
    console.log(`⏱️ זמן ממוצע: ${Math.round(avgDuration)}ms`);
    console.log(`🕐 זמן כולל: ${Math.round(totalTime / 1000)}s`);
    console.log(`📈 בקשות/דקה: ${Math.round((requestCounter / (totalTime / 1000)) * 60)}`);
    console.groupEnd();
    
    // פירוט לפי endpoints
    const endpointStats = {};
    requestLog.forEach(req => {
      const endpoint = req.url?.split('?')[0] || 'unknown';
      if (!endpointStats[endpoint]) {
        endpointStats[endpoint] = { count: 0, totalDuration: 0 };
      }
      endpointStats[endpoint].count++;
      if (req.duration) {
        endpointStats[endpoint].totalDuration += req.duration;
      }
    });
    
    console.group('📋 פירוט לפי Endpoints');
    Object.entries(endpointStats)
      .sort(([,a], [,b]) => b.count - a.count)
      .forEach(([endpoint, stats]) => {
        const avgTime = stats.totalDuration / stats.count || 0;
        console.log(`${endpoint}: ${stats.count} בקשות (${Math.round(avgTime)}ms ממוצע)`);
      });
    console.groupEnd();
  };

  // 🎯 **פונקציה לצפייה בלוג מלא**
  window.showRequestLog = () => {
    console.table(requestLog.map(req => ({
      ID: req.id,
      Method: req.method,
      URL: req.url,
      Duration: req.duration ? `${req.duration}ms` : 'Pending',
      Status: req.status || 'Pending',
      Success: req.success === undefined ? 'Pending' : req.success ? '✅' : '❌',
      Time: req.timestamp
    })));
  };

  // 🎯 **פונקציה לאיפוס הלוג**
  window.clearRequestLog = () => {
    requestCounter = 0;
    requestLog = [];
    console.clear();
    console.log('🧹 Request log cleared');
  };

  // 📊 **סיכום אוטומטי כל 30 שניות**
  setInterval(printRequestSummary, 30000);

  // 📊 **סיכום בסגירת החלון**
  window.addEventListener('beforeunload', printRequestSummary);

  // 🎯 **פונקציות debug בקונסול**
  console.log(`
🔧 Environment: ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}
🌐 API URL: ${apiUrl}
📊 Logging: ${enableLogs ? 'ENABLED' : 'DISABLED'}

🔧 פונקציות Debug זמינות:
- showRequestLog() - הצג לוג מלא של בקשות
- clearRequestLog() - נקה את הלוג
- סיכום אוטומטי כל 30 שניות
`);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* שכבה 1: חיפוש ופילטרים */}
          <SearchProvider>
            {/* שכבה 2: ניהול UI - מודלים וניווט */}
            <ProductModalProvider>
              {/* שכבה 3: תאימות אחורה */}
              <ProductViewerProvider>
                <App />
              </ProductViewerProvider>
            </ProductModalProvider>
          </SearchProvider>
        </AuthProvider>

        {/* כלי פיתוח של React Query - רק בסביבת פיתוח */}
        {isDevelopment && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        )}
      </QueryClientProvider>
    </BrowserRouter>
  // </React.StrictMode>
);