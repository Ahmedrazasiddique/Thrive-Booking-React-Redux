import * as actionType from "../constants/myChangePassword";

const initialState = {
  MyChangePasswordStart: false,
  MyChangePasswordSuccess: false,
  MyChangePasswordFailed: false,
  MyChangePasswordError: "",
  MyChangePasswordData: {},
  MyChangePasswordEnd: false,
  IsDataSubmitedSuccessfullyChangePassword: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.MyChangePassword_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case actionType.MyChangePassword_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        MyChangePasswordSuccess: true,
        IsDataSubmitedSuccessfullyChangePassword:
          action.IsDataSubmitedSuccessfullyChangePassword,
      };
    case actionType.IsDataSubmitedSuccessfullyChangePassword:
      return {
        isAuthenticated: true,
        MyChangePasswordSuccess: false,
        IsDataSubmitedSuccessfullyChangePassword: true,
      };
    case actionType.MyChangePassword_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsDataSubmitedSuccessfullyChangePassword:
          action.IsDataSubmitedSuccessfullyChangePassword,
      };
    case actionType.MyChangePassword_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsError: true,
      };
    case actionType.MyChangePassword_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
