
import React from 'react';
import { motion } from 'framer-motion';

const ProductProgress = ({ current, total }) => (
  <div className="fixed top-[1px] left-0 right-0 h-1.5 bg-gray-100 z-80">
    <motion.div 
      className="h-full bg-gradient-to-r from-[#FFA066] to-[#FF6B6B]"
      initial={{ width: 0 }}
      animate={{ width: `${(current / (total - 1)) * 100}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

export default ProductProgress;