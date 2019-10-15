// ref: https://reactjs.org/docs/error-boundaries.html | https://fb.me/react-error-boundaries 
// ref: https://codepen.io/gaearon/pen/wqvxGa?editors=0010

import React, { Component, } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, info) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, info);
  // }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
    console.error(error, errorInfo);
  }

  render() {
    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   // return <h1>Something went wrong.</h1>;
    //   // return <div>⚠️</div>;
    //   return
    //   <details>
    //     <summary><span role="img" aria-label="warning emoji">⚠️</span></summary>
    //     <p> - by Refsnes Data. All Rights Reserved.</p>
    //     <p>All content and graphics on this web site are the property of the company Refsnes Data.</p>
    //   </details>
    // }
    const { children, } = this.props;
    const { error, errorInfo, } = this.state;
    if (errorInfo) {
      // Error path
      return (
        <div>
          {/* <h2>Something went wrong.</h2> */}
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>
              <span role="img" aria-label="warning emoji">
                ⚠️
              </span>
            </summary>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return children;
  } 
}

export default ErrorBoundary;

// use
// Then you can use it as a regular component:
// import ErrorBoundary from 'app/containers/ErrorBoundary' // my add
// <ErrorBoundary>
//   <MyWidget />
// </ErrorBoundary>