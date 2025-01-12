// src/components/common/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-600">משהו השתבש. אנא נסה שוב.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;