import React from "react";
import {
  CardBody,
  Card,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Col,
  CardHeader,
  Row,
  CardTitle,
  FormGroup,
  Label,
  Collapse,
  Spinner
} from "reactstrap";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ChevronDown, RotateCw, X } from "react-feather";
import classnames from "classnames";
import "../../../../../src/assets/scss/plugins/tables/_agGridStyleOverride.scss";
import { connect } from "react-redux";
import {
  getDirectoryInformation,
} from "../../../../actions/directoryInformationAction";
import Loader from "../../../../../src/components/Loader/Loader";

class DirectoryInformation extends React.Component {
  state = {
    id: 0,
    vacation_name: "",
    couponType: [
      { value: "%", label: "Percentage" },
      { value: "flat", label: "Flat" },
    ],
    rowData: [],
    basicPicker: "2020-02-06 to 2020-02-07",
    paginationPageSize: 10,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "ID",
        field: "id",
        hide: true,
        filter: true,
      },
      {
        headerName: "UserName",
        field: "email",
        filter: true,
        width: 250,
        cellRendererFramework: (params) => {
          
          return (
            <Link
              to={
                "/admin/settings/staff/directory-information/view/" +
                params.data.id
              }
              className="d-flex align-items-center cursor-pointer"
            >
              {params.data.first_name +' '+params.data.last_name}
            </Link>
          );
        },
      },
      {
        headerName: "First Name",
        field: "first_name",
        filter: true,
      },
      {
        headerName: "Last Name",
        field: "last_name",
        filter: true,
      },
      {
        headerName: "Email",
        field: "email",
        filter: true,
      }, {
        headerName: "Event Assigned",
        field: "event_assigned",
        filter: true,
      },
      {
        headerName: "Phone #",
        field: "phone",
        filter: true,
        width: 100,
      },
      {
        headerName: "City",
        field: "city",
        filter: true,
      },
      
     
      {
        headerName: "Country",
        field: "country",
        filter: true,
      },
     
    
      
/*
      {
        headerName: "Actions",
        field: "transactions",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              <Edit
                className="mr-50"
                size={15}
                onClick={() =>
                  this.props.onEditClick(this.gridApi.getSelectedRows())
                }
              />
              <Trash2
                size={15}
                onClick={() => {
                  let selectedData = this.gridApi.getSelectedRows();
                  this.gridApi.updateRowData({ remove: selectedData });
                }}
              />
            </div>
          );
        },
      },
      */
    ],
    filter: {
      pageSize: 10,
      pageNumber: 1,
      sortField: "id",
      sortOrder: "asc",
    },
  };

  componentDidMount() {
    const { getDirectoryInformation } = this.props;

    getDirectoryInformation(this.state.filter);
    this.setState({ isShowLoader: true });
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.DirectoryInformationSuccess) {
       this.setState({ isShowLoader: false });
       this.setState({ rowData: this.props.DInfoData.entity });
      }
    }
  }



  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column);
    var modelObj = null;
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val,
      };
    }
    filter.setModel(modelObj);
    this.gridApi.onFilterChanged();
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        pageSize: val,
      });
    }
  };
  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
    this.setState({
      searchVal: val,
    });
  };

  refreshCard = () => {
    this.setState({ reload: true });
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All",
      });
    }, 500);
  };

  toggleCollapse = () => {
    this.setState((state) => ({ collapse: !state.collapse }));
  };
  onEntered = () => {
    this.setState({ status: "Opened" });
  };
  onEntering = () => {
    this.setState({ status: "Opening..." });
  };

  onEntered = () => {
    this.setState({ status: "Opened" });
  };
  onExiting = () => {
    this.setState({ status: "Closing..." });
  };
  onExited = () => {
    this.setState({ status: "Closed" });
  };
  removeCard = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state;
    return (
      <Row className="app-user-list">
        {
        <Col sm="12">
          <Card
            className={classnames("card-action card-reload", {
              "d-none": this.state.isVisible === false,
              "card-collapsed": this.state.status === "Closed",
              closing: this.state.status === "Closing...",
              opening: this.state.status === "Opening...",
              refreshing: this.state.reload,
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
                    this.refreshCard();
                    this.gridApi.setFilterModel(null);
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
                      <Label for="department">Name</Label>
                      <Input
                        placeholder="search by name #..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                  <FormGroup className="mb-0">
                      <Label for="department">Event</Label>
                      <Input
                        placeholder="search by event #..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="department">Email</Label>
                      <Input
                        placeholder="search by email #..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="department">Phone #</Label>
                      <Input
                        placeholder="search by phone #..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
        </Col>
                      }
      <Col sm="12">
      <Loader isShowLoader={this.state.isShowLoader}></Loader>
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
                  <Link
              to={
                "/admin/settings/staff/directory-information/edit/0" 
              }
              className="mr-1" color="primary"
            >
             Add New
            </Link>
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    DInfoData: state.directoryinformation.data,
    DirectoryInformationSuccess: state.directoryinformation.DirectoryInformationSuccess,
    IsDataSubmitedSuccessfullyVacation:
      state.directoryinformation.IsDataSubmitedSuccessfullyVacation,
    IsError: state.directoryinformation.IsError,
  };
};

const actionMethods = {
  getDirectoryInformation: getDirectoryInformation
};

export default connect(mapStateToProps, actionMethods)(DirectoryInformation);
