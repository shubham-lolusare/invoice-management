/* eslint-disable react/prop-types */
import { Component } from "react";

class TextArea extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, onChange, value, placeholder, error } = this.props;

    return (
      <div className="w-full h-full flex flex-col gap-2 font font-semibold">
        <label htmlFor={name}>{label}</label>

        <textarea
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={`w-full border rounded-lg p-2 outline-none font-normal shadow scrollBox ${
            error === "red" ? "outline outline-offset-2 outline-red-500" : ""
          }`}
          rows="5"
        ></textarea>
      </div>
    );
  }
}

export default TextArea;
