import classnames from "classnames";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import { connect } from "react-redux";
import {
  getAdminReferrals,
} from "../../../../actions/adminRefferalActions";
import Loader from "../../../../components/Loader/Loader";
import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import {
  
  Input,
  
} from "reactstrap";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  
  function AdminRefferalList(props) {

    const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [para, setPara] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [loader, setLoader] = useState(false);
  
  const [filter, setFilter] = useState({
    pageSize: 10,
    pageNumber: 1,
    sortField: "id",
    sortOrder: "asc",
   filter:{}
  });
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "ID",
      field: "id",
      hide: true,
      filter: false,
    },
    /*{
      headerName: "Staff Name",
      field: "staffName",
      filter: false,
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
            {params.data.name}
          </Link>
        );
      },
    */  
    {
      headerName: "Referral Type",
      field: "referral_type",
      filter: false,
    },
    {
      headerName: "Name",
      field: "name",
      filter: false,
    },
    {
      headerName: "Email",
      field: "email",
      filter: false,
    },
    {
      headerName: "Invite Name",
      field: "invite_name",
      filter: false,
    },
    {
      headerName: "Invite Email",
      field: "invite_email",
      filter: false,
     
    },
    {
      headerName: "Sent On",
      field: "sent_on",
      filter: false,
    },
    {
      headerName: "Status",
      field: "status",
      filter: false,
    },
    {
    headerName: "Earn",
    field: "earn",
    filter: false,
  }
  
  ]);

  const perPage = 3;
  const setPageNumberToOne = (name,value) => setFilter({...filter, pageNumber:1});
  const setFilterNew = (name,value) => setFilter({...filter
    
    ,filter:{...filter.filter,[name]:value}
  
  }
    
    );
  

    useEffect(() => {

    },[loader]);

 const filterSize = (val) => {
  //setIsOtherEventCalled(0)
  //setPageNumberToOne(parseInt(val.target.value))
  //props.getBookingHistory(filter);
 }

 const onChange = (val) => {
  //setIsOtherEventCalled(0)
  //setPageNumberToOne(val.target.name,val.target.value)
  setFilterNew(val.target.name,val.target.value)
  updateDataSource ()
  //props.getBookingHistory(filter);
 }


  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const updateDataSource = () => {
    
    let currentPage = 0;

    const dataSource = {
      getRows: (params) => {
        currentPage = params.endRow / 10;
        let sortModel = params.sortModel[0];
        let filterModel = params.filterModel;
       //
        const data = fetchData(currentPage, sortModel, filterModel);
        data.then((res) => {
          
      //    let totalRows = Number(res.headers["x-total-count"]);
          params.successCallback(res.data.entity, res.data.totalCount);
        });
      }
    };

    const fetchData = async (actualPage, sortModel, filterModel) => {
      let sortForUrl = "";
      if (sortModel) {
        sortForUrl = `&_sort=${sortModel.colId}&_order=${sortModel.sort}`;
      }

      /*
      let filterForUrl = "";
      if (Object.keys(filterModel).length > 0) {
        // check if the filter object is not empty
        let filterName = Object.keys(filterModel)[0];
        let filterValue = filterModel[filterName].filter;
        filterForUrl = `&${filterName}_like=${filterValue}`;
      }
      */
      
      const response = await getAdminReferrals(filter);
      const data = response;
      return data;
    };

    return dataSource;
  };

    const getRowNodeId = (row) => {
      return row.id.toString();
    };
    
    return (
        <div class="eventdetailsaddbox rd_noshadow rd_noboxheader" >
  <div  class="rd_vacationfilterpart rd_vacationfilterpart3">
                <div class="rd_crmpatopthcon">
                <div class="rd_profilerd_erpart">
               
                    <div style={{display:'none'}} class="rd_vacationflex2">
                          <p>Status</p>
                          <div class="rd_profilethingco">
                              <div class="input-group">
                                  <Input type="text" class="form-control noshadfoc" 
                                 type="select"
                                 name="status"
                                 id="status"
                                 onChange={onChange}
                                 /*
                                 value={this.state.selectStatus}
                                 onChange={(e) => {
                                   this.setState(
                                     {
                                       selectStatus: e.target.value,
                                     },
                                     () =>
                                       this.filterData(
                                         "status",
                                         this.state.selectStatus.toLowerCase()
                                       )
                                   );
                                 }}
                                 */
                                >
                                <option value="A">Active</option>
                                <option value="C">Confirm</option>
                                <option value="R">Reject</option>
                                <option value="CC">Cancel by Client</option>
                                <option value="CS">Cancel by service provider</option>
                                <option value="CO">Completed</option>
                                <option value="MN">MARK AS NOSHOW</option>
                                  <div class="input-group-prepend rd_dropdownbtn">
                                      <button class="input-group-text"></button>
                                    </div>
                                </Input>
                            </div>
                      
                    
                    </div>
                    </div>
                    <div class="rd_vacationflex2">
                            <p>Name</p>
                            <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.name} name="name" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by Name"/>
          
                            </div>
                    </div>
                    <div class="rd_vacationflex2">
                          <p>Email</p>
                          <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.email} name="email" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by email"/>
          
                            </div>  
                      </div>

                      <div class="rd_vacationflex2">
                          <p>Invite Email</p>
                          <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.invite_email} name="invite_email" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by invite email"/>
          
                            </div>  
                      </div>

                      <div class="rd_vacationflex2">
                          <p>Sent On</p>
                          <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.sent_on} name="sent_on" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by sent on"/>
          
                            </div>  
                      </div>

                      <div style={{display:'none'}} class="rd_vacationflex2">
                          <p>Customer</p>
                          <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.customer} name="customer" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by customer"/>
          
                            </div>  
                      </div>

                      <div style={{display:'none'}} class="rd_vacationflex2">
                          <p>Booking Date</p>
                          <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.booking_date} name="booking_date" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by booking date"/>
          
                            </div>  
                      </div>

                      <div style={{display:'none'}} class="rd_vacationflex2">
                          <p>Booking Time</p>
                          <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.booking_time} name="booking_time" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by booking time"/>
          
                            </div>  
                      </div>
              
              
            
      </div>
      </div>
       </div>
        <div class="rd_vacationfilterpart rd_vacationfilterpart3">

          <div class="rd_inputbookstaf">
              <div class="rd_profilethingco">
                  <div class="input-group">
                      <input type="text"
                      onChange={onChange}
                      class="form-control noshadfoc" value = {filter.filter.invite_name} name="invite_name"
                       placeholder="Search Invitee"/>
                      <div class="input-group-prepend rd_dropdownbtn">
                          <button class="input-group-text"></button>
                        </div>
                    </div>
                </div>
          </div>


          <div class="rd_referconfle">
              <div>
                  <h4>Earn more Free months</h4>
                  <p>You can earn more Free moths by referring your friends to MeetOcto</p>
              </div>
              <button class="rd_oranbuthth">
                  Invite Friend
              </button>
          </div>



          <div class="rd_remplate_parttable">
          <div className="ag-theme-material ag-grid-table">
           
           <AgGridReact
            columnDefs={columnDefs}
      onGridReady={onGridReady}
      rowModelType={"infinite"}
      datasource={updateDataSource()}
      getRowNodeId={getRowNodeId}
      cacheBlockSize={10}
      rowBuffer={0}
      paginationPageSize={10}
      cacheOverflowSize={2}
      maxConcurrentDatasourceRequests={1}
      maxBlocksInCache={10}
      infiniteInitialRowCount={10}
      pagination={true}
      paginationAutoPageSize={false}
    ></AgGridReact>
        </div>
            </div>






      </div>
      </div>
    );
  }
  const mapStateToProps = (state) => {
    return {
      BookingHistoryData: state.bookingHistory.data,
      BookingHistorySuccess: state.bookingHistory.BookingHistorySuccess,
      IsError: state.bookingHistory.IsError,
    };
  };
  
  const actionMethods = {
   // getBookingHistory: getBookingHistory,
  
  };
  
  export default connect(mapStateToProps, actionMethods)(AdminRefferalList);