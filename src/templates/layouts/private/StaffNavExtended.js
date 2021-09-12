import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from "react-perfect-scrollbar";
import adminMenuConfig from "../../../config/adminMenuConfig";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  toogleMenu
} from '../../../actions/layoutAction'
class StaffNavExtended extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isShowChild:[false,false,false],
        extended:false,
        menuActivePosition:[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      };
    }
    
    openExtended = e => {
      this.props.toogleMenu(true);
        this.setState({extended:true})
  }
  closeExtended = e => {
      
    this.props.toogleMenu(false);
    this.setState({extended:false})
}

  openClick = (menuID) => {
      var resetArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      resetArray[menuID]=menuID;
      this.setState({menuActivePosition:resetArray})
}
componentDidUpdate()
{
    
}
  
  
toogleMenu = (idNumber) => {
    var oldArray = this.state.isShowChild;
   
      if(!this.state.isShowChild[idNumber])
      oldArray[idNumber]=true;
        else
        oldArray[idNumber]=false;

    this.setState({isShowChild:oldArray})
}


render (){
    return (
        
            <>
         {
             !this.state.extended?
         
            
        <div className="sidemenu rd_sidemenusmall dnmobile"
        
        onMouseEnter={() => this.openExtended()}
        onMouseLeave={() => this.closeExtended()}
        >
        <div className="ul-listitemmenu rd_listitemmenusmall">
          <a className={"itemcomcon dashboardmenuicon " +(this.state.menuActivePosition[1] === 1?"active":"")}></a>
          <a className={"itemcomcon calendarmenuicon " +(this.state.menuActivePosition[2] === 2?"active":"")}></a>
          <a className={"itemcomcon bookingmenuicon "+(this.state.menuActivePosition[3] === 3?"active":"")}></a>
          <a className={"itemcomcon schcdulcmenuicon schcdulcmenuiconnos " +(this.state.menuActivePosition[4] === 4?"active":"")}></a>
        
  
          <div className="logoutlinkmenu">
            <a className="itemcomcon logoutlinkmenuicon"></a>
          </div>
        </div>
      </div>
            :
            <PerfectScrollbar>
        <div className="sidemenu dnmobile"
        
        onMouseEnter={() => this.openExtended()}
        onMouseLeave={() => this.closeExtended()}>
        <div className="ul-listitemmenu">
        <Link 
             to={
               "/test" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(1)}
            className={
                "itemcomconsub dashboardmenuicon "+(this.state.menuActivePosition[1] === 1?"active":"")
                }>  My Dashboard </Link>

<Link 
             to={
               "/staff/schedule" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(2)}
            className={
                "itemcomconsub calendarmenuicon "+(this.state.menuActivePosition[2] === 2?"active":"")
                }>  Schedule </Link>

<Link 
             to={
               "/staff/payment" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(3)}
            className={
                "itemcomconsub calendarmenuicon "+(this.state.menuActivePosition[2] === 2?"active":"")
                }>  Payment </Link>

<Link 
             to={
               "/staff/booking" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(4)}
            className={
                "itemcomconsub calendarmenuicon "+(this.state.menuActivePosition[2] === 2?"active":"")
                }>  Booking </Link>

       
  
          <div className="logoutlinkmenu">
            <a onClick={this.props.userLogout} className="itemcomcon logoutlinkmenuicon"> Logout </a>
          </div>
        </div>
      </div>
      </PerfectScrollbar>
      }
        </>
    );
  };
}
  
const actionMethods = {
  toogleMenu: toogleMenu,
};

export default connect(null, actionMethods)(StaffNavExtended);