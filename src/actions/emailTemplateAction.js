import axios from '../axios-instance';
import {
    EmailTemplate_START ,
     EmailTemplate_END ,
     EmailTemplate_ERROR ,
    EmailTemplate_SUCCESS ,
     EmailTemplate_FAIL ,
     IsDataSubmitedSuccessfully
} from '../constants/emailTemplate';

export const getEmailTemplateData = id => dispatch => {
    dispatch({
        type: EmailTemplate_START,
     
    })
    axios.get('admin/settings/email-templates/1')
        .then( res => {
         
            var emailTemplate={
                clientTemplates:[],
                adminTemplates:[],
                staffTemplates:[]

            };
            res.data.data.forEach(element => {
                
                if(element.user_type=="A")
                {emailTemplate.adminTemplates.push(element)}
                
                else if(element.user_type=="C")
                {emailTemplate.clientTemplates.push(element)}
                
                else if(element.user_type=="S")
                {emailTemplate.staffTemplates.push(element)}

            });


            dispatch({
                type: EmailTemplate_SUCCESS,
                payload: res.data.data,
                emailTemplateObject:emailTemplate
            })
        })
        .catch(err => 
            dispatch({
                type: EmailTemplate_FAIL,
                payload: err.response.data.data
            })
        );
}

export const updateEmailTemplateData = emailData => dispatch => {
    dispatch({
        type: EmailTemplate_START,
     
    })
    axios.post('admin/settings/email-template/save',emailData)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getEmailTemplateData(1)(dispatch);
        })
        .catch(err => 
            
            dispatch({
                type: EmailTemplate_ERROR,
                payload: err.response.data.data
            })
        );
}
