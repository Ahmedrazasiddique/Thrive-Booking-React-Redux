import * as actionType from "../constants/vacation";

const initialState = {
  VacationStart: false,
  VacationSuccess: false,
  VacationFailed: false,
  VacationError: "",
  VacationData: {},
  VacationEnd: false,
  IsDataSubmitedSuccessfullyVacation: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.Vacation_START:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        VacationSuccess: false,
      };
    case actionType.Vacation_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        VacationSuccess: true,
        IsDataSubmitedSuccessfullyVacation:
          action.IsDataSubmitedSuccessfullyVacation,
      };
    case actionType.IsDataSubmitedSuccessfullyVacation:
      return {
        isAuthenticated: true,
        VacationSuccess: false,
        IsDataSubmitedSuccessfullyVacation:
          action.IsDataSubmitedSuccessfullyVacation,
      };
    case actionType.Vacation_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        VacationSuccess: false,
        IsDataSubmitedSuccessfullyVacation:
          action.IsDataSubmitedSuccessfullyVacation,
      };
    case actionType.Vacation_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        VacationSuccess: false,
        IsError: true,
      };
    case actionType.Vacation_END:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        VacationSuccess: false,
      };

    default:
      return state;
  }
};
