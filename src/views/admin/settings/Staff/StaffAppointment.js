
import {
  
  Input,
  
} from "reactstrap";
import classnames from "classnames";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { connect } from "react-redux";
import {
  getStaffBookingHistory,
} from "../../../../actions/bookingHistoryAction";
import Loader from "../../../../components/Loader/Loader";

import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


function StaffAppointment(props) {
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
   filter:{client_email:"",client:"",event:"",booking_time:"",status:"A"}
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
      headerName: "Client first name",
      field: "client_first_name",
      filter: false,
    },
    {
      headerName: "Client last name",
      field: "client_last_name",
      filter: false,
    },
    {
      headerName: "Client email",
      field: "client_email",
      filter: false,
    },
    {
      headerName: "Event Type",
      field: "event_name",
      filter: false,
    },
    {
      headerName: "Time",
      field: "time",
      filter: false,
    },
    {
      headerName: "Status",
      field: "booking_status",
      filter: false,
     
    },
    {
      headerName: "Amount",
      field: "booking_total_amount",
      filter: false,
    },
    {
      headerName: "Commission",
      field: "commission",
      filter: false,
    },
    
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
      
      const response = await getStaffBookingHistory(filter);
      const data = response;
      return data;
    };

    return dataSource;
  };

    const getRowNodeId = (row) => {
      return row.id.toString();
    };

  /*
  useEffect(() => {
    if (gridApi) {
      
    props.getBookingHistory(filter);
      
      const dataSource = {
        getRows: (params) => {

           
          setPara(params)
          // Use startRow and endRow for sending pagination to Backend
          // params.startRow : Start Page
          // params.endRow : End Page
          const page = params.endRow / filter.pageSize;
       //   setFilter({...filter,pageNumber:page})
          props.getBookingHistory({...filter,pageNumber:page});
        

        }
      }

      gridApi.setDatasource(dataSource);
    
    }
    
  }, [gridApi,filter.pageSize,filter.pageNumber]);
*/

  const avatarFormatter = ({ value }) => {
    return <img src={value} width="50px" height="50px" />
  }


  return (
    <div class="eventdetailsaddbox rd_noshadow rd_noboxheader">
      
      <Loader isShowLoader={loader}></Loader>
    
      <div class="rd_vacationfilterpart rd_vacationfilterpart3">
                <div class="rd_crmpatopthcon">
                <div class="rd_profilerd_erpart">
               
                    <div class="rd_vacationflex2">
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
                            <p>Client</p>
                            <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.client} name="client" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by Client"/>
          
                            </div>
                    </div>
                    <div class="rd_vacationflex2">
                          <p>Client Email</p>
                          <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.client_email} name="client_email" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by email"/>
          
                            </div>  
                      </div>

                      <div class="rd_vacationflex2">
                          <p>Event</p>
                          <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.event} name="event" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by event"/>
          
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

                      <div class="rd_vacationflex2">
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
       <div class="rd_inputbookstaf2">
         
       <div style={{display:'none'}} class="rd_inputbookstaf rd_inputbookstafm">
                  <div class="rd_profilethingco">
                      <div class="input-group">
                          <Input 
                          type="text"
                          type="select"
                          class="form-control noshadfoc" 
                          id="inlineFormInputGroupUsername" placeholder="50-0 To 0"
                          onChange={filterSize}
                          >
                           <option value="5" >5</option>
                          <option value="10" >10</option>
                          <option value="20" >20</option>
                          <option value="30" >30</option>

                          <div class="input-group-prepend rd_dropdownbtn">
                              <button class="input-group-text"></button>
                            </div>
                            </Input>
                            </div>
                        </div>
                        </div>
                        {/*
                    <div class="rd_inputbookstaf rd_inputbookstafm">
                      <div class="rd_profilethingco">
                          <div class="input-group">
                              <input type="text" class="form-control noshadfoc" 
                              id="inlineFormInputGroupUsername" placeholder="Search Invitee"
                              onChange={(e) => this.updateSearchQuery(e.target.value)}
                              value={this.state.searchVal}/>
                              <div class="input-group-prepend rd_dropdownbtn">
                                  <button class="input-group-text"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                        */}
              </div>
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

export default connect(mapStateToProps, actionMethods)(StaffAppointment);