import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { Eye, Code } from "react-feather";

class BankTransferModal extends React.Component {
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
            <CardTitle>Bank Transfer</CardTitle>
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
              <ModalHeader toggle={this.toggleModal}>Bank Transfer</ModalHeader>
              <ModalBody>
                Oat cake ice cream candy chocolate cake chocolate cake cotton
                candy dragée apple pie. Brownie carrot cake candy canes bonbon
                fruitcake topping halvah. Cake sweet roll cake cheesecake cookie
                chocolate cake liquorice.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleModal}>
                  Accept
                </Button>{" "}
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default BankTransferModal;
