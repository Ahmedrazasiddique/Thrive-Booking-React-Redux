import * as actionType from "../constants/emailSettings";

const initialState = {
  EmailSettingsStart: false,
  EmailSettingsSuccess: false,
  EmailSettingsFailed: false,
  EmailSettingsError: "",
  EmailSettingsData: {},
  EmailSettingsEnd: false,
  IsDataSubmitedSuccessfully: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.EmailSettings_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case actionType.EmailSettings_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        EmailSettingsSuccess: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.IsDataSubmitedSuccessfully:
      return {
        isAuthenticated: true,
        EmailSettingsSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.EmailSettings_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case actionType.EmailSettings_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsError: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.EmailSettings_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
