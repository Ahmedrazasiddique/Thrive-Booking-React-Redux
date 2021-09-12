
import {
  
  Input,
 
} from "reactstrap";
import classnames from "classnames";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import { connect } from "react-redux";
import {
  getMyPromoCodeList,
  deletePromoCode,
  getMyPromoCodeListForGrid
} from "../../../../actions/promoCodeActions";
import Loader from "../../../../components/Loader/Loader";

import { Trash2, Edit } from "react-feather";
import React, { useEffect, useState ,useRef} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getAdminBusinessId } from "../../../../utils/authHelper";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function PromoCodeList (props) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [para, setPara] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [loader, setLoader] = useState(false);
  const [previousGrid, setPreviousGrid] = useState(null);
  
  
  const prevGP = usePrevious(gridApi)

  const [filter, setFilter] = useState({
    pageSize: 10,
    pageNumber: 1,
    sortField: "id",
    sortOrder: "asc",
    business_id:getAdminBusinessId(),
   filter:{coupon_code:""}
  });
  const [columnDefs, setColumnDefs] = useState([
   
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
        field: "coupon_payout_type",
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
                onClick={() =>{
                   
                  props.onEditClick(params.data)
                }
                }
              />
              <Trash2
                size={15}
                onClick={() => {
                 // let selectedData = gridApi.getSelectedRows();

                  props.deletePromoCode(params.data.id);
                //  this.setState({ isShowLoader: true });
                  //  this.gridApi.updateRowData({ remove: selectedData })
                }}
              />
            </div>
          );
        },
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

    
    useEffect(() => {

    },[gridApi]);

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
      
      const response = await getMyPromoCodeListForGrid(filter);
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
                            <p>Coupon Code</p>
                            <div class="rd_profilethingco">
                              <input type="text" value = {filter.filter.coupon_code} name="coupon_code" id="" class="rd_adddayofinput" 
                               onChange={onChange}
                              // onChange={(e) => this.updateSearchQuery(e.target.value)}
                             //  value={this.state.value}
                              
                              placeholder="Search by coupon code"/>
          
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
