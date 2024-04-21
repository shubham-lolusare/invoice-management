/* eslint-disable react/prop-types */
import { Component } from "react";
import BackButton from "../common/BackButton.jsx";
import { saveInvoice } from "../../store/slices/createdInvoiceSlice.js";
import Modal from "../common/Modal.jsx";
import html2pdf from "html2pdf.js";

/**
 * Component will be served as both preview as well as view methods
 * Functionality are conditinally assigned
 */

class PreviewInvoice extends Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };

    // binding function
    this.goBack = this.goBack.bind(this);
    this.handleSaveInvoice = this.handleSaveInvoice.bind(this);
    this.handleDoneFunction = this.handleDoneFunction.bind(this);
    this.handleDownloadInvoice = this.handleDownloadInvoice.bind(this);
  }

  goBack() {
    if (this.props.location.state.type === "preview")
      this.props.navigate("/add", { state: this.props.location.state });
    else if (this.props.location.state.type === "view")
      this.props.navigate("/all", { state: this.props.location.state });
  }

  handleSaveInvoice() {
    // function will be used in preview mode to save and download pdf
    // saving to store
    this.props.dispatch(saveInvoice({ ...this.props.location.state }));

    this.setState({ showModal: true });

    // downloading pdf
    const element = document.getElementById("invoice");

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  }

  handleDoneFunction() {
    this.setState({ showModal: false });
    this.props.navigate("/all");
  }

  handleDownloadInvoice() {
    // function will be used in view mode to download pdf only
    const element = document.getElementById("invoice");

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  }

  render() {
    // getting data from useLocation hook passed through HooksWrpper component
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
      type,
      heading,
    } = this.props.location.state;

    return (
      <main className="h-screen w-screen flex justify-center">
        <section className="relative w-[650px] flex flex-col gap-4 overflow-scroll scrollBox p-4 xs:p-2 mobile:w-full">
          <div className="text-3xl flex gap-4 items-center">
            <BackButton onClick={this.goBack} />
            <h1 className="font-semibold">{heading}</h1>
          </div>

          {/* invoice static html */}
          <div className="overflow-scroll scrollBox">
            <div
              id="invoice"
              className="min-w-[600px] w-[600px] h-max bg-white shadow-md p-8"
            >
              <div className="flex justify-between border-b pb-8 mb-4">
                <h1 className="text-2xl font-semibold max-w-[250px]">
                  Invoice
                </h1>

                <div className="text-right text-sm max-w-[250px]">
                  <p className="text-gray-600">Date: {invoiceDate}</p>
                  <p className="text-gray-600 text-sm break-words">
                    Invoice #{invoiceNumber}
                  </p>
                </div>
              </div>
              <div className="flex justify-between border-b gap-8 pb-8 mb-4">
                <div className="max-w-[250px]">
                  <p className="text-gray-600 ">Bill To:</p>
                  <p className="text-sm font-bold break-words">{companyName}</p>
                  <p className="text-xs break-words">{companyAddress}</p>
                  <p className="text-xs break-words">{companyEmail}</p>
                  <p className="text-xs">Mobile: {companyMobile}</p>
                </div>
                <div className="max-w-[250px]">
                  <p className="text-gray-600 ">Bill To:</p>
                  <p className="text-sm font-bold break-words">{clientName}</p>
                  <p className="text-xs break-words">{clientAddress}</p>
                  <p className="text-xs break-words">{clientEmail}</p>
                  <p className="text-xs">Mobile: {clientMobile}</p>
                </div>
              </div>
              <div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-2 text-left">Description</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2">{item.itemName}</td>
                        <td className="py-2 text-right">{item.itemAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="py-2 text-right font-semibold">Total:</td>
                      <td className="py-2 text-right font-semibold">
                        {(() => {
                          let sum = 0;

                          invoiceItems.map((item) => {
                            sum += Number(item.itemAmount);
                          });

                          return sum;
                        })()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="fixed bottom-4 flex gap-2 self-center">
            {type === "preview" && (
              <button
                type="button"
                onClick={this.handleSaveInvoice}
                className="bg-yellow-500 p-2 px-12 rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
              >
                Save Invoice
              </button>
            )}

            {type === "view" && (
              <button
                type="button"
                onClick={this.handleDownloadInvoice}
                className="bg-yellow-500 p-2 px-12 rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
              >
                Download Invoice
              </button>
            )}
          </div>
        </section>

        {this.state.showModal && (
          <Modal
            type={"success"}
            doneButtonFunction={this.handleDoneFunction}
            message="Successfully saved the invoice"
          />
        )}
      </main>
    );
  }
}

export default PreviewInvoice;
