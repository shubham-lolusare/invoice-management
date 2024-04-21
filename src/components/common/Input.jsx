/* eslint-disable react/prop-types */
import { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, type, onChange, value, placeholder, error } =
      this.props;

    return (
      <div className="w-full h-full flex flex-col gap-2 font font-semibold">
        {label && <label htmlFor={name}>{label}</label>}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`h-full w-full border rounded-md p-2 outline-none font-normal shadow accent-yellow-500 ${
            error === "red" ? "outline outline-offset-2 outline-red-500" : ""
          }`}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default Input;
