import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "reactstrap";

class PayLocalModal extends React.Component {
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
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Pay Locally</CardTitle>
          </CardHeader>
          <CardBody>
            <Button.Ripple
              color="primary"
              className="btn-block"
              size="lg"
              outline
              block
              onClick={this.toggleModal}
            >
              Launch Settings
            </Button.Ripple>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggleModal}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={this.toggleModal}>Pay Locally</ModalHeader>
              <ModalBody>Nothing to be configured!</ModalBody>
            </Modal>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default PayLocalModal;
