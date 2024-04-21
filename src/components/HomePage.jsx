import { Component } from "react";
import { Link } from "react-router-dom";

import { FaFileInvoice } from "react-icons/fa";

class HomePage extends Component {
  render() {
    return (
      <main className="text-center h-screen w-screen flex flex-col gap-4 justify-center items-center p-2">
        <FaFileInvoice className="text-9xl text-yellow-500" />
        <h1 className="text-5xl font-bold">Welcome!!!</h1>
        <p className="text-xl font-semibold">
          Create and store invoices on the go...
        </p>
        <Link
          to="/all"
          className="bg-yellow-500 p-2 rounded-lg px-12 font-semibold mt-8"
        >
          Proceed..
        </Link>
      </main>
    );
  }
}

export default HomePage;
