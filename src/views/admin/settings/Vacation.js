import React from "react"
import {
    CardHeader,
    CardTitle,
    CardBody,
  Card,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Col,
  FormGroup,
  Label,
  Row,
  Container,
  
} from "reactstrap"
import { AgGridReact } from "ag-grid-react"
import { ChevronDown } from "react-feather"
import axios from "axios"
import { Trash2, Edit } from "react-feather"
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import {  Field } from "formik";
import "../../../../src/assets/scss/plugins/tables/_agGridStyleOverride.scss"


class Vacation extends React.Component {
  
    
  state = {
    vacationName:"",
    couponType : [  { value: "%", label: "Percentage" },
  { value: "flat", label: "Flat" },],
    rowData: [ {
      id: 1,
      startDate: "11/06/2020",
      endDate: "11/06/2020",
      vacationName:"Eid"
    
    }, ],
    basicPicker : new Date(),
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true
    },
    columnDefs: [
        {
            headerName: "Vacation Name",
            field: "vacationName",
            filter: true,
           
           
          },
      {
        headerName: "ID",
        field: "id",
        hide: true,
        filter: true,
     
      },
      {
        headerName: "Start Date",
        field: "startDate",
        filter: true,
      
      },
      {
        headerName: "End Date",
        field: "endDate",
        filter: true,
       
       
      }, 
     
      {
        headerName: "Actions",
        field: "transactions",
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="actions cursor-pointer">
              <Edit
                className="mr-50"
                size={15}
              //  onClick={()=>this.props.onEditClick(this.gridApi.getSelectedRows())}
              />
            
            </div>
          )
        }
      }
    
    ]
  }
   handleChange = e => {
   
     const { name, value } = e.target;
    this.setState({name:value});

 };
  componentDidMount() {
    
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages()
    })
  }

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        currenPageSize: val,
        getPageSize: val
      })
    }
  }

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state
    return (
    
       
              

        
        <Card>  
            <br/>
             <Container>
            
  <Row> <Col lg="4"> <h3> Vacation / Holiday</h3></Col>
    <Col>   
    <FormGroup className="mb-0">
                   
                    <Flatpickr
              className="form-control"
             
              options={{ 
                mode: "range",
                defaultDate: ["2020-02-01", "2020-02-15"]
               }}
              value={this.state.basicPicker}
              onChange={date => {
                this.setState({ basicPicker : date });
              }}
            /></FormGroup>
             <Label for="role">Date Range</Label>
             </Col>
             <Col>   
    <FormGroup className="mb-0">
    <Input type="text" id="vacationName" name="vacationName" value={this.state.vacationName}  onChange={this.handleChange}/>
</FormGroup>
             <Label for="role">Vacation Name</Label>
             </Col>
    <Col md="auto"> <Button.Ripple outline color="primary">Add day off</Button.Ripple></Col>
    
  </Row>
  
</Container>
 
       
      
      
          
        
          <hr/> 
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-2 ag-grid-table">

                
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mb-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown">
                      <DropdownToggle tag="div">
                        {this.gridApi
                          ? this.state.currenPageSize
                          : "" * this.state.getPageSize -
                            (this.state.getPageSize - 1)}{" "}
                        -{" "}
                        {this.state.rowData.length -
                          this.state.currenPageSize * this.state.getPageSize >
                        0
                          ? this.state.currenPageSize * this.state.getPageSize
                          : this.state.rowData.length}{" "}
                        of {this.state.rowData.length}
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(134)}
                        >
                          134
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder="search by code..."
                        onChange={e => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>
                  
                  </div>
                
                </div>
               
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      animateRows={true}
                      pagination={true}
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                    />
                 
              </div>
            )}
          </CardBody>
        </Card>
      
    
    )
  }
}
export default Vacation
