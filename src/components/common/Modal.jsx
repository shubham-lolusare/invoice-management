/* eslint-disable react/prop-types */
import { Component } from "react";

/**
 * this modal serves multiple functionality based on types prop passed
 * Currently it is serving as success as well as delete modal
 */

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type === "success") {
      // success modal
      return (
        <div className="fixed top-0 right-0 h-screen w-screen bg-black/70 flex justify-center items-center p-4 xs:p-2">
          <div className="w-1/3 h-1/3 rounded-lg bg-yellow-50 flex flex-col items-center mobile:w-full p-4">
            <p className="text-3xl text-center flex-1 flex justify-center items-center font-bold">
              {this.props.message}
            </p>

            <div>
              <button
                type="button"
                onClick={this.props.doneButtonFunction}
                className="bg-yellow-500 p-2 px-12 rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      );
    } else if (this.props.type === "delete") {
      // delete modal
      return (
        <div className="fixed top-0 right-0 h-screen w-screen bg-black/70 flex justify-center items-center p-4 xs:p-2">
          <div className="w-1/3 h-1/3 rounded-lg bg-yellow-50 flex flex-col items-center mobile:w-full p-4">
            <p className="text-3xl text-center flex-1 flex justify-center items-center font-bold">
              {this.props.message}
            </p>

            <div className="flex justify-center items-center gap-4">
              <button
                type="button"
                onClick={this.props.deleteButtonFunction}
                className="bg-yellow-500 p-2 px-4 rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
              >
                Delete
              </button>

              <button
                type="button"
                onClick={this.props.closeButtonFunction}
                className="bg-yellow-500 p-2 px-4 rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Modal;
