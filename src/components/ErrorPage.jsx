/* eslint-disable react/prop-types */
import { Component } from "react";

class ErrorPage extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-lg text-gray-600">Please try again later.</p>
      </div>
    );
  }
}

export default ErrorPage;
