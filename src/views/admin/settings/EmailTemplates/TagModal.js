import React from "react"
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Badge,
    Table
    
  } from "reactstrap"
import {
  Link
} from "react-feather"

  import { CopyToClipboard } from "react-copy-to-clipboard"
  import { ToastContainer, toast } from "react-toastify"
  import "react-toastify/dist/ReactToastify.css"
  import "../../../../assets/scss/plugins/extensions/toastr.scss"
  class TagModal extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
          Tags:["tag"]
        }
    }

    state = {
      value: "Copy Me!",
      copied: false,
     
    }
   
   
  
    handleCopy = ({ target: { value } }) => {
      this.setState({ value, copied: false })
    }
  
    onCopy = () => {
      this.setState({ copied: true })
      toast.success("Text Copied Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      })
    }
  
   

    componentDidMount()
    {
       this.setState({Tags:this.props.Tags})
    }
    state = {
      modal: false
    }
   

    toggleModal = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }))
    }

    render() {
      return(
     
      <Modal
        isOpen={this.props.ModalOpen}
        toggle={this.props.toggleModal}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={this.props.toggleModal} className="bg-primary">
        Tags
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">
        <Table striped responsive>
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
            
              <td>Mark</td>
              <td>Test Description</td>
              <td><CopyToClipboard onCopy={this.onCopy} text={this.state.value}>
        <Badge pill color="primary" className="badge-lg" style={{cursor:"pointer"}}>
       
        {"{{"+tags+"}}"}
      </Badge>
          </CopyToClipboard></td>
             
            </tr>
          ))}
          </tbody>
        </Table>
       
          
       

                    <ToastContainer />
                  
        </ModalBody>
        <ModalFooter>
        
        </ModalFooter>
      </Modal>
      )
    }
  }
  export default TagModal
  