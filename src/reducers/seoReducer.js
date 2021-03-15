import * as actionType from "../constants/seo";

const initialState = {
  seoStart: false,
  seoSuccess: false,
  seoFailed: false,
  seoError: "",
  seoData: {},
  seoEnd: false,
  IsDataSubmitedSuccessfully: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SEO_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case actionType.SEO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        seoSuccess: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.IsDataSubmitedSuccessfully:
      return {
        isAuthenticated: true,
        seoSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.SEO_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.SEO_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsError: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.SEO_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
