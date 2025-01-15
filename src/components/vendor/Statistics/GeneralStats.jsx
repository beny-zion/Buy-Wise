// components/vendor/Statistics/GeneralStats.jsx
import React, { useState, useEffect } from 'react';
import { vendorService } from '../../../services/api/vendor';
import { Eye, MousePointer, TrendingUp, Clock } from 'lucide-react';

const GeneralStats = ({ className = '' }) => {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalClicks: 0,
    conversionRate: 0,
    averageViewDuration: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await vendorService.getStats();
        setStats(response.data || {
          totalViews: 0,
          totalClicks: 0,
          conversionRate: 0,
          averageViewDuration: 0
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="animate-pulse bg-white/50 rounded-xl h-28" />
      ))}
    </div>
  );
  if (error) return null; // נסתיר שגיאות בסטטיסטיקות הכלליות

  const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg 
                   transition-all duration-200 border border-gray-100">
      <div className="flex items-center gap-4" dir="rtl">
        <div className="p-3 bg-gradient-to-br from-[#FFA066]/10 to-[#FF6B6B]/10 
                      text-[#FFA066] rounded-xl">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                         bg-clip-text text-transparent">
            {value}
          </div>
          <div className="text-gray-600 text-sm font-medium">{label}</div>
        </div>
      </div>
    </div>
  );

  // מבטיח שיש לנו ערכים תקינים
  const displayStats = {
    totalViews: stats?.totalViews || 0,
    totalClicks: stats?.totalClicks || 0,
    conversionRate: stats?.conversionRate || 0,
    averageViewDuration: stats?.averageViewDuration || 0
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      <StatCard
        icon={Eye}
        label="סה״כ צפיות"
        value={displayStats.totalViews.toLocaleString()}
      />
      <StatCard
        icon={MousePointer}
        label="סה״כ קליקים"
        value={displayStats.totalClicks.toLocaleString()}
      />
      <StatCard
        icon={TrendingUp}
        label="אחוז המרה"
        value={`${displayStats.conversionRate.toFixed(1)}%`}
      />
      <StatCard
        icon={Clock}
        label="זמן צפייה ממוצע"
        value={`${displayStats.averageViewDuration.toFixed(1)}s`}
      />
    </div>
  );
};

export default GeneralStats;