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
class AdminNavExtended extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isShowChild:[false,false,false,false],
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
          <a className={"itemcomcon schcdulcmenuicon schcdulcmenuiconnos "+(this.state.menuActivePosition[3] === 3?"active":"")}></a>
          <a className={"itemcomcon schcdulcmenuicon schcdulcmenuiconnos " +(this.state.menuActivePosition[4] === 4?"active":"")}></a>
          <a className={"itemcomcon staffmenuicon schcdulcmenuiconnos "+(this.state.menuActivePosition[5] === 5?"active":"")}></a>
          <a className={"itemcomcon crmmenuicon schcdulcmenuiconnos "+(this.state.menuActivePosition[6] === 6?"active":"")}></a>
  
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
               "/admin/dashboard" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(1)}
            className={
                "itemcomconsub dashboardmenuicon "+(this.state.menuActivePosition[1] === 1?"active":"")
                }>  My Dashboard </Link>

<Link 
             to={
               "/admin/settings/my-calendar" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(2)}
            className={
                "itemcomconsub calendarmenuicon "+(this.state.menuActivePosition[2] === 2?"active":"")
                }>  My Calendar </Link>

  <a className="itemcomcon schcdulcmenuicon" onClick={()=>this.toogleMenu(3)}> Event </a>
          {
              this.state.isShowChild[3]?
          <div className={"schcdulcsublinks"}>
            <Link 
             to={
               "/admin/events/list" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(10)}
            className={
                "itemcomconsub "+(this.state.menuActivePosition[10] === 10?"active":"")
                }> Event List </Link>

             <Link 
             to={
               "/admin/events/create/list"
                  
              }
              href={undefined}
              target={ undefined}
            
              onClick={()=>this.openClick(5)}
              className={
                  "itemcomconsub "+(this.state.menuActivePosition[10] === 10?"active":"")
                  }> New Event </Link>
          </div>:<></>
}

          <a className="itemcomcon schcdulcmenuicon" onClick={()=>this.toogleMenu(0)}> Schedule </a>
          {
              this.state.isShowChild[0]?
          <div className={"schcdulcsublinks"}>
            <Link 
             to={
               "/admin/settings/vacation" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(4)}
            className={
                "itemcomconsub "+(this.state.menuActivePosition[4] === 4?"active":"")
                }> Vacation </Link>

             <Link 
             to={
               "/admin/settings/schedule"
                  
              }
              href={undefined}
              target={ undefined}
            
              onClick={()=>this.openClick(5)}
              className={
                  "itemcomconsub "+(this.state.menuActivePosition[5] === 5?"active":"")
                  }> Scheduled Events </Link>
          </div>:<></>
}

          <a className="itemcomcon staffmenuicon" onClick={()=>this.toogleMenu(1)}> Staff </a>
          {
              this.state.isShowChild[1]?
          <div className={"schcdulcsublinks"}>
            <Link 
             to={
               "/admin/settings/staff/directory-information" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(6)}
            className={
                "itemcomconsub "+(this.state.menuActivePosition[6] === 6?"active":"")
                }> Directory Info </Link>

             <Link 
             to={
               "/admin/settings/staff/booking-history"
                  
              }
              href={undefined}
              target={ undefined}
            
              onClick={()=>this.openClick(7)}
              className={
                  "itemcomconsub "+(this.state.menuActivePosition[7] === 7?"active":"")
                  }> Booking History </Link>
          </div>
          :<></>
}
          <a className="itemcomcon crmmenuicon" onClick={()=>this.toogleMenu(2)}> CRM </a>
          {
              this.state.isShowChild[2]?
          <div className={"schcdulcsublinks"}>
            <Link 
             to={
               "/admin/settings/crm" 
              }
              href={undefined}
              target={ undefined}
              onClick={()=>this.openClick(8)}
            className={
                "itemcomconsub "+(this.state.menuActivePosition[8] === 8?"active":"")
                }> Crm </Link>

             <Link 
             to={
               "/admin/settings/crm-payments"
                  
              }
              href={undefined}
              target={ undefined}
            
              onClick={()=>this.openClick(9)}
              className={
                  "itemcomconsub "+(this.state.menuActivePosition[9] === 9?"active":"")
                  }> Payment </Link>
          </div>:<></>
}
          <a className="itemcomcon octolinkmenuicon"> My Octo link </a>
      
  
          <div className="logoutlinkmenu">
            <a href="#" onClick={this.props.userLogout} className="itemcomcon logoutlinkmenuicon"> Logout </a>
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

export default connect(null, actionMethods)(AdminNavExtended);