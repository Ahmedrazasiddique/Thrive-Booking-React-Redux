import * as actionType from "../constants/crm";

const initialState = {
  CrmStart: false,
  CrmSuccess: false,
  CrmFailed: false,
  CrmError: "",
  CrmData: {},
  CrmEnd: false,
  IsDataSubmitedSuccessfullyCrm: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.Crm_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        CrmSuccess: false,
      };
    case actionType.Crm_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        CrmSuccess: true,
        IsDataSubmitedSuccessfullyCrm: action.IsDataSubmitedSuccessfullyCrm,
        countryDD: action.countryDD,
      };
    case actionType.IsDataSubmitedSuccessfullyCrm:
      return {
        isAuthenticated: true,
        CrmSuccess: false,
        IsDataSubmitedSuccessfullyCrm: action.IsDataSubmitedSuccessfullyCrm,
      };
    case actionType.Crm_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        CrmSuccess: false,
        IsDataSubmitedSuccessfullyCrm: action.IsDataSubmitedSuccessfullyCrm,
      };
    case actionType.Crm_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        CrmSuccess: false,
        IsError: true,
      };
    case actionType.Crm_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        CrmSuccess: false,
      };

    default:
      return state;
  }
};
