/* eslint-disable react/prop-types */
import { Component } from "react";
import BackButton from "../common/BackButton.jsx";
import Input from "../common/Input.jsx";
import TextArea from "../common/TextArea.jsx";
import InvoiceItem from "../common/InvoiceItem.jsx";

class AddInvoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceNumber: "",
      invoiceDate: "",
      invoiceItems: [],
      companyName: "",
      companyAddress: "",
      companyEmail: "",
      companyMobile: "",
      clientName: "",
      clientAddress: "",
      clientEmail: "",
      clientMobile: "",
      invoiceNumberError: "",
      invoiceDateError: "",
      invoiceItemsError: "",
      companyNameError: "",
      companyAddressError: "",
      companyEmailError: "",
      companyMobileError: "",
      clientNameError: "",
      clientAddressError: "",
      clientEmailError: "",
      clientMobileError: "",
      invoiceItemsElements: [],
    };

    // binding function
    this.goBack = this.goBack.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePreviewInvoice = this.handlePreviewInvoice.bind(this);
    this.handleAddInvoiceItems = this.handleAddInvoiceItems.bind(this);
    this.handleRemoveInvoiceItems = this.handleRemoveInvoiceItems.bind(this);
    this.handleChangeInvoiceItems = this.handleChangeInvoiceItems.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  goBack() {
    // moving back to home screen
    this.props.navigate("/all");
  }

  handleInputChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  handlePreviewInvoice() {
    /**
     * validating form and moving to preview screen by passing the state through useNavigate hook instance
     * got from HooksWrapper component
     */

    this.resetError();

    const {
      invoiceNumber,
      invoiceDate,
      invoiceItems,
      companyName,
      companyAddress,
      companyEmail,
      companyMobile,
      clientName,
      clientAddress,
      clientEmail,
      clientMobile,
    } = this.state;

    if (this.validateForm() === "valid")
      this.props.navigate("/preview", {
        state: {
          invoiceNumber,
          invoiceDate,
          invoiceItems,
          companyName,
          companyAddress,
          companyEmail,
          companyMobile,
          clientName,
          clientAddress,
          clientEmail,
          clientMobile,
          id: Math.random(),
          type: "preview",
          heading: "Preview Invoice",
        },
      });
  }

  handleAddInvoiceItems() {
    /**
     * Adding invoice item
     * For it we need to modify and synchronixe both invoiceItems and invoiceItemsElement state
     * We will be using common id to do it
     */
    this.setState((state) => {
      const randomId = state.invoiceItems.length + Math.random();

      return {
        invoiceItems: [
          ...state.invoiceItems,
          {
            id: randomId,
            itemName: "",
            itemAmount: "",
          },
        ],
        invoiceItemsElements: [
          ...state.invoiceItemsElements,
          {
            id: randomId,
            element: (
              <InvoiceItem
                key={randomId}
                addItem={this.handleAddInvoiceItems}
                removeItem={this.handleRemoveInvoiceItems}
                itemId={randomId}
                changeInvoiceItem={this.handleChangeInvoiceItems}
              />
            ),
          },
        ],
      };
    });
  }

  handleRemoveInvoiceItems(id) {
    /**
     * Removing item from both states
     */
    this.setState((state) => {
      return {
        invoiceItems: state.invoiceItems.filter((item) => item.id !== id),
        invoiceItemsElements: state.invoiceItemsElements.filter(
          (item) => item.id !== id
        ),
      };
    });
  }

  handleChangeInvoiceItems(itemObj) {
    // updating invoiceItem for specific id
    this.setState((state) => {
      const { id, itemName, itemAmount } = itemObj;

      const modArray = state.invoiceItems.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            itemName: itemName,
            itemAmount: itemAmount,
          };
        } else return item;
      });

      return { invoiceItems: modArray };
    });
  }

  validateForm() {
    const validation = [];

    const {
      invoiceNumber,
      invoiceDate,
      invoiceItems,
      companyName,
      companyAddress,
      companyEmail,
      companyMobile,
      clientName,
      clientAddress,
      clientEmail,
      clientMobile,
    } = this.state;

    if (invoiceNumber.length === 0) {
      this.setState({ invoiceNumberError: "red" });
      validation.push("invalid");
    }

    if (invoiceDate.length === 0) {
      this.setState({ invoiceDateError: "red" });
      validation.push("invalid");
    }

    if (invoiceItems.length === 0) {
      this.setState({ invoiceItemsError: "red" });
      validation.push("invalid");
    } else {
      let count = 0;

      invoiceItems.map((item) => {
        if (item.itemName !== "" && item.itemValue !== "") count++;
      });

      if (count === 0) {
        this.setState({ invoiceItemsError: "red" });
        validation.push("invalid");
      }
    }

    if (companyName.length === 0) {
      this.setState({ companyNameError: "red" });
      validation.push("invalid");
    }

    if (companyAddress.length === 0) {
      this.setState({ companyAddressError: "red" });
      validation.push("invalid");
    }

    if (companyEmail.length === 0) {
      this.setState({ companyEmailError: "red" });
      validation.push("invalid");
    }

    if (companyMobile.length === 0) {
      this.setState({ companyMobileError: "red" });
      validation.push("invalid");
    }

    if (clientName.length === 0) {
      this.setState({ clientNameError: "red" });
      validation.push("invalid");
    }

    if (clientAddress.length === 0) {
      this.setState({ clientAddressError: "red" });
      validation.push("invalid");
    }

    if (clientEmail.length === 0) {
      this.setState({ clientEmailError: "red" });
      validation.push("invalid");
    }

    if (clientMobile.length === 0) {
      this.setState({ clientMobileError: "red" });
      validation.push("invalid");
    }

    if (validation.includes("invalid")) return "invalid";
    else return "valid";
  }

  resetError() {
    this.setState({
      invoiceNumberError: "",
      invoiceDateError: "",
      invoiceItemsError: "",
      companyNameError: "",
      companyAddressError: "",
      companyEmailError: "",
      companyMobileError: "",
      clientNameError: "",
      clientAddressError: "",
      clientEmailError: "",
      clientMobileError: "",
    });
  }

  componentDidMount() {
    // this is necessary for re-hydrating states when we return from preview screen
    if (this.props.location.state) {
      const {
        invoiceNumber,
        invoiceDate,
        invoiceItems,
        companyName,
        companyAddress,
        companyEmail,
        companyMobile,
        clientName,
        clientAddress,
        clientEmail,
        clientMobile,
      } = this.props.location.state;

      this.setState({
        invoiceNumber,
        invoiceDate,
        invoiceItems,
        companyName,
        companyAddress,
        companyEmail,
        companyMobile,
        clientName,
        clientAddress,
        clientEmail,
        clientMobile,
        invoiceItemsElements: invoiceItems.map((item) => {
          return {
            id: item.id,
            element: (
              <InvoiceItem
                key={item.id}
                data={item}
                addItem={this.handleAddInvoiceItems}
                removeItem={this.handleRemoveInvoiceItems}
                itemId={item.id}
                changeInvoiceItem={this.handleChangeInvoiceItems}
              />
            ),
          };
        }),
      });
    }
  }

  render() {
    return (
      <main className="h-screen w-screen flex justify-center">
        <section className="relative w-2/3 shadow-md flex flex-col gap-4 overflow-scroll scrollBox p-4 xs:p-2 mobile:w-full">
          <div className="text-3xl flex gap-4 items-center">
            <BackButton onClick={this.goBack} />
            <h1 className="font-semibold">Create Invoice</h1>
          </div>

          <section>
            <form className="flex flex-col gap-4">
              <Input
                type="text"
                name="invoiceNumber"
                label="Invoice Number"
                onChange={this.handleInputChange}
                value={this.state.invoiceNumber}
                placeholder="Enter Invoice Number"
                error={this.state.invoiceNumberError}
              />

              <Input
                type="date"
                name="invoiceDate"
                label="Invoice Date"
                onChange={this.handleInputChange}
                value={this.state.invoiceDate}
                placeholder="Enter Invoice Date"
                error={this.state.invoiceDateError}
              />

              {/* from details */}
              <Input
                type="text"
                name="companyName"
                label="Your Company Name"
                onChange={this.handleInputChange}
                value={this.state.companyName}
                placeholder={"Enter your company name"}
                error={this.state.companyNameError}
              />
              <TextArea
                name="companyAddress"
                label="Your Company Address"
                onChange={this.handleInputChange}
                value={this.state.companyAddress}
                placeholder={"Enter your company address"}
                error={this.state.companyAddressError}
              />
              <Input
                type="email"
                name="companyEmail"
                label="Your Company Email"
                onChange={this.handleInputChange}
                value={this.state.companyEmail}
                placeholder={"Enter your company email"}
                error={this.state.companyEmailError}
              />
              <Input
                type="number"
                name="companyMobile"
                label="Your Company Mobile"
                onChange={this.handleInputChange}
                value={this.state.companyMobile}
                placeholder={"Enter your company mobile"}
                error={this.state.companyMobileError}
              />

              {/* to details */}
              <Input
                type="text"
                name="clientName"
                label="Client Name"
                onChange={this.handleInputChange}
                value={this.state.clientName}
                placeholder={"Enter client's company name"}
                error={this.state.clientNameError}
              />
              <TextArea
                name="clientAddress"
                label="Client Address"
                onChange={this.handleInputChange}
                value={this.state.clientAddress}
                placeholder={"Enter client's company address"}
                error={this.state.clientAddressError}
              />
              <Input
                type="email"
                name="clientEmail"
                label="Client Email"
                onChange={this.handleInputChange}
                value={this.state.clientEmail}
                placeholder={"Enter client's company email"}
                error={this.state.clientEmailError}
              />
              <Input
                type="number"
                name="clientMobile"
                label="Client Mobile"
                onChange={this.handleInputChange}
                value={this.state.clientMobile}
                placeholder={"Enter client's company mobile"}
                error={this.state.clientMobileError}
              />

              <div>
                <div className="flex justify-between gap-4 items-center">
                  <p className="font-semibold">Invoice Items</p>
                  <button
                    type="button"
                    onClick={this.handleAddInvoiceItems}
                    className="font-semibold p-2 px-4 bg-yellow-500 rounded-md shadow"
                  >
                    Add Items
                  </button>
                </div>

                <div className="flex flex-col justify-center py-2">
                  {this.state.invoiceItemsElements.map((item) => item.element)}
                </div>

                {this.state.invoiceItemsError === "red" && (
                  <p className="text-red-500 text-md font-semibold">
                    No items added. One item must be filled completely
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={this.handlePreviewInvoice}
                className="font-bold p-2 px-4 bg-yellow-500 rounded-md shadow"
              >
                Preview Invoice
              </button>
            </form>
          </section>
        </section>
      </main>
    );
  }
}

export default AddInvoice;
