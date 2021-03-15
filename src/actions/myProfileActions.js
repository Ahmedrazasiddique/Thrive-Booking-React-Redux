import axios from '../axios-instance';
import {
    MyProfile_START ,
     MyProfile_END ,
     MyProfile_ERROR ,
    MyProfile_SUCCESS ,
     MyProfile_FAIL ,
     IsDataSubmitedSuccessfully
} from '../constants/myProfile';

export const getMyProfileData = id => dispatch => {
    dispatch({
        type: MyProfile_START,
     
    })
    axios.get('user-details/'+id)
        .then( res => {
           
            axios.get('company-settings-services')
            .then( countryRes => {
          
              
                dispatch({
                    type: MyProfile_SUCCESS,
                    payload: res.data,
                    countryDD:countryRes.data.data.countries
                })
             
           
                })
                .catch(err => 
                    {
                        dispatch({
                            type: MyProfile_ERROR,
                            payload: err.response.data.data
                        })
                    }
                );
          
        })
        .catch(err => 
            dispatch({
                type: MyProfile_ERROR,
                payload: err.response.data.data
            })
        );
}

export const updateMyProfileData = profileData => dispatch => {
   
    dispatch({
        type: MyProfile_START,
     
    })
    axios.post('user/edit/1',profileData)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getMyProfileData(1)(dispatch);
        })
        .catch(err => 
            
            dispatch({
                type: MyProfile_ERROR,
                payload: err.response.data.data
            })
        );
}
