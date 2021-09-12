import * as actionType from "../constants/superadmindashboard";

const initialState = {
  SuperAdminDashboardStart: false,
  SuperAdminDashboardSuccess: false,
  SuperAdminDashboardFailed: false,
  SuperAdminDashboardError: "",
  SuperAdminDashboardData: {},
  SuperAdminDashboardEnd: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SuperAdminDashboard_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
       /// SuperAdminDashboardSuccess: false,
        showLoader:true
      };
    case actionType.SuperAdminDashboard_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        showLoader:false,
        kpis:action.kpis,
        KpisSuccess:true,
      //  FeedsSuccess:false,
      //  PieChartSuccess:false
      };
      case actionType.SuperAdminDashboardFeed_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        showLoader:false,
        subcriberFeeds:action.subcriberFeeds,
      //  KpisSuccess:false,
        FeedsSuccess:true,
      //  PieChartSuccess:false
      };
      case actionType.SuperAdminDashboardPie_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        showLoader:false,
        pieChart:action.pieChart,
       // KpisSuccess:true,
       // FeedsSuccess:false,
        PieChartSuccess:true
      };

    case actionType.SuperAdminDashboard_FAIL:
      return {
        ...state,
        ...action.payload,
        showLoader:false,
        isAuthenticated: true,
        SuperAdminDashboardSuccess: false,
        IsDataSubmitedSuccessfullySuperAdminDashboard: action.IsDataSubmitedSuccessfullySuperAdminDashboard,
      };
    case actionType.SuperAdminDashboard_ERROR:
      return {
        
        ...state,
        ...action.payload,
        isAuthenticated: true,
        SuperAdminDashboardSuccess: false,
        showLoader:false,
        IsError: true,
      };
    case actionType.SuperAdminDashboard_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        SuperAdminDashboardSuccess: false,
        showLoader:false,
        IsDataSubmitedSuccessfullySuperAdminDashboard:false
      };

    default:
      return state;
  }
};
