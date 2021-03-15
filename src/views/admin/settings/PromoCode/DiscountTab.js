import React, { Fragment,useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label,
  Row,
  Col,
 } from "reactstrap";
 import Select from "react-select";
 import * as Yup from "yup"
 import { Formik, Form, Field,ErrorMessage } from "formik";
 import { ToastContainer, toast } from "react-toastify";
 import {  Server,DollarSign,Gift} from "react-feather"
 import CustomDiscountComponent from "../../../../../src/components/CustomComponents/CustomDiscountComponent"

 import { connect } from "react-redux";
 import { getMyDiscountList } from "../../../../actions/discountActions";

 
const DiscountTap = (props) => {

  
  const [DiscountData, setDiscountData] = useState({});
  useEffect(() => {
    if(!props.DiscountSuccess)
    props.getMyDiscountList(1);
  },[DiscountData]);

  useEffect(() => {
  
    if(props.DiscountSuccess)
    setDiscountData(props.DiscountData.data)

    console.log(DiscountData)
  });


  const [onceChk, setOnceChk] = useState(DiscountData.Once?DiscountData.Once.status=="E"?true:false:false);
  const [weeklyChk, setWeeklyChk] = useState(DiscountData.Weekly?DiscountData.Weekly.status=="E"?true:false:false);
  const [biWeeklyChk, setBiWeeklyChk] = useState(DiscountData["Bi-Weekly"]?DiscountData["Bi-Weekly"].status=="E"?true:false:false);
  const [monthlyChk, setMonthlyChk] = useState(DiscountData.Monthly?DiscountData.Monthly.status=="E"?true:false:false);

  const handleSwitchChange = (event) => {
    if(event.target.name=="onceChk")
    setOnceChk(onceChk?false:true)
    else if (event.target.name=="weeklyChk")
    setWeeklyChk(weeklyChk?false:true)
    else if (event.target.name=="biWeeklyChk")
    setBiWeeklyChk(biWeeklyChk?false:true)
    else if (event.target.name=="monthlyChk")
    setMonthlyChk(monthlyChk?false:true)

   }

   const discountTypeDD = [
    { value: "F", label: "%" },
    { value: "E", label: "$" }
   ]

  return (
    <Fragment>
     
      
       
         
          <Formik
            initialValues={{
              timeFormat: "",
              datePickerFormate: "",
              email: "sample@sample.com",
              phone: "(012) 345 6789",
              address: "sample address",
              city: "sample city",
              state: "sample state",
              country: "",
              zip: "8000",
            }}
            onSubmit={(values) => {
              setTimeout(() => {
                toast.success(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {(formikprops) => (
              <Form>
                   
               <Row>
     
               <Col sm="6">
                
               
         <CustomDiscountComponent 
         DiscountHeading="Once" 
         CheckBoxValue={onceChk} 
         CheckBoxName={"onceChk"} 
         handleSwitchChange={handleSwitchChange}  
         DiscountTypeDD={discountTypeDD}
         DiscountLabelName="OnceLabelName"
         DiscountLabelID="OnceLabelID"
         DiscountLabelPlaceHolder="Enter here"
         DiscountTypeTextBoxName="OnceDiscountTypeTextName"
         DiscountTypeTextBoxID="OnceDiscountTypeTextID"
         Data={DiscountData.Once ?DiscountData.Once:{label:"asda"}}
         >
         </CustomDiscountComponent>
       
         <hr />
         <CustomDiscountComponent 
         DiscountHeading="Weekly" 
         CheckBoxValue={weeklyChk} 
         CheckBoxName={"weeklyChk"} 
         handleSwitchChange={handleSwitchChange}  
         DiscountTypeDD={discountTypeDD}
         DiscountLabelName="WeeklyLabelName"
         DiscountLabelID="WeeklyLabelID"
         DiscountLabelPlaceHolder="Enter here"
         DiscountTypeTextBoxName="WeeklyDiscountTypeTextName"
         DiscountTypeTextBoxID="WeeklyDiscountTypeTextID"
         Data={DiscountData.Weekly ?DiscountData.Weekly:{}}
         >
         </CustomDiscountComponent>
         </Col>
         <Col sm="6">
           <CustomDiscountComponent 
         DiscountHeading="Bi-Weekly" 
         CheckBoxValue={biWeeklyChk} 
         CheckBoxName={"biWeeklyChk"} 
         handleSwitchChange={handleSwitchChange}  
         DiscountTypeDD={discountTypeDD}
         DiscountLabelName="BiWeeklyLabelName"
         DiscountLabelID="BiWeeklyLabelID"
         DiscountLabelPlaceHolder="Enter here"
         DiscountTypeTextBoxName="BiWeeklyDiscountTypeTextName"
         DiscountTypeTextBoxID="BiWeeklyDiscountTypeTextID"
         Data={DiscountData["Bi-Weekly"] ?DiscountData["Bi-Weekly"]:{}}
         >
         </CustomDiscountComponent>
         <hr />
         <CustomDiscountComponent 
         DiscountHeading="Monthly" 
         CheckBoxValue={monthlyChk} 
         CheckBoxName={"monthlyChk"} 
         handleSwitchChange={handleSwitchChange}  
         DiscountTypeDD={discountTypeDD}
         DiscountLabelName="MonthlyLabelName"
         DiscountLabelID="MonthlyLabelID"
         DiscountLabelPlaceHolder="Enter here"
         DiscountTypeTextBoxName="MonthlyDiscountTypeTextName"
         DiscountTypeTextBoxID="MonthlyDiscountTypeTextID"
         Data={DiscountData.Monthly ?DiscountData.Monthly:{}}
         >
         </CustomDiscountComponent>
                  
                  </Col>

                
            

                  </Row>
              </Form>
            )}
          </Formik>

          <ToastContainer />
       
    </Fragment>
  );
};



const mapStateToProps = (state) => {

  return {
    DiscountData: state.discount.data,
   DiscountSuccess:state.discount.DiscountSuccess
  };
};

const actionMethods = {
  getMyDiscountList: getMyDiscountList,
  
};

export default connect(mapStateToProps, actionMethods)(DiscountTap);