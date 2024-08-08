import React, {Component } from 'react'
import errorImage from '../images/2153483.jpg'



class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error("ErrorBoundary caught an error", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="error-boundary">
            <img src={errorImage} alt="Error" />
            <h2>Something went wrong.</h2>
          </div>
        );
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;