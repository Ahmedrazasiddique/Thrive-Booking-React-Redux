import * as actionType from "../constants/superadminpromos";

const initialState = {
  PromoCodeStart: false,
  PromoCodeSuccess: false,
  PromoCodeFailed: false,
  PromoCodeError: "",
  PromoCodeData: {},
  PromoCodeEnd: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SuperAdminPromoCode_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PromoCodeSuccess: false,
        showLoader:true
      };
    case actionType.SuperAdminPromoCode_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PromoCodeSuccess: true,
        showLoader:false,
        IsDataSubmitedSuccessfullySuperAdminPromoCode: action.IsDataSubmitedSuccessfullySuperAdminPromoCode,
      };
    case actionType.IsDataSubmitedSuccessfullySuperAdminPromoCode:
      return {
        showLoader:false,
        isAuthenticated: true,
        PromoCodeSuccess: false,
        IsDataSubmitedSuccessfullySuperAdminPromoCode: action.IsDataSubmitedSuccessfullySuperAdminPromoCode,
      };

    case actionType.SuperAdminPromoCode_FAIL:
      return {
        ...state,
        ...action.payload,
        showLoader:false,
        isAuthenticated: true,
        PromoCodeSuccess: false,
        IsDataSubmitedSuccessfullySuperAdminPromoCode: action.IsDataSubmitedSuccessfullySuperAdminPromoCode,
      };
    case actionType.SuperAdminPromoCode_ERROR:
      return {
        
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PromoCodeSuccess: false,
        showLoader:false,
        IsError: true,
      };
    case actionType.SuperAdminPromoCode_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PromoCodeSuccess: false,
        showLoader:false,
        IsDataSubmitedSuccessfullySuperAdminPromoCode:false
      };

    default:
      return state;
  }
};
