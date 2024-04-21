/* eslint-disable react/prop-types */
import { Component } from "react";
import fallBackThumbnail from "../../assets/pdfLogo.png";
import { Link } from "react-router-dom";
import { FaDropbox } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import PDFCard from "../common/PDFCard.jsx";
import { connect } from "react-redux";
import Modal from "../common/Modal.jsx";
import { deleteInvoice } from "../../store/slices/createdInvoiceSlice.js";
import { deleteStoredInvoice } from "../../store/slices/storedInvoiceSlice.js";

// component will show all the stored as well as created invoices
class ViewAllComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdInvoices: [],
      storedInvoices: [],
      showCreateModal: false,
      showStoreModal: false,
      deleteId: "",
    };

    // binding functions
    this.handleDeleteInvoice = this.handleDeleteInvoice.bind(this);
    this.handleViewInvoice = this.handleViewInvoice.bind(this);
    this.handleDeleteStoredInvoice = this.handleDeleteStoredInvoice.bind(this);
  }

  handleViewInvoice(item) {
    this.props.navigate("/preview", {
      state: {
        ...item,
        type: "view",
        heading: "View Invoice",
      },
    });
  }

  handleDeleteInvoice() {
    this.props.dispatch(deleteInvoice(this.state.deleteId));
    this.setState({ showCreateModal: false, deleteId: "" });
  }

  handleDeleteStoredInvoice() {
    this.props.dispatch(deleteStoredInvoice(this.state.deleteId));
    this.setState({ showStoreModal: false, deleteId: "" });
  }

  componentDidMount() {
    // hydrating component with store data
    this.setState({
      createdInvoices: this.props.createdInvoice.data,
      storedInvoices: this.props.storedInvoice.data,
    });
  }

  componentDidUpdate(previousState) {
    // creating dependency for redux store changes
    if (
      previousState.createdInvoice.data.length !==
      this.props.createdInvoice.data.length
    )
      this.setState({ createdInvoices: this.props.createdInvoice.data });

    if (
      previousState.storedInvoice.data.length !==
      this.props.storedInvoice.data.length
    )
      this.setState({ storedInvoices: this.props.storedInvoice.data });
  }

  render() {
    return (
      <main className="w-screen h-screen flex justify-center">
        <section className="relative w-2/3 shadow-md  flex flex-col gap-4 overflow-scroll scrollBox p-4 xs:p-2 mobile:w-full">
          <section className="flex-1">
            <p className="text-2xl font-bold">Created Invoices</p>

            <div className="mt-4 flex flex-wrap gap-4 mobile:justify-center">
              {this.state.createdInvoices.length === 0 ? (
                <p>No Invoices Created</p>
              ) : (
                this.state.createdInvoices.map((item) => (
                  <PDFCard
                    key={item.id}
                    name={item?.invoiceNumber ?? "PDF File"}
                    thumbnail={
                      item?.thumbnail ? item.thumbnail : fallBackThumbnail
                    }
                    showEyeButton={true}
                    showDeleteButton={true}
                    viewPDF={() => this.handleViewInvoice(item)}
                    deletePDF={() =>
                      this.setState({
                        showCreateModal: true,
                        deleteId: item.id,
                      })
                    }
                    navigationState={item}
                  />
                ))
              )}
            </div>
          </section>

          <hr className="border-2 border-yellow-500 rounded-full" />

          <section className="pb-24 flex-1">
            <p className="text-2xl font-bold">Stored Invoices</p>

            <div className="mt-4 flex flex-wrap gap-4 mobile:justify-center">
              {this.state.storedInvoices.length === 0 ? (
                <p>No Invoices Stored</p>
              ) : (
                this.state.storedInvoices.map((item) => (
                  <PDFCard
                    key={item.id}
                    name={item?.fileName ?? "PDF File"}
                    thumbnail={
                      item?.thumbnail ? item.thumbnail : fallBackThumbnail
                    }
                    showDeleteButton={true}
                    deletePDF={() =>
                      this.setState({
                        showStoreModal: true,
                        deleteId: item.id,
                      })
                    }
                    navigationState={item}
                  />
                ))
              )}
            </div>
          </section>

          <div className="fixed bottom-4 flex gap-2 self-center">
            <Link
              to="/add"
              className="bg-yellow-500 p-2 px-4 mobile:px-2 rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
            >
              <IoIosAddCircle className="h-8 w-8" />
              <p>Create Invoice</p>
            </Link>

            <Link
              to="/store"
              className="bg-yellow-500 p-2 px-4 mobile:px-2 rounded-lg font-semibold shadow-md flex justify-center items-center gap-2"
            >
              <FaDropbox className="h-6 w-6" />
              <p>Store Invoice</p>
            </Link>
          </div>
        </section>

        {this.state.showCreateModal && (
          <Modal
            type="delete"
            deleteButtonFunction={this.handleDeleteInvoice}
            closeButtonFunction={() =>
              this.setState({ showCreateModal: false, deleteId: "" })
            }
            message="Are you sure you want to delete the invoice?"
          />
        )}

        {this.state.showStoreModal && (
          <Modal
            type="delete"
            deleteButtonFunction={this.handleDeleteStoredInvoice}
            closeButtonFunction={() =>
              this.setState({ showStoreModal: false, deleteId: "" })
            }
            message="Are you sure you want to delete the file?"
          />
        )}
      </main>
    );
  }
}

// getting access from redux store state as props
const mapStateToProps = (state) => {
  return {
    createdInvoice: state.createdInvoice,
    storedInvoice: state.storedInvoice,
  };
};

// initialing for fast refresh in react
const ViewAllInvoices = connect(mapStateToProps)(ViewAllComponent);

export default ViewAllInvoices;
