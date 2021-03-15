
import * as actionType from "../constants/eventSettings";

const initialState = {
  EventStart:false,
  EventSuccess:false,
  EventFailed:false,
  EventError:"",
  EventData:{},
  EventEnd:false,
  IsDataSubmitedSuccessfully:false

}


export default (state = initialState, action) => {
    
    switch (action.type) {
        case actionType.Event_START:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            };
            case actionType.Event_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    EventSuccess: true,
                    IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully
                };
                case actionType.IsDataSubmitedSuccessfully:
                    return {
                        
                        isAuthenticated: true,
                        EventSuccess:false,
                        IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully,
                        
                    };
                case actionType.Event_FAIL:
                    return {
                        ...state,
                        ...action.payload,
                        isAuthenticated: true,
                        IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                    };
                    case actionType.Event_ERROR:
                        return {
                            
                            ...state,
                            ...action.payload,
                            isAuthenticated: true,
                            IsError:true,
                            IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                        };
                        case actionType.Event_END:
                        return {
                            ...state,
                            ...action.payload,
                            isAuthenticated: true
                        };

        default:
            return state;
    }
}