import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Spinner,
  Button
} from "reactstrap"
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"
import {
  Edit,
  Trash2,
  ChevronDown,
  Clipboard,
  Printer,
  Download,
  RotateCw,
  X
} from "react-feather"
import classnames from "classnames"
import "../../../../../../src/assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../../../../src/assets/scss/pages/users.scss"

class ClientPayment extends React.Component {
  state = {
    ModalOpenBreaks:false,
    rowData: [{
      id: 313,
      clientName: "zoetic150",
      paymentMethod: "danae@demeter.com",
      transactionID: "123214",
      paymentDate: "2020-06-29",
      amount: "dallas",
      freqDiscount: "Once - $0.00",
      discount: "Once - $0.00",
      tax: "Once - $0.00",
      netTotal: "Once - $0.00",
      partialAmount: "Once - $0.00",
      recurrence: "Once - $0.00",
      status:"Pending"  
    
     
    },],
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    defaultColDef: {
      sortable: true
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "ID",
        field: "id",
       hide:true,
        filter: true,
     
      },
      {
        headerName: "Client Name",
        field: "clientName",
        filter: true,
        width: 250,
        cellRendererFramework: params => {
          return (
 
		<Link
      		to={"/admin/settings/staff/directory-information/view/"+	params.data.id}
          className="d-flex align-items-center cursor-pointer"
    	>
	{	params.data.name}
    	</Link>
          
          )
        }
      }, {
        headerName: "Payment Method",
        field: "paymentMethod",
        filter: true,
      
      },
      {
        headerName: "Transaction ID",
        field: "transactionID",
        filter: true,
      
      },
      {
        headerName: "Payment Date",
        field: "paymentDate",
        filter: true,
      
      },
      {
        headerName: "Amount",
        field: "amount",
        filter: true,
       
       
      },
      {
        headerName: "Freq-Discount",
        field: "freqDiscount",
        filter: true,
       
      },
      {
        headerName: "Discount",
        field: "discount",
        filter: true,
      
      }, {
        headerName: "Tax",
        field: "tax",
        filter: true,
     
      },{
        headerName: "Net Total",
        field: "netTotal",
        filter: true,
     
      },{
        headerName: "Partial Amount",
        field: "partialAmount",
        filter: true,
     
      },{
        headerName: "Recurrence",
        field: "recurrence",
        filter: true,
     
      },{
        headerName: "Status",
        field: "status",
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
                onClick={()=>this.props.onEditClick(this.gridApi.getSelectedRows())}
              />
              <Trash2
                size={15}
                onClick={() => {
                  let selectedData = this.gridApi.getSelectedRows()
                  this.gridApi.updateRowData({ remove: selectedData })
                }}
              />
            </div>
          )
        }
      }
    
    ]
  }
  toggleModalPreview = () => {
    this.setState(prevState => ({
      ModalOpenBreaks: !prevState.ModalOpenBreaks
      }))
  }


  async componentDidMount() {
    
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column)
    var modelObj = null
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val
      }
    }
    filter.setModel(modelObj)
    this.gridApi.onFilterChanged()
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        pageSize: val
      })
    }
  }
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }

  refreshCard = () => {
    this.setState({ reload: true })
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All"
      })
    }, 500)
  }

  toggleCollapse = () => {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onEntering = () => {
    this.setState({ status: "Opening..." })
  }

  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onExiting = () => {
    this.setState({ status: "Closing..." })
  }
  onExited = () => {
    this.setState({ status: "Closed" })
  }
  removeCard = () => {
    this.setState({ isVisible: false })
  }

  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state
    return (
      <Row className="app-user-list">
       
        <Col sm="12">
          <Card
            className={classnames("card-action card-reload", {
              "d-none": this.state.isVisible === false,
              "card-collapsed": this.state.status === "Closed",
              closing: this.state.status === "Closing...",
              opening: this.state.status === "Opening...",
              refreshing: this.state.reload
            })}
          >
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <div className="actions">
                <ChevronDown
                  className="collapse-icon mr-50"
                  size={15}
                  onClick={this.toggleCollapse}
                />
                <RotateCw
                  className="mr-50"
                  size={15}
                  onClick={() => {
                    this.refreshCard()
                    this.gridApi.setFilterModel(null)
                  }}
                />
                <X size={15} onClick={this.removeCard} />
              </div>
            </CardHeader>
            <Collapse
              isOpen={this.state.collapse}
              onExited={this.onExited}
              onEntered={this.onEntered}
              onExiting={this.onExiting}
              onEntering={this.onEntering}
            >
              <CardBody>
                {this.state.reload ? (
                  <Spinner color="primary" className="reload-spinner" />
                ) : (
                  ""
                )}
                <Row>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="role">Client Name</Label>
                      <Input
                        type="select"
                        name="role"
                        id="role"
                        value={this.state.role}
                        onChange={e => {
                          this.setState(
                            {
                              role: e.target.value
                            },
                            () =>
                              this.filterData(
                                "role",
                                this.state.role.toLowerCase()
                              )
                          )
                        }}
                      >
                        <option value="All">All</option>
                        <option value="User">User</option>
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="status">Status</Label>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        value={this.state.selectStatus}
                        onChange={e => {
                          this.setState(
                            {
                              selectStatus: e.target.value
                            },
                            () =>
                              this.filterData(
                                "status",
                                this.state.selectStatus.toLowerCase()
                              )
                          )
                        }}
                      >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Deactivated">Deactivated</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                    <Label for="department">Transaction #</Label>
                    <Input
                        placeholder="search by phone #..."
                        onChange={e => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="department">Date</Label>
                      <Input
                        placeholder="search by date #..."
                        onChange={e => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
        </Col>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                    <UncontrolledDropdown className="ag-dropdown p-1">
                      <DropdownToggle tag="div">
                        1 - {pageSize} of 150
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
                          onClick={() => this.filterSize(150)}
                        >
                          150
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="filter-actions d-flex">
                  <Input
                        placeholder="search by all #..."
                        onChange={e => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                
                  </div>
                </div>
                {this.state.rowData !== null ? (
                 
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                       
                      />
                    
                
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default ClientPayment
