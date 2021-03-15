import axios from '../axios-instance';
import {
    MyChangePassword_START ,
     MyChangePassword_END ,
     MyChangePassword_ERROR ,
    MyChangePassword_SUCCESS ,
     MyChangePassword_FAIL ,
     IsDataSubmitedSuccessfullyChangePassword
} from '../constants/myChangePassword';



export const updateMyChangePassword = changePassword => dispatch => {
    dispatch({
        type: MyChangePassword_START,
     
    })
    axios.post('user/change-pasword/1',changePassword)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfullyChangePassword,
                IsDataSubmitedSuccessfullyChangePassword: true
            })
          
        })
        .catch(err => 
            
            dispatch({
                type: MyChangePassword_ERROR,
                payload: err.response.data.data
            })
        );
}
