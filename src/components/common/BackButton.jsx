/* eslint-disable react/prop-types */
import { Component } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";

class BackButton extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <IoMdArrowRoundBack />
      </div>
    );
  }
}

export default BackButton;
