import React , { Component } from 'react';
import { connect } from "react-redux";
import Questions from "./Components/Questions"

import "../../../assets/bookingeventassets/calender/fonts/icomoon/style.css";
import "../../../assets/bookingeventassets/calender/css/rome.css";
import "../../../assets/bookingeventassets/calender/css/style.css";

import "../../../assets/bookingeventassets/paidcss/freecss.css";
import "../../../assets/bookingeventassets/paidcss/sidebar2.css";
import One from '../../../assets/bookingeventassets/assets/1.svg';
import P from '../../../assets/bookingeventassets/assets/p.svg';
import C from '../../../assets/bookingeventassets/assets/c.svg';
import Share from '../../../assets/bookingeventassets/assets/Share.svg';
import Two from '../../../assets/bookingeventassets/assets/2.svg';
import Three from '../../../assets/bookingeventassets/assets/3.jpg';
import Four from '../../../assets/bookingeventassets/assets/4.svg';
import Clock from '../../../assets/bookingeventassets/assets/clock.svg';
import WebC from '../../../assets/bookingeventassets/assets/webc.svg';
import Sec from '../../../assets/bookingeventassets/assets/sec.svg';
import W from '../../../assets/bookingeventassets/assets/w.svg';
import {
 
  Form,
  Button
  
} from "reactstrap";


class EventBookingStep3 extends Component {

  constructor(props) {
  
    super(props)
    this.state = {
      selectDate: new Date(),
      isTimeSlotsAvalaible:false,
      CalendarDate:new Date(),
      eventTestData:this.props.eventTestData,
      eventSecondStepObj:{
        name:"",
        email:"",
        optionalQuestion:"",
        phoneNoPre:"",
        phoneNoPost:""
      }
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectDate: date,
      isTimeSlotsAvalaible:true
    })
  }
  componentDidMount() {
    this.props.hideLoader(1);
    //this.setState({ isShowLoader: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var secondStepJson ={};
    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
      secondStepJson[key]=value;
      //formObject[key]=value
    }
   this.props.getSecondStepData(secondStepJson);
  } 

  
  handleInputChange = (e) => {
    let value = { [e.target.name]: e.target.value };
    value = {
      ...this.state.eventSecondStepObj,
      ...value,
    };

    this.setState({
      eventSecondStepObj: {
        // object that we want to update
        ...this.state.eventSecondStepObj, // keep all other key-value pairs
        ...value, // update the value of specific key
      },
    });

  }

  render() {
const {eventTestData,eventSecondStepObj} =this.state;
    return (
           <div className="right_div">
              <div class="row">
                   <div class="col-12">
                       <nav class="navbar navbar-expand-sm main_noti shadow">
                    <ul class="navbar-nav">
                    <li class="nav-item noti_side">
                      <img   src={One} />
                    </li>

                          <li class="nav-item left_noti"> <span> This is a warning alert — check it out! Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, </span></li>


                  </ul>

              </nav></div>
                   <div class="col-12"><h1>{eventTestData.event_name}</h1></div>
                   <div class="col-12"><img style={{width: "100%;"}}   src={Three} />

                   </div>
                   </div>



                   <div className="row sub_div">
                    <div className="col-sm-12 col-md-12 col-lg-12 main_add">

                        <div className="col-12"><h1 id="sub_head">{eventTestData.event_name}</h1></div>
                     <div className="col-12" style={{margin_bottom: "11px;"}}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row" style={{margin_bottom: "3px;"}}>
                                            <div className="col-1"><img src={Clock}/></div>
                                            <div className="col-11" style={{font_size: "14px",color:"#0C4767",padding_top: "4px;"}}>1 hr and 30 mins</div>
                                           </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row" style={{margin_bottom: "3px;"}}>
                                            <div className="col-1"><img src={WebC}/></div>
                                            <div className="col-11" style={{font_size: "14px",color:"#0C4767",padding_top: "4px;"}}>1 hr and 30 mins</div>
                                           </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-6">
                                   <div className="row">
                                   <div className="col-12">
                                            <div className="row" style={{margin_bottom: "3px;"}}>
                                            <div className="col-1"><img src={Sec}/></div>
                                            <div className="col-11" style={{font_size: "14px",color:"#0C4767",padding_top: "4px;"}}>1 hr and 30 mins</div>
                                           </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row" style={{margin_bottom: "3px;"}}>
                                            <div className="col-1"><img src={W}/></div>
                                            <div className="col-11" style={{font_size: "14px",color:"#0C4767",padding_top: "4px;"}}>1 hr and 30 mins</div>
                                           </div>
                                        </div>

                                   </div>
                               </div>
                            </div>
                        </div>




                       </div>


                        </div>


                        <div className="row sub_div">
                        <div className="col-12 main_add" style={{padding: "15px;"}}>
                         
            <Form onSubmit={this.handleSubmit}>
                            <div className="row">

                                <div className="col-6">

                                        <div className="form-group">
                                          <label for="exampleInputEmail1" style={{color:"#0C4767;"}}>Name <span style={{color:"red"}} >*</span></label>
                                          <input required 
                                          type="text" 
                                          style={{border: "1px solid #edeff2;"}} 
                                          className="form-control" 
                                          name="name"
                                          id="exampleInputEmail1" 
                                          aria-describedby="emailHelp" 
                                          placeholder="Enter Name"
                                          onChange={this.handleInputChange}
                                          value={eventSecondStepObj.name || ""}/>

                                        </div>



                                </div>
                                <div className="col-6">

                                <div className="form-group">
                                          <label for="exampleInputEmail1" style={{color:"#0C4767;"}}>Email <span style={{color:"red"}} >*</span></label>
                                          <input required type="email" 
                                          style={{border: "1px solid #edeff2;"}} 
                                          className="form-control" 
                                          id="exampleInputEmail1" 
                                          name="email"
                                          aria-describedby="emailHelp"
                                          placeholder="Enter Email"
                                          onChange={this.handleInputChange}
                                          value={eventSecondStepObj.email || ""}
                                          />

                                        </div>

                            </div>
                            {
                            eventTestData.questions? eventTestData.questions.map((item, index) => (
                            <Questions QuestionID={item.id} Question={item.question}></Questions>
                                  )):[]
}
                          
                            <div className="col-12">
                                <div className="form-group">
                                    <label for="exampleFormControlTextarea1" style={{color:"#0C4767;"}}>Please share anything that will help prepare for our Meeting.</label>
                                    <textarea 
                                    required
                                     className="form-control" 
                                     style={{border: "1px solid #edeff2;"}} 
                                     id="exampleFormControlTextarea1" 
                                     rows="3"
                                     name="optionalQuestion"
                                     onChange={this.handleInputChange}
                                     value={eventSecondStepObj.optionalQuestion || ""}>
                                       

                                     </textarea>
                                  </div>
                            </div>
                            <div className="col-6">
                                <label for="exampleFormControlTextarea1" style={{color:"#0C4767;"}}>Send text reminder to <span style={{color:"red"}} >*</span></label>
                                <div className="row">
                                    <div className="col-2">
                                        <div className="form-group">

                                            <select 
                                            className="form-control" 
                                            name="phoneNoPre"
                                            style={{border: "1px solid #edeff2;"}} 
                                            id="exampleFormControlSelect1"
                                            onChange={this.handleInputChange}
                                            value={eventSecondStepObj.phoneNoPre || ""}>

                                                <option data-countryCode="DZ" value="213">213</option>
                                                <option data-countryCode="AD" value="376">(+376)</option>
                                                <option data-countryCode="AO" value="244">(+244)</option>
                                                <option data-countryCode="AI" value="1264">(+1264)</option>
                                                <option data-countryCode="AG" value="1268">(+1268)</option>
                                                <option data-countryCode="AR" value="54">(+54)</option>
                                                <option data-countryCode="AM" value="374">(+374)</option>
                                                <option data-countryCode="AW" value="297">(+297)</option>
                                                <option data-countryCode="AU" value="61">(+61)</option>
                                                <option data-countryCode="AT" value="43">(+43)</option>

                                            </select>
                                          </div>
                                    </div>
                                    <div className="col-10" id="country_input">
                                        <input required 
                                        type="text" 
                                        style={{border: "1px solid #edeff2;"}} 
                                        name="phoneNoPost"
                                        className="form-control" 
                                        id="exampleInputEmail1" 
                                        aria-describedby="emailHelp"
                                        onChange={this.handleInputChange}
                                        value={eventSecondStepObj.phoneNoPost || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                            {!this.props.isFreeOrPaidEvent?
                            <div className="col-6" id="s_e_btn">
                                <button  class="btn"  style={{background: "#FE9920",border_color: "#FE9920;"}} >Schedule Event</button>
                            </div>
                            :
                            <>
                            <div className="col-sm-12 col-md-6 col-lg-6" id="copy_link">
                            <label for="exampleInputEmail1" style={{color:"#0C4767"}}> Invite</label>
                            <div className="input-group mb-3 form-group">
                                
                                <input type="text" className="form-control" value="https://meetocto.com/invitation/attende "/>
                                <div className="input-group-append">
                                  <button className="btn btn-outline-secondary" type="button">Copy Link</button>
                                </div>
                              </div>
                        </div>
                        <div class="col-6" id="s_e_btn">
                        
                    <button class="btn" style={{background: "#FE9920",border_color: "#FE9920"}}>Next</button>
                        
                    </div>
                    </>
  }
                            </div>
                     
            </Form>
                        </div>
                       </div>

                   </div>




    );
  }
}

export default EventBookingStep3;
