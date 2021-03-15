
import * as actionType from "../constants/emailTemplate";

const initialState = {
  EmailTemplateStart:false,
  EmailTemplateSuccess:false,
  EmailTemplateFailed:false,
  EmailTemplateError:"",
  EmailTemplateData:{},
  EmailTemplateEnd:false,
  IsDataSubmitedSuccessfully:false

}


export default (state = initialState, action) => {
    
    switch (action.type) {
        case actionType.EmailTemplate_START:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            };
            case actionType.EmailTemplate_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    EmailTemplateSuccess:true,
                    IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully,
                    emailTemplateObject:action.emailTemplateObject
                };
                case actionType.IsDataSubmitedSuccessfully:
                    return {
                        
                        isAuthenticated: true,
                        EmailTemplateSuccess:false,
                        IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                    };
                case actionType.EmailTemplate_FAIL:
                    return {
                        ...state,
                        ...action.payload,
                        isAuthenticated: true,
                        IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                    };
                    case actionType.EmailTemplate_ERROR:
                        return {
                            
                            ...state,
                            ...action.payload,
                            isAuthenticated: true,
                            IsError:true,
                            IsDataSubmitedSuccessfully:action.IsDataSubmitedSuccessfully
                        };
                        case actionType.EmailTemplate_END:
                        return {
                            ...state,
                            ...action.payload,
                            isAuthenticated: true
                        };

        default:
            return state;
    }
}