// src/hooks/useSwipe.js

export const useSwipe = (onSwipe) => {
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 5;
  
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
  
    const onTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      
      // וודא שההחלקה מספיק ארוכה
      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        const direction = swipeDistance > 0 ? 'down' : 'up';
        onSwipe(direction);
      }
    };
  
    return {
      onTouchStart,
      onTouchEnd
    };
  };