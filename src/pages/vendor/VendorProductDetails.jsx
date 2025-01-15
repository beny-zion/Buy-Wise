// pages/vendor/VendorProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vendorService } from '../../services/api/vendor';
import { Eye, MousePointer, Clock, Share2, ChevronRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

const VendorProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadProductData = async () => {
            try {
                setLoading(true);
                // טעינת המוצר והסטטיסטיקות במקביל
                const [productResponse, statsResponse] = await Promise.all([
                    vendorService.getProduct(id),
                    vendorService.getProductStats(id)
                ]);

                setProduct(productResponse.data);
                setStats(statsResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProductData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-[#FFA066] border-t-transparent rounded-full"></div>
            </div>
        );
    }
 
    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error || 'המוצר לא נמצא'}</p>
                    <button
                        onClick={() => navigate('/vendor/products')}
                        className="text-[#FFA066] hover:text-[#FF6B6B] transition-colors"
                    >
                        חזרה לרשימת המוצרים
                    </button>
                </div>
            </div>
        );
    }
 
    const StatCard = ({ icon: Icon, label, value, className = '' }) => (
        <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg 
                        transition-all duration-200 border border-gray-100 ${className}`}>
            <div className="flex items-center gap-4" dir="rtl">
                <div className="p-3 bg-gradient-to-br from-[#FFA066]/10 to-[#FF6B6B]/10 text-[#FFA066] rounded-xl">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] bg-clip-text text-transparent">
                        {value}
                    </div>
                    <div className="text-gray-600 text-sm font-medium">{label}</div>
                </div>
            </div>
        </div>
    );
 
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 py-8 px-4">
            {/* רקע דקורטיבי */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
                <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
            </div>
 
            {/* כפתור חזרה */}
            <button
                onClick={() => navigate('/vendor/products')}
                className="fixed top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full 
                         shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
                <ChevronRight className="w-5 h-5 text-[#FFA066]" />
            </button>
 
            <div className="max-w-4xl mx-auto relative">
                {/* תצוגת מוצר */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img
                                src={product.imageUrl}
                                alt="תמונת המוצר"
                                className="h-48 w-full object-cover md:h-full md:w-48"
                            />
                        </div>
                        <div className="p-8" dir="rtl">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(product.createdAt), 'dd/MM/yyyy', { locale: he })}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">{product.recommendation}</p>
                            <div className="flex items-center gap-4">
                                <a href={product.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white 
                                             px-6 py-2.5 rounded-lg font-medium hover:shadow-md 
                                             transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    צפה במוצר באלי אקספרס
                                </a>
                                <button
                                    onClick={() => navigate(`/vendor/products/${id}/edit`)}
                                    className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg 
                                             hover:bg-gray-200 transition-colors font-medium"
                                >
                                    ערוך / מחק מוצר
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(product.affiliateLink);
                                    }}
                                    className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="העתק קישור"
                                >
                                    <Share2 className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
 
                {/* סטטיסטיקות */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Eye}
                        label="סה״כ צפיות"
                        value={stats?.totalViews.toLocaleString() || 0}
                    />
                    <StatCard
                        icon={MousePointer}
                        label="סה״כ קליקים"
                        value={stats?.totalClicks.toLocaleString() || 0}
                    />
                    <StatCard
                        icon={Share2}
                        label="אחוז המרה"
                        value={`${(stats?.conversionRate || 0).toFixed(1)}%`}
                    />
                    <StatCard
                        icon={Clock}
                        label="זמן צפייה ממוצע"
                        value={`${(stats?.averageViewDuration || 0).toFixed(1)}s`}
                    />
                </div>
            </div>
        </div>
    );
 };

export default VendorProductDetails;