import React , { Component } from 'react';
import { connect } from "react-redux";
import PayPal from '../../../../assets/bookingeventassets/assets/PayPal.svg';
import credit from '../../../../assets/bookingeventassets/assets/credit.svg';
import path from '../../../../assets/bookingeventassets/assets/path.svg';
import {
 
  Form,
  Button
  
} from "reactstrap";
class PaymentSection extends Component {

  constructor(props) {
    super(props);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    var paymentStepJson ={};
    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
      paymentStepJson[key]=value;
      //formObject[key]=value
    }
    this.props.checkCart(paymentStepJson);
//   this.props.getSecondStepData(secondStepJson);
  } 

  render() {

    return (
          <div class="col-sm-12 col-md-6 col-lg-6 main_add" style={{background: "#fafafa;"}}>
          <div class="col-12" style={{border_bottom: "1px solid #d9d9d9;"}}><h1 id="sub_head">Payment Method</h1>
          </div>

          <div class="col-12" style={{background: "white",border_bottom: "1px solid #d9d9d9",padding_top: "10px;"}}>

              <div class="row">
                {/*
                 <div class="col-12" style={{background: "white",border_bottom: "1px solid #d9d9d9",padding_top: "3px",padding_left: "19px;"}}>

                  <div class="form-check" style={{margin_bottom: "10px;"}}>
                      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                      <label class="form-check-label" for="exampleRadios1">
                        <img src={PayPal}/>
                      </label>
                    </div>
              </div>
                */ }

                  <div class="col-12" style={{background: "white",border_bottom: "1px solid #d9d9d9",padding_top: "20px",padding_left: "19px;"}}>
                      <div class="row"  style={{margin_bottom: "10px;"}}>
                          <div class="col-6">
                              <div class="form-check" style={{margin_top: "3px;"}}>
                                  <input class="form-check-input" type="radio" name="exampleRadios" checked={true} id="exampleRadios2" value="option2"/>
                                  <label class="form-check-label" for="exampleRadios2" style={{color:"#0C4767;"}}>
                                      Credit or Debit Card
                                  </label>
                                </div>
                          </div>
                          <div class="col-6">
                              <img style={{width: "100%;"}} src={credit}/>
                          </div>

                      </div>


                  </div>
                  <div class="col-12" style={{background: "white",border_bottom: "1px solid #d9d9d9",padding_top: "20px",padding_left: "19px;"}}>
                  <Form onSubmit={this.handleSubmit}>
                      <div class="row">

                   
                          <div class="col-12">
                              <div class="form-group">
                              <label for="basic-url" style={{color: "#0C4767"}}>Card Number</label>
                              <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><img src={path}/></span>
                                  </div>
                                  <input type="number" maxlength='12'  required name={'card_number'} class="form-control" placeholder="**** **** **** ****" aria-label="Username" aria-describedby="basic-addon1"/>
                                </div>

                            </div>
                            </div>
                            <div class="col-4" style={{margin_bottom: "10px;"}}>
                              <div class="form-group">
                                  <label for="exampleInputEmail1" style={{color: "#0C4767"}}>CVC</label>
                                  <input type="number" maxlength='6' name={'cvc'} required  class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="000"/>

                                </div>
                          </div>
                          <div class="col-3">
                              <div class="form-group">
                                  <label for="exampleInputEmail1" style={{color: "#0C4767"}}>Exp. Month</label>
                                  <input type="number" maxlength='2' required name={'exp_month'} class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="11"/>
                                 
                                </div>
                          </div>
                          /
                          <div class="col-3">
                              <div class="form-group">
                                  <label for="exampleInputEmail1" style={{color: "#0C4767"}}>Exp. Year</label>
                                  <input type="number" maxlength='4'  required name={'exp_year'} class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="2021"/>
                                 
                                </div>
                          </div>
                      </div>

                      <button className="btn"  style={{background: "#FE9920",border_color: "#FE9920",margin_bottom: "15px;"}}>Buy Now</button>
                      </Form>
                  </div>
                  
            


              </div>
          </div>



          </div>
    )
  }
}
export default PaymentSection
