import React from "react"
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table
  } from "reactstrap"
  import AddNewForm from "../RegistorCustomer/AddNewForm"
  class RegisterCustomerEdit extends React.Component {
   
    constructor(props)
    {
        super(props);
    }
    state = {
      modal: false,
   
      }
    
    componentDidMount()
    {}

    toggleModal = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }))
    }

    render() {
     
      return(
     
      <Modal
        isOpen={this.props.ModalOpenPreview}
        toggle={this.props.toggleModalPreview}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={this.props.toggleModalPreview} className="bg-primary">
        Add/Edit Customer
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">
       <AddNewForm></AddNewForm>
        </ModalBody>
        <ModalFooter>
        <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
          <Button color="primary" onClick={this.props.toggleModalPreview}>
            Close
          </Button>{" "}
        </ModalFooter>
      </Modal>
      )
    }
  }
  export default RegisterCustomerEdit
  