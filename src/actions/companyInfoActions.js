import axios from '../axios-instance';
import {
    Company_START ,
     Company_END ,
     Company_ERROR ,
    Company_SUCCESS ,
     Company_FAIL ,
     Company_DD_SUCCESS,
    IsDataSubmitedSuccessfully
} from '../constants/company';

export const getCompanyData = id => dispatch => {
    dispatch({
        type: Company_START,
     
    })
    axios.get('admin/settings/company/1')
        .then( res => {

            var CompanyInfo = {};

            CompanyInfo.MainData=  res.data;

            axios.get('company-settings-services')
            .then( res => {
          
                CompanyInfo.countries=res.data.data.countries;
                CompanyInfo.timezones=res.data.data.timezones;
                CompanyInfo.languages=res.data.data.languages;
             
                dispatch({
                    type: Company_SUCCESS,
                    payload: CompanyInfo
                })
                })
                .catch(err => 
                    {
    
                    }
                );
            
        })
        .catch(err => 
            dispatch({
                type: Company_ERROR,
                payload: err.response.data.data
            })
        );
}

export const updateCompanyData = thriveData => dispatch => {
    dispatch({
        type: Company_START,
     
    })
    axios.post('admin/settings/company/save',thriveData)
        .then( res => {
           
          
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getCompanyData(1)(dispatch);
        })
        .catch(err => 
            dispatch({
                type: Company_ERROR,
                payload: err.response.data.data
            })
        );
}
