const initialState = {
    events: [],
    sidebar: false,
    selectedEvent: null,
  };
  
  const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ToogleSideBar":
        return { ...state, sectionClass: action.sectionClass };
      case "HANDLE_SELECTED_EVENT":
        return { ...state, selectedEvent: action.event };
      default:
        return state;
    }
  };
  
  export default layoutReducer;
  