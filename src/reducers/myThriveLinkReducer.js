
import * as actionType from "../constants/myThriveLink";

const initialState = {
  ThriveLinkStart:false,
  ThriveLinkSuccess:false,
  ThriveLinkFailed:false,
  ThriveLinkError:"",
  ThriveLinkData:{},
  ThriveLinkEnd:false,
  IsDataSubmitedSuccessfully:false

}


export default (state = initialState, action) => {
  
    switch (action.type) {
        case actionType.ThriveLink_START:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                ThriveLinkSuccess:false
            };
            case actionType.ThriveLink_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    ThriveLinkSuccess:true,
                    IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                };
                case actionType.IsDataSubmitedSuccessfully:
                return {
                    
                    isAuthenticated: true,
                    ThriveLinkSuccess:false,
                    IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                };
                case actionType.ThriveLink_FAIL:
                    return {
                        ...state,
                        ...action.payload,
                        isAuthenticated: true,
                        ThriveLinkSuccess:false,
                        IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                    };
                    case actionType.ThriveLink_ERROR:
                        return {
                            ...state,
                            ...action.payload,
                            isAuthenticated: true,
                            ThriveLinkSuccess:false,
                            IsError:true
                        };
                        case actionType.ThriveLink_END:
                        return {
                            ...state,
                            ...action.payload,
                            isAuthenticated: true,
                            ThriveLinkSuccess:false
                        };

        default:
            return state;
    }
}