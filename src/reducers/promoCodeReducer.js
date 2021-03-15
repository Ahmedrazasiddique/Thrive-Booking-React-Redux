
import * as actionType from "../constants/promoCode";

const initialState = {
  PromoCodeStart:false,
  PromoCodeSuccess:false,
  PromoCodeFailed:false,
  PromoCodeError:"",
  PromoCodeData:{},
  PromoCodeEnd:false

}


export default (state = initialState, action) => {
  
    switch (action.type) {
        case actionType.PromoCode_START:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                PromoCodeSuccess:false
            };
            case actionType.PromoCode_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    PromoCodeSuccess:true,
                    IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                };
                case actionType.IsDataSubmitedSuccessfully:
                    return {
                        
                        isAuthenticated: true,
                        PromoCodeSuccess:false,
                        IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                    };

                case actionType.PromoCode_FAIL:
                    return {
                        ...state,
                        ...action.payload,
                        isAuthenticated: true,
                        PromoCodeSuccess:false,
                        IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                    };
                    case actionType.PromoCode_ERROR:
                        return {
                            ...state,
                            ...action.payload,
                            isAuthenticated: true,
                            PromoCodeSuccess:false,
                            IsError:true
                        };
                        case actionType.PromoCode_END:
                        return {
                            ...state,
                            ...action.payload,
                            isAuthenticated: true,
                            PromoCodeSuccess:false
                        };

        default:
            return state;
    }
}