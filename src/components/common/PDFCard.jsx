/* eslint-disable react/prop-types */
import { Component } from "react";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";

// card for showing pdf items on homepage

class PDFCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="relative bg-yellow-100 rounded-xl shadow-lg flex flex-col gap-2 max-w-[150px] xs:max-w-[130px] ">
        {/* thumbnail */}
        <img
          src={this.props.thumbnail}
          className="w-[150px] h-[180px] rounded-xl xs:w-[130px]"
        />

        <div className="p-2 flex justify-between gap-2 items-center">
          {/* name */}
          <span className="ellipses font-semibold text-sm">
            {this.props.name}
          </span>

          {/* conditionally showing action buttons */}
          {/* delete button */}
          {this.props.showDeleteButton && (
            <button type="button" onClick={this.props.deletePDF}>
              <RiDeleteBin3Fill className="text-yellow-600 text-xl" />
            </button>
          )}

          {/* edit button */}
          {this.props.showEyeButton && (
            <button type="button" onClick={this.props.viewPDF}>
              <IoEye className="text-yellow-600 text-xl" />
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default PDFCard;
