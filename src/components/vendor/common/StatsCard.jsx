// components/vendor/common/StatsCard.jsx
import React from 'react';

const StatsCard = ({ icon, label, value, className = '' }) => (
  <div className={`text-center p-3 bg-[#FFA066]/5 rounded-xl 
                  border border-[#FFA066]/10 hover:border-[#FFA066]/20 
                  transition-all duration-200 ${className}`}>
    <div className="text-[#FFA066] mb-1">{icon}</div>
    <div className="font-bold text-gray-800">{value}</div>
    <div className="text-xs font-medium text-gray-500">{label}</div>
  </div>
);

export default StatsCard;