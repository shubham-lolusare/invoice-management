import { Component } from "react";

class NotFoundPage extends Component {
  render() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <p className="text-xl text-gray-600">Page not found</p>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
