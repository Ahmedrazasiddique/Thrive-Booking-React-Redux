import * as actionType from "../constants/discount";

const initialState = {
  DiscountStart: false,
  DiscountSuccess: false,
  DiscountFailed: false,
  DiscountError: "",
  DiscountData: {},
  DiscountEnd: false,
  IsDataSubmitedSuccessfully: false,
  IsPromosAddedSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.Discount_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DiscountSuccess: false,
      };
    case actionType.Discount_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DiscountSuccess: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.IsDataSubmitedSuccessfully:
      return {
        isAuthenticated: true,
        DiscountSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.IsPromosAddedSuccess:
      return {
        isAuthenticated: true,
        DiscountSuccess: false,
        IsPromosAddedSuccess: action.IsPromosAddedSuccess,
        IsDataSubmitedSuccessfully: false,
      };
    case actionType.Discount_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DiscountSuccess: false,
      };
    case actionType.Discount_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DiscountSuccess: false,
        IsError: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.Discount_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DiscountSuccess: false,
      };

    default:
      return state;
  }
};
