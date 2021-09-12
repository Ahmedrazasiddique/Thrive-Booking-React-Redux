import * as actionType from "../constants/adminDashboard";

const initialState = {
  AdminDashboardStart: false,
  AdminDashboardSuccess: false,
  AdminDashboardFailed: false,
  AdminDashboardError: "",
  AdminDashboardData: {},
  AdminDashboardEnd: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.AdminDashboard_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
       /// AdminDashboardSuccess: false,
        showLoader:true
      };
    case actionType.AdminDashboardFirst_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        showLoader:false,
        AdminDashboardFirst:action.AdminDashboardFirst,
        FirstSuccess:true,
      //  FeedsSuccess:false,
      //  PieChartSuccess:false
      };

      case actionType.AdminDashboardSecond_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        showLoader:false,
        AdminDashboardSecond:action.AdminDashboardSecond,
        SecondSuccess:true,
      //  FeedsSuccess:false,
      //  PieChartSuccess:false
      };

      case actionType.AdminDashboardThird_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        showLoader:false,
        AdminDashboardThird:action.AdminDashboardThird,
        ThirdSuccess:true,
      //  FeedsSuccess:false,
      //  PieChartSuccess:false
      };
    
      case actionType.AdminDashboardForthPortion_SUCCESS:
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          showLoader:false,
          AdminDashboardForth:action.AdminDashboardForth,
          ForthSuccess:true,
        //  FeedsSuccess:false,
        //  PieChartSuccess:false
        };

        case actionType.AdminDashboardFifthPortion_SUCCESS:
            return {
              ...state,
              ...action.payload,
              isAuthenticated: true,
              showLoader:false,
              AdminDashboardFifth:action.AdminDashboardFifth,
              FifthSuccess:true,
            //  FeedsSuccess:false,
            //  PieChartSuccess:false
            };

    case actionType.AdminDashboard_FAIL:
      return {
        ...state,
        ...action.payload,
        showLoader:false,
        isAuthenticated: true,
        AdminDashboardSuccess: false,
        IsDataSubmitedSuccessfullyAdminDashboard: action.IsDataSubmitedSuccessfullyAdminDashboard,
      };
    case actionType.AdminDashboard_ERROR:
      return {
        
        ...state,
        ...action.payload,
        isAuthenticated: true,
        AdminDashboardSuccess: false,
        showLoader:false,
        IsError: true,
      };
    case actionType.AdminDashboard_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        AdminDashboardSuccess: false,
        showLoader:false,
        IsDataSubmitedSuccessfullyAdminDashboard:false
      };

    default:
      return state;
  }
};
