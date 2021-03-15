import React from "react"
  import {
    Modal,
    ModalHeader,
    ModalBody,
  } from "reactstrap"
  import AddNewForm from "../RegistorCustomer/AddNewForm"
  class RegisterCustomerEdit extends React.Component {
   
   
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
       <AddNewForm CountryDD={this.props.CountryDD} EditData={this.props.EditData}></AddNewForm>
        </ModalBody>
        
      </Modal>
      )
    }
  }
  export default RegisterCustomerEdit
  