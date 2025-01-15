import React from 'react';
import { motion } from 'framer-motion';

const ProductIndicator = ({ total, current }) => (
  <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
    <div className="space-y-2">
      {Array.from({ length: total }).map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{
            scale: idx === current ? 1 : 0.8,
            opacity: idx === current ? 1 : 0.5
          }}
          className={`w-2 h-2 rounded-full transition-colors duration-300
            ${idx === current 
              ? 'bg-gradient-to-r from-[#FFA066] to-[#FF6B6B]' 
              : 'bg-gray-300'
            }`}
        />
      ))}
    </div>
  </div>
);

export default ProductIndicator;