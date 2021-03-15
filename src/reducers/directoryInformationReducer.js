import * as actionType from "../constants/directoryInformation";

const initialState = {
  DirectoryInformationStart: false,
  DirectoryInformationSuccess: false,
  DirectoryInformationFailed: false,
  DirectoryInformationError: "",
  DirectoryInformationData: {},
  DirectoryInformationEnd: false,
  IsDataSubmitedSuccessfullyDirectoryInformation: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.DirectoryInformation_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DirectoryInformationSuccess: false,
      };
    case actionType.DirectoryInformation_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DirectoryInformationSuccess: true,
        IsDataSubmitedSuccessfullyDirectoryInformation: action.IsDataSubmitedSuccessfullyDirectoryInformation,
        countryDD: action.countryDD,
        languageDD:action.languageDD
      };
    case actionType.IsDataSubmitedSuccessfullyDirectoryInformation:
      return {
        isAuthenticated: true,
        DirectoryInformationSuccess: false,
        IsDataSubmitedSuccessfullyDirectoryInformation: action.IsDataSubmitedSuccessfullyDirectoryInformation,
      };
    case actionType.DirectoryInformation_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DirectoryInformationSuccess: false,
        IsDataSubmitedSuccessfullyDirectoryInformation: action.IsDataSubmitedSuccessfullyDirectoryInformation,
      };
    case actionType.DirectoryInformation_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DirectoryInformationSuccess: false,
        IsError: true,
      };
    case actionType.DirectoryInformation_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        DirectoryInformationSuccess: false,
      };

    default:
      return state;
  }
};
