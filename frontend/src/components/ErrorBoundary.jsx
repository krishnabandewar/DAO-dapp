import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-500 text-white rounded">
          <h2>Something went wrong.</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-white text-red-500 px-4 py-2 rounded mt-2"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;