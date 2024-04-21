/* eslint-disable react/prop-types */
import { Component } from "react";

import { MdRemoveCircle } from "react-icons/md";

import Input from "./Input.jsx";

class InvoiceItem extends Component {
  constructor(props) {
    super(props);

    // initializing state
    this.state = {
      itemName: "",
      itemAmount: "",
    };

    // binding function
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  componentDidUpdate() {
    // updating parent state data
    this.props.changeInvoiceItem({
      id: this.props.itemId,
      itemName: this.state.itemName,
      itemAmount: this.state.itemAmount,
    });
  }

  componentDidMount() {
    // loading data for the first time when returend from preview screen
    if (this.props.data) {
      this.setState({
        itemName: this.props.data.itemName,
        itemAmount: this.props.data.itemAmount,
      });
    }
  }

  render() {
    return (
      <div className="flex gap-2 items-center justify-center">
        {/* item name */}
        <Input
          type="text"
          name="itemName"
          onChange={this.handleInputChange}
          value={this.state.itemName}
          placeholder={"Enter item name"}
        />

        {/* item amount */}
        <Input
          type="number"
          name="itemAmount"
          onChange={this.handleInputChange}
          value={this.state.itemAmount}
          placeholder={"Enter item amount"}
        />

        {/* remove item buttom */}
        <button
          type="button"
          onClick={() => this.props.removeItem(this.props.itemId)}
          className="w-12 h-12 flex justify-center items-center"
        >
          <MdRemoveCircle className="w-full h-full text-yellow-500" />
        </button>
      </div>
    );
  }
}

export default InvoiceItem;
