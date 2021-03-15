import * as actionType from "../constants/company";

const initialState = {
  CompanyStart: false,
  CompanySuccess: false,
  CompanyDDSuccess: false,
  CompanyFailed: false,
  CompanyError: "",
  CompanyData: {},
  CompanyEnd: false,
  IsDataSubmitedSuccessfully: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.Company_START:
      return {
        ...state,
        CompanyData: action.payload,
        isAuthenticated: true,
        CompanySuccess: false,
      };

    case actionType.Company_SUCCESS:
      return {
        ...state,
        CompanyData: action.payload,
        isAuthenticated: true,
        CompanySuccess: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.IsDataSubmitedSuccessfully:
      return {
        isAuthenticated: true,
        CompanySuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.Company_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        CompanySuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.Company_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        CompanySuccess: false,
        IsError: true,
      };
    case actionType.Company_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        CompanySuccess: false,
      };

    default:
      return state;
  }
};
