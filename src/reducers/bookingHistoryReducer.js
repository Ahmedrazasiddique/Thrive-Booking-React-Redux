import * as actionType from "../constants/bookingHistory";

const initialState = {
  BookingHistoryStart: false,
  BookingHistorySuccess: false,
  BookingHistoryFailed: false,
  BookingHistoryError: "",
  BookingHistoryData: {},
  BookingHistoryEnd: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.BookingHistory_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        BookingHistorySuccess: false,
      };
    case actionType.BookingHistory_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        BookingHistorySuccess: true,
      };
   
    case actionType.BookingHistory_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        BookingHistorySuccess: false,
      
      };
    case actionType.BookingHistory_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        BookingHistorySuccess: false,
        IsError: true,
      };
    case actionType.BookingHistory_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        BookingHistorySuccess: false,
      };

    default:
      return state;
  }
};
