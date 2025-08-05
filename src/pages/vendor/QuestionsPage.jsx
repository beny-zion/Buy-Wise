/* needed */
// src/pages/vendor/QuestionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Filter, MessageCircle } from 'lucide-react';
import { vendorQuestionsService } from '../../services/api/vendorQuestions';
import { useVendorNotifications } from '../../hooks/useVendorNotifications';
import QuestionsList from '../../components/vendor/questions/QuestionsList';

const QuestionsPage = () => {
  const navigate = useNavigate();
  const { markAllAsRead } = useVendorNotifications();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('unanswered');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    loadQuestions();
    // סימון כל ההתראות כנקראו בכניסה לעמוד
    markAllAsRead();
  }, [filter, page]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await vendorQuestionsService.getQuestions({
        page,
        status: filter
      });
      
      setQuestions(response.questions);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (questionId, content) => {
    try {
      await vendorQuestionsService.replyToQuestion(questionId, content);
      // רענון השאלות
      loadQuestions();
    } catch (error) {
      console.error('Error replying to question:', error);
      throw error;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 py-8">
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>

      {/* כפתורי ניווט */}
      <div className="fixed top-4 right-4 flex gap-2 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="דף הבית"
        >
          <Home className="w-5 h-5 text-[#FFA066]" />
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="חזור לפרופיל"
        >
          <ChevronRight className="w-5 h-5 text-[#FFA066]" />
        </button>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* כותרת */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                       bg-clip-text text-transparent inline-flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-[#FFA066]" />
            ניהול שאלות מלקוחות
          </h1>
        </div>

        {/* פילטרים */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between" dir="rtl">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">סינון:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setFilter('unanswered'); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'unanswered'
                      ? 'bg-[#FFA066] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ממתינות למענה
                </button>
                <button
                  onClick={() => { setFilter('answered'); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'answered'
                      ? 'bg-[#FFA066] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  נענו
                </button>
                <button
                  onClick={() => { setFilter('all'); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-[#FFA066] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  כל השאלות
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {pagination.totalQuestions || 0} שאלות
            </div>
          </div>
        </div>

        {/* רשימת שאלות */}
        <QuestionsList
          questions={questions}
          loading={loading}
          onReply={handleReply}
        />

        {/* פגינציה */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2" dir="rtl">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                             transition-colors duration-200 ${
                               page === pageNum
                                 ? 'bg-[#FFA066] text-white'
                                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                             }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;