import React, { Fragment } from "react";
import { Button, Row, Col, Form } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import CustomDiscountComponent from "../../../../../src/components/CustomComponents/CustomDiscountComponent";
import { connect } from "react-redux";
import {
  getMyDiscountList,
  updateRecurrentDiscount,
} from "../../../../actions/discountActions";
import Loader from "../../../../../src/components/Loader/Loader";
class DiscountTap extends React.Component {
  state = {
    isShowLoader: false,
    discountTypeDD: [
      { value: "P", label: "%" },
      { value: "F", label: "$" },
    ],
    DiscountData: {},
    onceChk: false,
    weeklyChk: false,
    biWeeklyChk: false,
    monthlyChk: false,
    isDataLoaded: false,
  };
  componentDidMount() {
    const { getMyDiscountList } = this.props;
    getMyDiscountList(1);
    this.setState({ isShowLoader: true });
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.DiscountSuccess) {
        console.log("discount data", this.props.DiscountData.data);
        this.setState({ DiscountData: this.props.DiscountData.data });
        this.setState({
          onceChk:
            this.props.DiscountData.data.Once.status === "E" ? true : false,
        });
        this.setState({
          weeklyChk:
            this.props.DiscountData.data.Weekly.status === "E" ? true : false,
        });
        this.setState({
          biWeeklyChk:
            this.props.DiscountData.data["Bi-Weekly"].status === "E"
              ? true
              : false,
        });
        this.setState({
          monthlyChk:
            this.props.DiscountData.data.Monthly.status === "E" ? true : false,
        });

        this.setState({ isDataLoaded: true });
        this.setState({ isShowLoader: false });
      }

      if (this.props.IsDataSubmitedSuccessfully) {
        toast.success("Update Successfully");
      }
    }
  }

  handleSwitchChange = (event) => {
    if (event.target.id === "onceChk") {
      this.setState({ onceChk: this.state.onceChk === true ? false : true });
    } else if (event.target.id === "weeklyChk") {
      this.setState({ weeklyChk: this.state.weeklyChk ? false : true });
    } else if (event.target.id === "biWeeklyChk") {
      this.setState({ biWeeklyChk: this.state.biWeeklyChk ? false : true });
    } else {
      this.setState({ monthlyChk: this.state.monthlyChk ? false : true });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isShowLoader: true });
    const formData = new FormData(event.target);
    //  formData.append('default_color_status', appointmentAutoConfirmChk===true?"E":"D");
    // formData.append('appointment_auto_confirm_status', defaultColorSchemeChk===true?"E":"D");
    //  formData.append('id', 1);
    var dataArray = [];
    var dataObject = {
      once: {},
      weekly: {},
      bi_weekly: {},
      monthly: {},
      business_id: 1,
    };
    for (let [key, value] of formData.entries()) {
      dataArray.push(value);
    }

    //Once
    dataObject.once.id = dataArray[0];
    dataObject.once.discount_type_name = dataArray[1];
    dataObject.once.label = dataArray[2];
    dataObject.once.discount_type = dataArray[3];
    dataObject.once.rates = dataArray[4];
    dataObject.once.status = this.state.onceChk === true ? "E" : "D";
    //Weekly

    dataObject.weekly.id = dataArray[5];
    dataObject.weekly.discount_type_name = dataArray[6];
    dataObject.weekly.label = dataArray[7];
    dataObject.weekly.discount_type = dataArray[8];
    dataObject.weekly.rates = dataArray[9];
    dataObject.weekly.status = this.state.weeklyChk === true ? "E" : "D";
    //BiWeekly

    dataObject.bi_weekly.id = dataArray[10];
    dataObject.bi_weekly.discount_type_name = dataArray[11];
    dataObject.bi_weekly.label = dataArray[12];
    dataObject.bi_weekly.discount_type = dataArray[13];
    dataObject.bi_weekly.rates = dataArray[14];
    dataObject.bi_weekly.status = this.state.biWeeklyChk === true ? "E" : "D";
    //Monthly

    dataObject.monthly.id = dataArray[15];
    dataObject.monthly.discount_type_name = dataArray[16];
    dataObject.monthly.label = dataArray[17];
    dataObject.monthly.discount_type = dataArray[18];
    dataObject.monthly.rates = dataArray[19];
    dataObject.monthly.status = this.state.monthlyChk === true ? "E" : "D";

    console.log("Discount Object :", dataObject);
    this.props.updateRecurrentDiscount(dataObject);
    // props.updateMyThriveLink(formData)
  };

  render() {
    return (
      
      <div className="rd_vacationfilterpart rd_vacationfilterpart3">

     
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <Form onSubmit={this.handleSubmit}>
          {this.state.isDataLoaded ? (
             <div className="rd_profilerd_erpart rd_profilerd_erpartpromo">
                <CustomDiscountComponent
                  IDName={"id"}
                  DiscountHeading="Once"
                  CheckBoxValue={this.state.onceChk}
                  CheckBoxName={"onceChk"}
                  handleSwitchChange={this.handleSwitchChange}
                  DiscountTypeDD={this.state.discountTypeDD}
                  DiscountLabelName="label"
                  DiscountLabelID="OnceLabelID"
                  DiscountLabelPlaceHolder="Enter here"
                  DiscountTypeTextBoxName="rates"
                  DiscountTypeTextBoxID="OnceDiscountTypeTextID"
                  DiscountTypeDDName="discount_type"
                  Status="status"
                  Data={this.state.DiscountData.Once}
                  discount_type_name={"discount_type_name"}
                  discount_type_name_value={"Once"}
                ></CustomDiscountComponent>

                <CustomDiscountComponent
                  IDName={"id"}
                  DiscountHeading="Weekly"
                  CheckBoxValue={this.state.weeklyChk}
                  CheckBoxName={"weeklyChk"}
                  handleSwitchChange={this.handleSwitchChange}
                  DiscountTypeDD={this.state.discountTypeDD}
                  DiscountLabelName="label"
                  DiscountLabelID="WeeklyLabelID"
                  DiscountLabelPlaceHolder="Enter here"
                  DiscountTypeTextBoxName="rates"
                  DiscountTypeTextBoxID="WeeklyDiscountTypeTextID"
                  DiscountTypeDDName="discount_type"
                  Status="status"
                  Data={this.state.DiscountData.Weekly}
                  discount_type_name={"discount_type_name"}
                  discount_type_name_value={"Weekly"}
                ></CustomDiscountComponent>
           
                <CustomDiscountComponent
                  IDName={"id"}
                  DiscountHeading="Bi-Weekly"
                  CheckBoxValue={this.state.biWeeklyChk}
                  CheckBoxName={"biWeeklyChk"}
                  handleSwitchChange={this.handleSwitchChange}
                  DiscountTypeDD={this.state.discountTypeDD}
                  DiscountLabelName="label"
                  DiscountLabelID="BiWeeklyLabelID"
                  DiscountLabelPlaceHolder="Enter here"
                  DiscountTypeTextBoxName="rates"
                  DiscountTypeTextBoxID="BiWeeklyDiscountTypeTextID"
                  DiscountTypeDDName="discount_type"
                  Status="status"
                  Data={this.state.DiscountData["Bi-Weekly"]}
                  discount_type_name={"discount_type_name"}
                  discount_type_name_value={"Bi-Weekly"}
                ></CustomDiscountComponent>
               
                <CustomDiscountComponent
                  IDName={"id"}
                  DiscountHeading="Monthly"
                  CheckBoxValue={this.state.monthlyChk}
                  CheckBoxName={"monthlyChk"}
                  handleSwitchChange={this.handleSwitchChange}
                  DiscountTypeDD={this.state.discountTypeDD}
                  DiscountLabelName="label"
                  DiscountLabelID="MonthlyLabelID"
                  DiscountLabelPlaceHolder="Enter here"
                  DiscountTypeTextBoxName="rates"
                  DiscountTypeTextBoxID="MonthlyDiscountTypeTextID"
                  DiscountTypeDDName="discount_type"
                  Status="status"
                  Data={this.state.DiscountData.Monthly}
                  discount_type_name={"discount_type_name"}
                  discount_type_name_value={"Monthly"}
                ></CustomDiscountComponent>
             

             <div className="rd_svaebtn">
                    <button>Save Changes</button>
                </div>
              </div>
          ) : (
            <></>
          )}
        </Form>

        <ToastContainer />
     </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DiscountData: state.discount.data,
    DiscountSuccess: state.discount.DiscountSuccess,
    IsDataSubmitedSuccessfully: state.discount.IsDataSubmitedSuccessfully,
  };
};

const actionMethods = {
  getMyDiscountList: getMyDiscountList,
  updateRecurrentDiscount: updateRecurrentDiscount,
};

export default connect(mapStateToProps, actionMethods)(DiscountTap);
