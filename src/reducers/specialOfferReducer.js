import * as actionType from "../constants/specialOffer";

const initialState = {
  SpecialOfferStart: false,
  SpecialOfferSuccess: false,
  SpecialOfferFailed: false,
  SpecialOfferError: "",
  SpecialOfferData: {},
  SpecialOfferEnd: false,
  IsDataSubmitedSuccessfullySpecialPromos: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SpecialOffer_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        SpecialOfferSuccess: false,
      };
    case actionType.SpecialOffer_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        SpecialOfferSuccess: true,
        IsDataSubmitedSuccessfullySpecialPromos:
          action.IsDataSubmitedSuccessfullySpecialPromos,
      };
    case actionType.IsDataSubmitedSuccessfullySpecialPromos:
      return {
        isAuthenticated: true,
        SpecialOfferSuccess: false,
        IsDataSubmitedSuccessfullySpecialPromos:
          action.IsDataSubmitedSuccessfullySpecialPromos,
      };
    case actionType.SpecialOffer_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        SpecialOfferSuccess: false,
        IsDataSubmitedSuccessfullySpecialPromos:
          action.IsDataSubmitedSuccessfullySpecialPromos,
      };
    case actionType.SpecialOffer_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        SpecialOfferSuccess: false,
        IsError: true,
      };
    case actionType.SpecialOffer_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        SpecialOfferSuccess: false,
      };

    default:
      return state;
  }
};
