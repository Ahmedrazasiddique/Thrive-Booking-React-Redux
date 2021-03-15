import * as actionType from "../constants/smsTemplate";

const initialState = {
  SmsTemplateStart: false,
  SmsTemplateSuccess: false,
  SmsTemplateFailed: false,
  SmsTemplateError: "",
  SmsTemplateData: {},
  SmsTemplateEnd: false,
  IsDataSubmitedSuccessfully: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SmsTemplate_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case actionType.SmsTemplate_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        SmsTemplateSuccess: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
        smsTemplateObject: action.smsTemplateObject,
        tags: action.tags,
      };
    case actionType.IsDataSubmitedSuccessfully:
      return {
        isAuthenticated: true,
        SmsTemplateSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.SmsTemplate_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.SmsTemplate_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsError: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.SmsTemplate_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
