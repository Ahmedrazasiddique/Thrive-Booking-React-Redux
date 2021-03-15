import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
  Table,
  Collapse
} from "reactstrap"
import classnames from "classnames"
import { User, Info, Share,Globe,Gift ,Clock,Edit2} from "react-feather"
import AddBreaksModal from "./Breaks/AddBreaksModal"



class ByWeekly extends React.Component {
    state = {
        collapse: false,
        status: "Opened",
        ModalOpenBreaks:false,
      }
    
      toggleModalPreview = () => {
        this.setState(prevState => ({
          ModalOpenBreaks: !prevState.ModalOpenBreaks
          }))
      }
    
      toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }))
      }
     
      onEntered = () => {
        this.setState({ status: "Opened" })
      }

      onEntering = () => {
        this.setState({ status: "Opening..." })
      }
    
    
      onExited = () => {
        this.setState({ status: "Closed" })
      }
    
      onExiting = () => {
        this.setState({ status: "Closing..." })
      }
    
     
    
    
    
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (<Container>
          
          <Row>
    <Col lg="2" md="2" sm="12">
      <Clock size={20}></Clock>
    </Col>
    <Col lg="3" md="3" sm="12">
     
    </Col>
    <Col lg="5" md="5" sm="12">
     
    </Col>
    <Col lg="2" md="2" sm="12">
    <Edit2 size ={20} onClick={this.toggleModalPreview}></Edit2>
    <AddBreaksModal toggleModalPreview={this.toggleModalPreview} ModalOpenPreview={this.state.ModalOpenBreaks}></AddBreaksModal>
    </Col>
  </Row>

  <Row>
    <Col lg="2" md="2" sm="12">
      
    </Col>
    <Col lg="3" md="3" sm="12">
    Monday

    </Col>
    <Col lg="5" className={"text-primary"} onClick={this.toggle} md="5" sm="12">
    
    Working Hours : 08:00:00s - 17:00:00
    {this.state.collapse?<hr/>:<></>}
              <Collapse
                isOpen={this.state.collapse}
                onExited={this.onExited}
                onEntered={this.onEntered}
                onExiting={this.onExiting}
                onEntering={this.onEntering}
              >
               
                 <h5>Breaks</h5>
                 <p className={"text-success"}>No Breaks</p>
                  
                
              </Collapse>
            


   
    </Col>
    <Col lg="2" md="2" sm="12">
   
    </Col>
  </Row>

  
           
            
            </Container>);
    }
}

export default ByWeekly;