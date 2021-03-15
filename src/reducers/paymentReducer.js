import * as actionType from "../constants/payment";

const initialState = {
  PaymentStart: false,
  PaymentSuccess: false,
  PaymentFailed: false,
  PaymentError: "",
  PaymentData: {},
  PaymentEnd: false,
  IsDataSubmitedSuccessfully: false,
  PaymentLocallySuccess: false,
  PaymentPaypalSuccess: false,
  PaymentStripeSuccess: false,
  PaymentStripeError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.Payment_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PaymentSuccess: false,
      };
    case actionType.Payment_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PaymentSuccess: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.IsDataSubmitedSuccessfully:
      return {
        isAuthenticated: true,
        PaymentSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.PaymentLocallySuccess:
      return {
        isAuthenticated: true,
        PaymentLocallyError: false,
        PaymentLocallySuccess: action.PaymentLocallySuccess,
      };
    case actionType.PaymentLocallyError:
      return {
        isAuthenticated: true,
        PaymentLocallySuccess: false,
        PaymentLocallyError: action.PaymentLocallyError,
      };

    case actionType.PaymentPaypalSuccess:
      return {
        isAuthenticated: true,
        PaymentLocallyError: false,
        PaymentPaypalSuccess: action.PaymentPaypalSuccess,
      };
    case actionType.PaymentPaypalError:
      return {
        isAuthenticated: true,
        PaymentPaypalSuccess: false,
        PaymentPaypalError: action.PaymentPaypalError,
      };

    case actionType.PaymentStripeSuccess:
      return {
        isAuthenticated: true,
        PaymentStripeError: false,
        PaymentStripeSuccess: action.PaymentStripeSuccess,
      };
    case actionType.PaymentStripeError:
      return {
        isAuthenticated: true,
        PaymentStripeSuccess: false,
        PaymentStripeError: action.PaymentStripeError,
      };

    case actionType.Payment_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PaymentSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.Payment_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PaymentSuccess: false,
        IsError: true,
      };
    case actionType.Payment_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        PaymentSuccess: false,
      };

    default:
      return state;
  }
};
