/* eslint-disable react/prop-types */
import { Component, createRef } from "react";
import BackButton from "../common/BackButton.jsx";
import Input from "../common/Input.jsx";
import { storeInvoice } from "../../store/slices/storedInvoiceSlice.js";
import Modal from "../common/Modal.jsx";

class StoreInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      showModal: false,
      fileError: "",
      fileNameError: "",
      fileURL: "",
    };

    // binding functions
    this.fileRef = createRef(null);
    this.goBack = this.goBack.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreInvoice = this.handleStoreInvoice.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.resetError = this.resetError.bind(this);
    this.handleDoneFunction = this.handleDoneFunction.bind(this);
  }

  goBack() {
    this.props.navigate("/all");
  }

  handleInputChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  handleFileInputChange(e) {
    this.setState({
      fileURL: URL.createObjectURL(e.target.files[0]),
    });
  }

  handleDoneFunction() {
    this.setState({ showModal: false });
    this.props.navigate("/all");
  }

  validateForm() {
    const validation = [];

    const { fileURL, fileName } = this.state;

    if (fileURL.length === 0) {
      this.setState({
        fileError: "red",
      });
      validation.push("invalid");
    }

    if (fileName.length === 0) {
      this.setState({
        fileNameError: "red",
      });
      validation.push("invalid");
    }

    if (validation.includes("invalid")) return "invalid";
    else return "valid";
  }

  resetError() {
    this.setState({
      fileError: "",
      fileNameError: "",
    });
  }

  handleStoreInvoice() {
    this.resetError();

    const { fileURL, fileName } = this.state;

    if (this.validateForm() === "valid") {
      this.props.dispatch(
        storeInvoice({
          id: Math.random(),
          fileName: fileName,
          fileURL: fileURL,
        })
      );

      this.setState({
        showModal: true,
      });
    }
  }

  render() {
    return (
      <main className="h-screen w-screen flex justify-center">
        <section className="relative w-2/3 shadow-md flex flex-col gap-4 overflow-scroll scrollBox p-4 xs:p-2 mobile:w-full">
          <div className="text-3xl flex gap-4 items-center">
            <BackButton onClick={this.goBack} />
            <h1 className="font-semibold">Store Invoice</h1>
          </div>

          <section>
            <form className="flex flex-col gap-4">
              <Input
                type="text"
                name="fileName"
                label="File Name"
                onChange={this.handleInputChange}
                value={this.state.fileName.name}
                placeholder="Enter file name"
                error={this.state.fileNameError}
              />

              {/* file input */}
              <div className="w-full h-full flex flex-col gap-2 font font-semibold">
                <label htmlFor="file">Select your Invoice</label>

                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={this.handleFileInputChange}
                  className={`h-full w-full border rounded-md p-2 outline-none font-normal shadow accent-yellow-500 bg-white ${
                    this.state.fileError === "red"
                      ? "outline outline-offset-2 outline-red-500"
                      : ""
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={this.handleStoreInvoice}
                className="font-bold p-2 px-4 bg-yellow-500 rounded-md shadow"
              >
                Store Invoice
              </button>
            </form>

            <embed
              src={this.state.pdfBase64}
              width="500"
              height="400"
              type="application/pdf"
            />
          </section>
        </section>

        {this.state.showModal && (
          <Modal
            type={"success"}
            doneButtonFunction={this.handleDoneFunction}
            message="Successfully stored the file"
          />
        )}
      </main>
    );
  }
}

export default StoreInvoice;
