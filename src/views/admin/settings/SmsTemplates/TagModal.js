import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Table,
} from "reactstrap";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import ScrollBar from "react-perfect-scrollbar";
class TagModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Tags: ["tag"],
    };
  }

  state = {
    value: "Copy Me!",
    copied: false,
  };

  handleCopy = ({ target: { value } }) => {
    this.setState({ value, copied: false });
  };

  onCopy = (e) => {
    //navigator.clipboard.writeText(e)
    this.setState({ copied: true });
    toast.success("Text Copied Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  componentDidMount() {
    this.setState({ Tags: this.props.Tags });
  }
  state = {
    modal: false,
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    return (
      <Modal
        isOpen={this.props.ModalOpen}
        toggle={this.props.toggleModal}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader toggle={this.props.toggleModal} className="bg-primary">
          Tags
        </ModalHeader>
        <ModalBody
          style={{ height: "400px" }}
          className="modal-dialog-centered"
        >
          <ScrollBar>
            <Table style={{ height: "400px" }} striped responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Tag</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Tags.map((tags) => (
                  <tr>
                    <td>{tags.name}</td>
                    <td>{tags.descriptio}</td>
                    <td>
                      <CopyToClipboard onCopy={this.onCopy} text={tags.tag}>
                        <Badge
                          pill
                          color="primary"
                          className="badge-lg"
                          style={{ cursor: "pointer" }}
                        >
                          {"{{" + tags.tag + "}}"}
                        </Badge>
                      </CopyToClipboard>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollBar>

          <ToastContainer />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    );
  }
}
export default TagModal;
