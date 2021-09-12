import * as actionType from "../constants/planManager";

const initialState = {
  PlanManagerStart: false,
  PlanManagerSuccess: false,
  PlanManagerFailed: false,
  PlanManagerError: "",
  PlanManagerData: {},
  PlanManagerEnd: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.PlanManager_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
       /// PlanManagerSuccess: false,
        showLoader:true
      };
    case actionType.PlanManager_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        showLoader:false,
        PlanManagerSuccess:true,
        planManagerData:action.planManagerData
      //  FeedsSuccess:false,
      //  PieChartSuccess:false
      };

    case actionType.PlanManager_FAIL:
      return {
        ...state,
        ...action.payload,
        showLoader:false,
        isAuthenticated: true,
        PlanManagerSuccess: false, 
      };
    case actionType.PlanManager_ERROR:
      return {
        
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PlanManagerSuccess: false,
        showLoader:false,
        IsError: true,
      };
    case actionType.PlanManager_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PlanManagerSuccess: false,
        showLoader:false,
      };

    default:
      return state;
  }
};
