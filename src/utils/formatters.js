/* needed */
// components/ProductViewer/utils/formatters.js

/**
 * פורמט מחיר לתצוגה בשקלים
 * @param {number} price - המחיר לפורמט
 * @returns {string} מחרוזת מחיר מפורמטת
 */
export const formatPrice = (price) => {
    if (price === null || price === undefined) return '';
    
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  /**
   * פורמט תאריך לתצוגה בעברית
   * @param {string|Date} date - תאריך לפורמט
   * @returns {string} מחרוזת תאריך מפורמטת
   */
  export const formatDate = (date) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  };
  
  /**
   * פורמט מספר עם הפרדת אלפים
   * @param {number} num - המספר לפורמט
   * @returns {string} מחרוזת מספר מפורמטת
   */
  export const formatNumber = (num) => {
    if (num === null || num === undefined) return '';
    
    return new Intl.NumberFormat('he-IL').format(num);
  };
  
  // /**
  //  * קיצור טקסט ארוך
  //  * @param {string} text - הטקסט לקיצור
  //  * @param {number} maxLength - האורך המקסימלי
  //  * @returns {string} טקסט מקוצר עם ... בסוף אם נדרש
  //  */
  // export const truncateText = (text, maxLength) => {
  //   if (!text || text.length <= maxLength) return text;
    
  //   return text.slice(0, maxLength) + '...';
  // };

  /**
   * קיצור טקסט ארוך
   * @param {string} text - הטקסט לקיצור
   * @param {number} maxLength - האורך המקסימלי
   * @returns {string} טקסט מקוצר עם ... בסוף אם נדרש
   */
  export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    
    return text.slice(0, maxLength) + '...';
  };

  /**
   * פורמט זמן שעבר (לפני כמה זמן)
   * @param {string|Date} date - התאריך לחישוב
   * @returns {string} מחרוזת זמן שעבר בעברית
   */
  export const formatTimeAgo = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    if (diffInSeconds < 60) {
      return 'עכשיו';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `לפני ${diffInMinutes} דקות`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `לפני ${diffInHours} שעות`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `לפני ${diffInDays} ימים`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `לפני ${diffInWeeks} שבועות`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `לפני ${diffInMonths} חודשים`;
    }
    
    const diffInYears = Math.floor(diffInDays / 365);
    return `לפני ${diffInYears} שנים`;
  };