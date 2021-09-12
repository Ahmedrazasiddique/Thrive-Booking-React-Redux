import * as actionType from "../constants/mycalendar";
const initialState = {
    MyCalendarStart: false,
    MyCalendarSuccess: false,
    MyCalendarFailed: false,
    MyCalendarError: "",
    MyCalendarData: {},
    MyCalendarEnd: false,
  };

  export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.MyCalendar_START:
            return {
              ...state,
              ...action.payload,
              isAuthenticated: true,
              IsLoaderShow: true,
              eventDetails:null,
              IsPopUpShow:false
            };

            case actionType.MyCalendar_SUCCESS:
                return {
                  ...state,
                  ...action.payload,
                  isAuthenticated: true,
                  IsLoaderShow: false,
                  newData:action.newData,
                  eventDetails:action.eventDetails,
                  IsPopUpShow:false,
                  defaultDate:action.defaultDate,
                  IsSuccess:action.IsSuccess
                };
                case actionType.MyCalendarPopUp_SUCCESS:
                  return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    IsLoaderShow: false,
                   // newData:action.newData,
                    eventDetails:action.eventDetails,
                    IsPopUpShow:true,
                  };



                case actionType.MyCalendar_ERROR:
                    return {
                      ...state,
                      ...action.payload,
                      isAuthenticated: true,
                      IsLoaderShow: false,
                      IsPopUpShow:false,
                      defaultDate:null
                    };

                    case actionType.MyCalendar_END:
                    return {
                      ...state,
                      ...action.payload,
                      isAuthenticated: true,
                      IsLoaderShow: false,
                      IsPopUpShow:false,
                      
                      
                    };
                    
    default:
      return state;

    }


}