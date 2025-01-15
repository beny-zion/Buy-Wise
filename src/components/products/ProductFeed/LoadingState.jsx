import React from 'react';
import { motion } from 'framer-motion';

export const LoadingState = () => (
  <div className="h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 relative"
    >
      <div className="absolute inset-0 border-4 border-t-[#FFA066] border-r-[#FF6B6B] border-b-[#5C9EFF] border-l-transparent rounded-full" />
    </motion.div>
  </div>
);

export const ErrorState = ({ message }) => (
  <div className="h-screen flex items-center justify-center">
    <div className="text-center px-4">
      <div className="text-[#FF6B6B] text-lg mb-2">שגיאה</div>
      <div className="text-gray-600">{message}</div>
    </div>
  </div>
);

export const EmptyState = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="text-center px-4">
      <div className="text-[#FFA066] text-lg mb-2">אין מוצרים</div>
      <div className="text-gray-600">נסה לבחור קטגוריה אחרת</div>
    </div>
  </div>
);