import React from "react"
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap"

  class PreviewTemplate extends React.Component {

    constructor(props)
    {
        super(props);
    }
    state = {
      modal: false
    }
    componentDidMount()
    {}

    toggleModal = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }))
    }

    render() {
        //debugger
      return(

      <Modal
        isOpen={this.props.ModalOpenPreview}
        toggle={this.props.toggleModalPreview}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={this.props.toggleModalPreview} className="bg-primary">
        Preview Template
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">
       {this.props.template}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggleModalPreview}>
            Accept
          </Button>{" "}
        </ModalFooter>
      </Modal>
      )
    }
  }
  export default PreviewTemplate
