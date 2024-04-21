import { Component } from "react";
import { Outlet } from "react-router-dom";

class App extends Component {
  render() {
    return <Outlet />;
  }
}

export default App;
