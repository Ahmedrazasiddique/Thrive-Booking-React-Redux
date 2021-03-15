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
  FormGroup,
  Label,
  Row,
  Container,
  Form,
} from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { ChevronDown } from "react-feather";
import { Edit ,Trash2} from "react-feather";
import Flatpickr from "react-flatpickr";
import "../../../../src/assets/scss/plugins/tables/_agGridStyleOverride.scss";
import { connect } from "react-redux";
import {
  getMyVacation,
  updateMyVacation,
  deleteVacation
} from "../../../actions/vacationsAction";
import Loader from "../../../../src/components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import {
  getAdminBusinessId,
  getLoggedInUserId,
} from "../../../utils/authHelper";

class Vacation extends React.Component {
  constructor(props) {
    super(props);

    this.onEditClick = this.onEditClick.bind(this);
  }
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
        editable: false,
        headerName: "Vacation Name",
        field: "vacation_name",
        filter: true,
      },
      {
        editable: false,
        headerName: "ID",
        field: "id",
        hide: true,
        filter: true,
      },
      {
        editable: false,
        headerName: "Start Date",
        field: "start_date",
        filter: true,
      },
      {
        editable: false,
        headerName: "End Date",
        field: "end_date",
        filter: true,
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
                onClick={() => this.onEditClick(this.gridApi.getSelectedRows())}
              />
              <Trash2
                size={15}
                onClick={() => {
                  let selectedData = this.gridApi.getSelectedRows();
                  this.props.deleteVacation(selectedData[0].id);
                  this.setState({ isShowLoader: true });
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
      sortField: "id",
      sortOrder: "asc",
    },
  };

  componentDidMount() {
    const { getMyVacation } = this.props;

    getMyVacation(this.state.filter);
    this.setState({ isShowLoader: true });
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.VacationSuccess) {
        this.setState({ isShowLoader: false });
        this.setState({ rowData: this.props.VacationData.entity });
        let value = { "pageSize": this.props.VacationData.totalCount };
        value = {
          ...this.state.filter,
          ...value,
        };
        this.setState({filter:value});
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onEditClick(row) {
    this.setState({
      basicPicker: (row[0].start_date + " to " + row[0].end_date).replace(
        "/",
        "-"
      ),
    });
    this.setState({ vacation_name: row[0].vacation_name });
    this.setState({ id: row[0].id });
  }
  resetForm = (e) => {
    e.preventDefault();
    this.setState({ id: 0 });
    this.setState({ vacation_name: "" });
    this.setState({basicPicker:""})
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.stopEditing();
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
      this.props.getMyVacation(value)
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isShowLoader: true });
    const formData = new FormData(event.target);
    formData.append("business_id", getAdminBusinessId());
    formData.append("provider_id", getLoggedInUserId());

    for (let [key, value] of formData.entries()) {
      if (key === "date_range") {
        formData.append("start_date", value.split("to")[0]);
        formData.append("end_date", value.split("to")[1]);
      }
      formData.delete("date_range");
      console.log(key, value);
      //formObject[key]=value
    }

    if (this.state.id !== 0) {
      formData.append("id", this.state.id);
    }

    // formObject.guest_user_checkout_status=this.state.guestUserCheckOut?"E":"D"
    if (this.state.basicPicker.length !== 1) {
      this.props.updateMyVacation(formData);
    } else {
      this.setState({ isShowLoader: false });
      toast.error("date range is required");
    }
  };

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <Card>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <br />
        <Container>
          <Row>
            {" "}
            <Col lg="4">
              {" "}
              <h3> Vacation / Holiday</h3>
            </Col>
            <Form onSubmit={this.handleSubmit} className="row">
              <Col>
                <Flatpickr
                  required
                  className="form-control"
                  name="date_range"
                  options={{
                    mode: "range",
                    defaultDate: ["2020-02-01", "2020-02-15"],
                  }}
                  value={this.state.basicPicker}
                  onChange={(date) => {
                    this.setState({ basicPicker: date });
                  }}
                />
                <Label for="role">Date Range</Label>
              </Col>
              <Col>
                <FormGroup className="mb-0">
                  <Input
                    type="text"
                    required
                    name="vacation_name"
                    value={this.state.vacation_name}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Label for="role">Vacation Name</Label>
              </Col>
              <Col md="auto">
                <Button.Ripple outline color="primary">
                  {this.state.id !== 0 ? "Update" : "Add day off"}
                </Button.Ripple>
                {this.state.id !== 0 ? (
                  <Button.Ripple
                    onClick={this.resetForm}
                    outline
                    color="yellow"
                  >
                    Reset
                  </Button.Ripple>
                ) : (
                  <></>
                )}
              </Col>
            </Form>
          </Row>
        </Container>

        <hr />
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
                      placeholder="search..."
                      onChange={(e) => this.updateSearchQuery(e.target.value)}
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

          <ToastContainer />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    VacationData: state.vacation.data,
    VacationSuccess: state.vacation.VacationSuccess,
    IsDataSubmitedSuccessfullyVacation:
      state.vacation.IsDataSubmitedSuccessfullyVacation,
    IsError: state.vacation.IsError,
  };
};

const actionMethods = {
  getMyVacation: getMyVacation,
  updateMyVacation: updateMyVacation,
  deleteVacation:deleteVacation
};

export default connect(mapStateToProps, actionMethods)(Vacation);
