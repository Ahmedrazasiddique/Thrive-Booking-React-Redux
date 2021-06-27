import React , { Component } from 'react';
import { connect } from "react-redux";
import SideLogo from '../../../assets/bookingeventassets/assets/sidelogo.svg';
import side_bar_foot_logo from '../../../assets/bookingeventassets/assets/side_bar_foot_logo.svg';
import OrderSummary from '../RightPortion/Components/OrderSummary'
import {
  getCompanyData
} from "../../../actions/bookingAction";

class LeftNav extends Component {
  state = {
    companyInfo: {},
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { getCompanyData } = this.props;
    getCompanyData(1);
    this.setState({ isShowLoader: true });
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.CompanySuccess) {
        
        this.setState({companyInfo:this.props.CompanyData.data})
        this.setState({ isShowLoader: false });
      }
    }
  }
  render() {

    const {companyInfo} = this.state;
    
    return (


    <nav className="navbar side_navbar">
        <ul className="navbar-nav side_bar_ul">
       <li className="nav-item">
         <img src={SideLogo}/>
       </li>
       <li className="nav-item">
       <h2 >{companyInfo.company_name}</h2>
       <p>
        {companyInfo.company_description}
       </p>
      </li>
      <li className="nav-item">
        <h2 >Contact Details</h2>
       <p className="sub_head">
         <span>
         Email:
         </span> <br/>{companyInfo.company_email}
        </p>
        <p className="sub_head">
            <span>
                Phone No:
            </span> <br/>
            {companyInfo.phone_no}
           </p>
           <p className="sub_head">
            <span>
                Address
            </span> <br/>{companyInfo.company_address}
           </p>


{this.props.OrderSummaryShowHide?
<OrderSummary  
  OrderSummaryAddon={this.props.OrderSummaryAddon}
  OrderSummaryPricing={this.props.OrderSummaryPricing}
  totalPrice={this.props.totalPrice}
></OrderSummary>
:<></>
}
           <div className="row side_bar_foot_img_div">
<div className="col-12 side_bar_foot_logo_img">
<img src={side_bar_foot_logo}/>
</div>
           </div>

       </li>

     </ul>

   </nav>
);
  }

}

const mapStateToProps = (state) => {
  return {
    CompanyData: state.booking.CompanyData,
    CompanySuccess: state.booking.CompanySuccess,

  };
};

const actionMethods = {
  getCompanyData: getCompanyData,
};

export default connect(mapStateToProps, actionMethods)(LeftNav);
