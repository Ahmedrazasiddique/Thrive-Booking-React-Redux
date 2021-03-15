import axios from "../axios-instance";
import {
  DirectoryInformation_START,
  DirectoryInformation_ERROR,
  DirectoryInformation_SUCCESS,
  IsDataSubmitedSuccessfullyDirectoryInformation,
} from "../constants/directoryInformation";
import { getAdminBusinessId } from "../utils/authHelper";
export const getDirectoryInformation = (filter) => (dispatch) => {
  dispatch({
    type: DirectoryInformation_START,
  });
  axios
    .post("admin/staffs/" + getAdminBusinessId(), filter)
    .then((res) => {
      axios
        .get("company-settings-services")
        .then((countryRes) => {
          dispatch({
            type: DirectoryInformation_SUCCESS,
            payload: res,
            IsDataSubmitedSuccessfullyDirectoryInformation: false,
            countryDD: countryRes.data.data.countries,
            languageDD: countryRes.data.data.languages,
          });
        })
        .catch((err) =>
          dispatch({
            type: DirectoryInformation_ERROR,
            payload: null,
          })
        );
    })
    .catch((err) =>
      dispatch({
        type: DirectoryInformation_ERROR,
        payload: null,
      })
    );
};

export const updateDirectoryInformation = (DirectoryInformationData) => (dispatch) => {
  dispatch({
    type: DirectoryInformation_START,
  });
  axios
    .post("admin/staff/update", DirectoryInformationData)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullyDirectoryInformation,
        IsDataSubmitedSuccessfullyDirectoryInformation: true,
      });
     
    })
    .catch((err) =>
      dispatch({
        type: DirectoryInformation_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const saveDirectoryInformation = (DirectoryInformationData) => (dispatch) => {
  dispatch({
    type: DirectoryInformation_START,
  });
  axios
    .post("admin/staff/create", DirectoryInformationData)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullyDirectoryInformation,
        IsDataSubmitedSuccessfullyDirectoryInformation: true,
      });
      getDirectoryInformation({
        pageSize: 10,
        pageNumber: 1,
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: DirectoryInformation_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const deleteDirectoryInformation = (id) => (dispatch) => {
  dispatch({
    type: DirectoryInformation_START,
  });
  axios
    .post("admin/staff/delete", { id: id })
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullyDirectoryInformation,
        IsDataSubmitedSuccessfullyDirectoryInformation: true,
      });
      getDirectoryInformation({
        pageSize: 10,
        pageNumber: 1,
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: DirectoryInformation_ERROR,
        payload: err.response.data.data,
      })
    );
};


export const getSingleUserByIDDirectoryInformation = (id) => (dispatch) => {
  dispatch({
    type: DirectoryInformation_START,
  });
  axios
    .get("user-details/"+id)
    .then((res) => {
      axios
      .get("company-settings-services")
      .then((countryRes) => {
        dispatch({
          type: DirectoryInformation_SUCCESS,
          payload: res,
          IsDataSubmitedSuccessfullyDirectoryInformation: false,
          countryDD: countryRes.data.data.countries,
          languageDD: countryRes.data.data.languages,
        });
      })
      .catch((err) =>
        dispatch({
          type: DirectoryInformation_ERROR,
          payload: null,
        })
      );
     
     
    })
    .catch((err) =>
      dispatch({
        type: DirectoryInformation_ERROR,
        payload: err.response.data.data,
      })
    );
};