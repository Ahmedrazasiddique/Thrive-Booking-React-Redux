import React from "react"
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table
  } from "reactstrap"
import AddBreakCom from "./AddBreakCom"
  class AddBreaksModal extends React.Component {
   
    constructor(props)
    {
        super(props);
    }
    state = {
      modal: false,
      BreaksData:{

        "Monday":{
          Day:"Monday",
          Breaks:[{
          ID:1,
          Day:"Monday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        },{
          ID:1,
          Day:"Monday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        },{
          ID:1,
          Day:"Monday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        }]},
        "Tuesday":{
          Day:"Tuesday",
          Breaks:[{
          ID:1,
          Day:"Tuesday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        }]},
        "Wenesday":{
          Day:"Wenesday",
          Breaks:[{
          ID:1,
          Day:"Wenesday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        }]},
        "Thursday":{
          Day:"Thursday",
          Breaks:[{
          ID:1,
          Day:"Thursday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        }]},
        "Friday":{
          Day:"Friday",
          Breaks:[{
          ID:1,
          Day:"Friday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        }]},
        "Saturday":{
          Day:"Saturday",
          Breaks:[{
          ID:1,
          Day:"Saturday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        }]},
        "Sunday":{
          Day:"Sunday",
          Breaks:[{
          ID:1,
          Day:"Sunday",
          isOpen:false,
          StartTime:"",
          EndTime:"",
        }]},
        
      }
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
        Breaks Management
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">
        <Table className="table-hover-animation" responsive>
          <thead>
            <tr>
              <th>Day</th>
              <th>Is Open</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>

      <AddBreakCom  BreaksData={this.state.BreaksData.Monday}></AddBreakCom>
      <AddBreakCom  BreaksData={this.state.BreaksData.Tuesday}></AddBreakCom>
      <AddBreakCom  BreaksData={this.state.BreaksData.Wenesday}></AddBreakCom>
      <AddBreakCom  BreaksData={this.state.BreaksData.Thursday}></AddBreakCom>
      <AddBreakCom  BreaksData={this.state.BreaksData.Friday}></AddBreakCom>
      <AddBreakCom  BreaksData={this.state.BreaksData.Saturday}></AddBreakCom>
      <AddBreakCom  BreaksData={this.state.BreaksData.Sunday}></AddBreakCom>
    
      </Table>
   
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggleModalPreview}>
            Save
          </Button>{" "}
        </ModalFooter>
      </Modal>
      )
    }
  }
  export default AddBreaksModal
  