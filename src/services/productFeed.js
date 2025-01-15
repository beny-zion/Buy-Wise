import { throttle } from 'lodash';
import { getAllProducts } from './api/products';

class ProductFeedService {
  constructor() {
    this.isNavigating = false;
    this.initialLoadDone = false;
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  }

  // ניהול ניווט
  handleNavigation = async (currentIndex, products, direction, callbacks) => {
    if (this.isNavigating) return;

    this.isNavigating = true;
    const { onDirectionChange, onIndexChange, onLoadMore, onNavigate } = callbacks;
    onDirectionChange(direction);

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < products.length) {
      onIndexChange(newIndex);
      
      // טעינת מוצרים נוספים כשמתקרבים לסוף
      if (direction === 'down' && newIndex >= products.length - 3) {
        await onLoadMore();
      }

      // עדכון URL
      if (onNavigate && products[newIndex]) {
        onNavigate(`/product/${products[newIndex]._id}`);
      }
    }

    setTimeout(() => {
      this.isNavigating = false;
    }, 1000);
  };

  // ניהול גלילה
  createScrollHandler = (currentIndex, products, callbacks) => {
      if (this.isMobile) {
        // בטלפונים לא נמנע את הגלילה הטבעית
        return () => {};
      }
    return throttle((e) => {
      e.preventDefault();
      const threshold = 1;
      const direction = e.deltaY;

      if (Math.abs(direction) < threshold) return;

      this.handleNavigation(
        currentIndex,
        products,
        direction > 0 ? 'down' : 'up',
        callbacks
      );
    }, 400);
  };

  // ניהול מקלדת
  createKeyboardHandler = (currentIndex, products, callbacks) => {
    
    return throttle((e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.handleNavigation(currentIndex, products, 'up', callbacks);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.handleNavigation(currentIndex, products, 'down', callbacks);
      }
    }, 200);
  };

  // טעינת מוצרים
  loadProducts = async (params = { page: 1, limit: 10 }) => {
    try {
      const response = await getAllProducts(params);
      return {
        products: response.products,
        hasMore: response.products.length === params.limit
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export const productFeedService = new ProductFeedService();