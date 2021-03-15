import * as actionType from "../constants/myProfile";

const initialState = {
  MyProfileStart: false,
  MyProfileSuccess: false,
  MyProfileFailed: false,
  MyProfileError: "",
  MyProfileData: {},
  MyProfileEnd: false,
  IsDataSubmitedSuccessfully: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.MyProfile_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case actionType.MyProfile_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        MyProfileSuccess: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
        countryDD: action.countryDD,
      };
    case actionType.IsDataSubmitedSuccessfully:
      return {
        isAuthenticated: true,
        MyProfileSuccess: false,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.MyProfile_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsDataSubmitedSuccessfully: action.IsDataSubmitedSuccessfully,
      };
    case actionType.MyProfile_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        IsError: true,
      };
    case actionType.MyProfile_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
