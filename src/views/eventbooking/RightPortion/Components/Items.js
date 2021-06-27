import React , { Component } from 'react';
import { connect } from "react-redux";

class Items extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      quantity:1,
      plusButton:false,
      minusButton:false,
      eventItem:this.props.eventItem,
      checkOrUncheck:false,
      booking_pricing:{
       event_pricing_id:this.props.eventItem.id,
        item_qty:0,
       item_price:parseInt(this.props.eventItem.price)
      },
      booking_addons:{
        event_addon_id:this.props.eventItem.id,
        addon_qty:0,
        addon_price:parseInt(this.props.eventItem.price)
       },
       itemType:this.props.itemType
    }
    
  }

  
  onChange = (e) => {
    if(e.target.value>9||e.target.value<0)
    {
      
  this.setState({plusButton:false});
      this.setState({quantity:1});
    
    }
    else{
    this.setState({quantity:e.target.value});
    }

   

  }
 
  PlusMinusQuantity(flag)
  {
    if(flag=="+")
    {
      if(this.state.quantity+1>9)
      {
        
      this.setState({plusButton:true});
      }else
      {

        this.setState({quantity:(this.state.quantity+1)});        
      this.setState({plusButton:false});
    
      }
     

    }
else
{
  this.setState({plusButton:false});
  if((this.state.quantity-1)<0||(this.state.quantity-1)==0)
  {
    
    this.setState({quantity:1});
  }else
  {
    
    this.setState({quantity:(this.state.quantity-1)});
  }
}

//////////////////// update quantity 
if(this.state.checkOrUncheck)
{
  if(this.state.itemType=='pricing'){
  
    let value = { ['item_qty']: flag=="+"?this.state.quantity+1:this.state.quantity-1 };
  value = {
    ...this.state.booking_pricing,
    ...value,
  };

  this.props.updateQuantity(value,'pricing');
  //console.log(value);
  this.setState({
    booking_pricing: {
      // object that we want to update
      ...this.state.booking_pricing, // keep all other key-value pairs
      ...value, // update the value of specific key
    },
  });
}
else
{
  let value = { ['addon_qty']: flag=="+"?this.state.quantity+1:this.state.quantity-1 };
  value = {
    ...this.state.booking_addons,
    ...value,
  };
  this.setState({
    booking_addons: {
      // object that we want to update
      ...this.state.booking_addons, // keep all other key-value pairs
      ...value, // update the value of specific key
    },
  });
  this.props.updateQuantity(value,'addon');
}

}
  }

  checkOrUncheckItem=(e)=>
  {
    var isCheckOrUncheck = this.state.checkOrUncheck?false:true;
    this.setState({checkOrUncheck:this.state.checkOrUncheck?false:true})
    if(isCheckOrUncheck)
    {
      if(this.state.itemType=='pricing'){
      
      let value = { ['item_qty']: this.state.quantity };
    value = {
      ...this.state.booking_pricing,
      ...value,
    };

    this.props.addPricingData(value);
    //console.log(value);
    this.setState({
      booking_pricing: {
        // object that we want to update
        ...this.state.booking_pricing, // keep all other key-value pairs
        ...value, // update the value of specific key
      },
    });
  }
  else
  {

    let value = { ['addon_qty']: this.state.quantity };
    value = {
      ...this.state.booking_addons,
      ...value,
    };

    console.log(value);
    
    this.props.addAddOnData(value);
    this.setState({
      booking_addons: {
        // object that we want to update
        ...this.state.booking_addons, // keep all other key-value pairs
        ...value, // update the value of specific key
      },
    });

  }
    }
    else
    {

      if(this.props.itemType=='pricing')
      {
      this.props.removePricingData(this.state.booking_pricing);
      }
      else
      {
        this.props.removeAddOnData(this.state.booking_addons);
      }
    }
  }

  render() {
    
const {eventItem}= this.state;

    return (
      <div className="col-12" style={{background: "white",border_bottom: "1px solid #d9d9d9",padding_top: "20px",padding_left: "19px;"}}>
      <div className="row">
      <div className="col-7 item_check">
           <div className="form-check">
          <input type="checkbox" checked={this.checkOrUncheck}  onClick={this.checkOrUncheckItem} className="form-check-input" id="item1" style={{color:"#0C4767;"}}/>
          <label className="form-check-label"  for="item1" style={{color:"#0C4767;"}}>{eventItem?eventItem.item_name:"item"}</label>
        </div></div>
      <div className="col-2" style={{color:"#0C4767",padding_top: "3px;"}}> {eventItem?eventItem.price:"100"}{'$'} </div>
      <div className="col-3 addon_btn">

          <div className="input-group">
          <div className="input-group-append">
              <button disabled={this.state.minusButton} className="btn btn-outline-secondary" style={{background: "#f2efef;"}} value="n" style={{width: "30px;"}} type="button" onClick={()=>this.PlusMinusQuantity('-')}>-</button>
          </div>
          <input type="number" disabled={true} min="1" max="9" className="form-control" onChange={this.onChange}  value={this.state.quantity} aria-describedby="basic-addon2"/>
          <div className="input-group-append">

            <button disabled={this.state.plusButton} className="btn btn-outline-secondary" style={{background: "#f2efef;"}} value="p" style={{width: "30px;"}} type="button" onClick={()=>this.PlusMinusQuantity('+')}>+</button>
          </div>
        </div></div>
  </div>
  </div>



    )
  }

}

export default Items
