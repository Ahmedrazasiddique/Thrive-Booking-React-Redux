import React from "react";
import {
  Card,
  CardBody,
  Input,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { ChevronDown } from "react-feather";
import { Trash2, Edit } from "react-feather";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import { connect } from "react-redux";
import {
  getMyPromoCodeList,
  deletePromoCode,
} from "../../../../actions/promoCodeActions";
import Loader from "../../../../../src/components/Loader/Loader";
class PromoCodeList extends React.Component {
  state = {
    isShowLoader: false,
    couponType: [
      { value: "%", label: "Percentage" },
      { value: "flat", label: "Flat" },
    ],
    rowData: [],
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
        editable: false,
        filter: true,
      },
      {
        headerName: "Code",
        field: "coupon_code",
        editable: false,
        filter: true,
      },
      {
        headerName: "Type",
        field: "coupon_type",
        editable: false,
        filter: true,
      },
      {
        headerName: "Limit",
        field: "coupon_limit",
        editable: false,
        filter: true,
      },
     
      {
        headerName: "Expires",
        field: "coupon_expiry",
        editable: false,
        filter: true,
        width: 140,
      },
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

                  this.props.deletePromoCode(selectedData[0].id);
                  this.setState({ isShowLoader: true });
                  //  this.gridApi.updateRowData({ remove: selectedData })
                }}
              />
            </div>
          );
        },
      },
    ],
    filter: {
      pageSize: 30,
      pageNumber: 1,
      filter: {
        coupon_code: "",
      },
      sortField: "id",
      sortOrder: "asc",
    },
  };

  componentDidMount() {
    const { getMyPromoCodeList } = this.props;
    getMyPromoCodeList(this.state.filter);
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.PromoCodeSuccess) {
        this.setState({ rowData: this.props.PromoCodeData });
        this.setState({ isShowLoader: false });
        let value = { "pageSize": this.props.TotalCount };
        value = {
          ...this.state.filter,
          ...value,
        };
        this.setState({filter:value});
      }
      
    }
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: 10,
    });
  };

  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });

      let value = { "pageSize": val };
    value = {
      ...this.state.filter,
      ...value,
    };
    this.setState({
      filter: {
        // object that we want to update
        ...this.state.filter, // keep all other key-value pairs
        ...value, // update the value of specific key
      },
    });
    this.setState({ isShowLoader: true });
      this.props.getMyPromoCodeList(value)
    }
  };

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <Row>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <Col sm="12">
          <Card className="overflow-hidden agGrid-card">
            <CardBody className="py-0">
              <Row>
                <Col sm="0">
                  {/*
                    <FormGroup className="mb-0">
                      <Label for="role">Type</Label>
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
                      */}
                </Col>
                <Col sm="0">
                  {/*
                    <FormGroup className="mb-0">
                      <Label for="role">Limit</Label>
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
                  <Col sm="2">
                    <FormGroup className="mb-0">
                    <Label for="role">Expires</Label>
                      <Input
                        placeholder="search by date..."
                        onChange={e => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </FormGroup>
                     */}
                </Col>
                <Col sm="2">
                  <FormGroup className="mb-0">
                    <Label for="role">Code</Label>
                    <Input
                      placeholder="search..."
                      onChange={(e) => this.updateSearchQuery(e.target.value)}
                      value={this.state.value}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <hr />
        </Col>

        <Col sm="12">
          <Card className="overflow-hidden agGrid-card">
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

                    <div className="d-flex flex-wrap justify-content-between mb-1"></div>
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
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PromoCodeData: state.promoCode.entity,
    TotalCount: state.promoCode.totalCount,
    PromoCodeSuccess: state.promoCode.PromoCodeSuccess,
  };
};

const actionMethods = {
  getMyPromoCodeList: getMyPromoCodeList,
  deletePromoCode: deletePromoCode,
};

export default connect(mapStateToProps, actionMethods)(PromoCodeList);
