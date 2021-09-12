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

class EventInformationModal extends React.Component {
  
  constructor(props) {
   
    super(props);
    this.state = {
      Tags: ["tag"],
      eventDetails:{}
    };
  }


  componentDidUpdate(previousProp) {
    
    if (previousProp !== this.props) {

    
    }

    }
  componentDidMount() {
  console.log(this.props.eventDetails)
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
          Event Information
        </ModalHeader>
        <ModalBody
          style={{ height: "400px" }}
          className="modal-dialog-centered"
        >  <pre>{JSON.stringify(this.props.eventDetails?this.props.eventDetails:"", null, 2)}</pre>
          <ToastContainer />
        </ModalBody>
      
        <ModalFooter></ModalFooter>
      </Modal>
    );
  }
}
export default EventInformationModal;


