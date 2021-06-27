import React , { Component } from 'react';
import { connect } from "react-redux";
import {
    Table,
  } from "reactstrap";
import { ThriveLink_SUCCESS } from '../../../../constants/myThriveLink';

class OrderSummary extends Component {

  constructor(props) {
      
    super(props);
    
    this.state = {
     fullPayment:true,
     partialPayment:false,
     OrderSummaryAddon:this.props.OrderSummaryAddon,
     OrderSummaryPricing:this.props.OrderSummaryPricing,
     TotalPrice:0,
     FinalTotal:0
    }
    
  }
  componentDidMount() {
console.log(this.props.OrderSummaryAddon);   
}
componentDidUpdate(previousProp)
{
    if (previousProp !== this.props) {
    var total = 0;
    this.props.OrderSummaryAddon.forEach(element => {
        total+=parseInt(element.addon_qty)*parseInt(element.addon_price)
    });
    
    this.props.OrderSummaryPricing.forEach(element => {
        total+=parseInt(element.item_qty)*parseInt(element.item_price)
    });

    this.setState(

        {TotalPrice:total}
    )
    
    if(this.state.fullPayment){
    this.setState(

        {FinalTotal:total}
    )
    
    }else
    {
        this.setState(

            {FinalTotal:(total*0.4)}
        )
    }

}
}
  setPayment(event) {
      if(event.target.value=='full')
      {
          this.setState({fullPayment:true})
          this.setState({partialPayment:false})
          this.setState({FinalTotal:this.state.TotalPrice});
      }
      else
      {
          
        this.setState({fullPayment:false})
        this.setState({partialPayment:true})
        this.setState({FinalTotal:(this.state.TotalPrice*0.4)});
      }
    console.log(event.target.value);
  }
  render() {
    
        return (
            <>
            <h2 >Order Summary</h2>
          

<Table  striped responsive>

<thead>
              <tr>
                <th>QTY</th>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>

<tbody>
             {this.props.OrderSummaryAddon?this.props.OrderSummaryAddon.map((item, index) => (
                <tr>
                  <td>{item.addon_qty}</td>
                  <td>Add on</td>
                  <td>{item.addon_price}</td>
                </tr>
  )):[]}
  {this.props.OrderSummaryPricing?this.props.OrderSummaryPricing.map((item, index) => (
                <tr>
                  <td>{item.item_qty}</td>
                  <td>Pricing</td>
                  <td>{item.item_price}</td>
                </tr>
  )):[]}
            </tbody>
          </Table>
          <Table  striped responsive>

<thead>
              <tr>
                <th>Total</th>
                <th></th>
                <th>{this.state.TotalPrice}</th>
              </tr>
            </thead>
            </Table>

            <th>Full/Partial</th>


            <div onChange={this.setPayment.bind(this)}>
      <div>  <input type="radio" checked={this.state.fullPayment} value="full" name="paymentType"/> Full Payment</div>
      <div>  <input type="radio" checked={this.state.partialPayment} value="partial" name="paymentType"/> Partial Payment (40% of total price)</div>
      </div>
         
          <Table  striped responsive>

<thead>
              <tr>
                <th>Final Total</th>
                <th></th>
                <th>{this.state.FinalTotal}</th>
              </tr>
            </thead>
            </Table>
          </>
         
        )
    }
}


export default OrderSummary;