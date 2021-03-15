import axios from '../axios-instance';
import {
    SmsTemplate_START ,
     SmsTemplate_END ,
     SmsTemplate_ERROR ,
    SmsTemplate_SUCCESS ,
     SmsTemplate_FAIL ,
     IsDataSubmitedSuccessfully
} from '../constants/smsTemplate';

export const getSmsTemplateData = id => dispatch => {
    dispatch({
        type: SmsTemplate_START,
     
    })
    axios.get('admin/settings/sms-templates/1')
        .then( res => {
            var smsTemplate={
                clientTemplates:[],
                adminTemplates:[],
                staffTemplates:[]

            };

            res.data.data.forEach(element => {
                
                if(element.user_type=="A")
                {smsTemplate.adminTemplates.push(element)}
                
                else if(element.user_type=="C")
                {smsTemplate.clientTemplates.push(element)}
                
                else if(element.user_type=="S")
                {smsTemplate.staffTemplates.push(element)}

            });

            dispatch({
                type: SmsTemplate_SUCCESS,
                payload: res.data.data,
                smsTemplateObject:smsTemplate
            })
        })
        .catch(err => 
            dispatch({
                type: SmsTemplate_FAIL,
                payload: err.response.data.data
            })
        );
}

export const updateSmsTemplateData = SmsData => dispatch => {
    dispatch({
        type: SmsTemplate_START,
     
    })
    axios.post('admin/settings/sms-template/save',SmsData)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getSmsTemplateData(1)(dispatch);
        })
        .catch(err => 
            
            dispatch({
                type: SmsTemplate_ERROR,
                payload: err.response.data.data
            })
        );
}
