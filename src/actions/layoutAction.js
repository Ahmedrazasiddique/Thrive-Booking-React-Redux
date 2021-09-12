
export const toogleMenu = (userData) => (dispatch) => {
  
    if (userData)
    dispatch({ type: "ToogleSideBar", sectionClass: "contentboxcont rd_largcontentboxcont" });
    else
    dispatch({ type: "ToogleSideBar", sectionClass: "contentboxcont" });
}