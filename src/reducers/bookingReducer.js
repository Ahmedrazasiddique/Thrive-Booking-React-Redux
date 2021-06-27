import * as actionType from "../constants/booking";

const initialState = {
  BookingStart: false,
  BookingSuccess: false,
  BookingDDSuccess: false,
  BookingFailed: false,
  BookingError: "",
  BookingData: {},
  CompanyData:{},
  EventList:[],
  BookingEnd: false,
  AvalaibleSlots:[],
  IsDataSubmitedSuccessfully: false,
  AvalaibleSlotsSuccess:false,
  FreeEventSuccess:false,
  PaidEventSuccess:false,
  FreeEvent_fail:false,
  PaidEvent_fail:false
};

export default (state = initialState, action) => {
    
  switch (action.type) {
    case actionType.Booking_START:
      return {
        ...state,
        BookingData: action.payload,
        isAuthenticated: true,
        BookingSuccess: false,
      };

    case actionType.Booking_SUCCESS:
      return {
        ...state,
        BookingData: action.payload,
        isAuthenticated: true,
        BookingSuccess: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };

      case actionType.BookingCompany_SUCCESS:
        return {
          ...state,
          CompanyData:action.payload,
        CompanySuccess :true
        };
        case actionType.BookingEventList_SUCCESS:
            return {
              ...state,
              EventList:action.payload,
            EventListSuccess :true
            };


            case actionType.SingleEvent_SUCCESS:
                return {
                  ...state,
                  SingleEventDetails:action.payload,
                  GetEventByIDSuccess :true
                };

                case actionType.AvalaibleSlots_SUCCESS:
                  return {
                    ...state,
                    AvalaibleSlots:action.payload,
                    AvalaibleSlotsSuccess :true
                  };

                  case actionType.PaidEvent_SUCCESS:
                  return {
                    ...state,
                    PaidData:action.payload,
                    PaidEventSuccess :true
                  };

                  case actionType.FreeEvent_SUCCESS:
                    return {
                      ...state,
                      FreeData:action.payload,
                      FreeEventSuccess :true
                    };

                    
                  case actionType.FreeEvent_FAIL:
                    return {
                      ...state,
                     // FreeData:action.payload,
                     FreeEvent_fail :action.FreeEvent_fail,
                     FreeEventSuccess :false
                    };

                    case actionType.PaidEvent_FAIL:
                      return {
                        ...state,
                       // FreeData:action.payload,
                       PaidEvent_fail :action.PaidEvent_fail,
                       PaidEventSuccess :false
                      };
  
                    

    case actionType.IsDataSubmitedSuccessfully:
      return {
        isAuthenticated: true,
        BookingSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.Booking_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        BookingSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.Booking_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        BookingSuccess: false,
        IsError: true,
      };
    case actionType.Booking_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        BookingSuccess: false,
      };

    default:
      return state;
  }
};
