import React , { Component } from 'react';
import { connect } from "react-redux";



import path2 from '../../../assets/bookingeventassets/assets/path2.svg';
import sec from '../../../assets/bookingeventassets/assets/sec.svg';
import webc from '../../../assets/bookingeventassets/assets/webc.svg';
import Share from '../../../assets/bookingeventassets/assets/Share.svg';
import Two from '../../../assets/bookingeventassets/assets/2.svg';
import Three from '../../../assets/bookingeventassets/assets/3.jpg';
import Four from '../../../assets/bookingeventassets/assets/4.svg';
import Clock from '../../../assets/bookingeventassets/assets/clock.svg';
import WebC from '../../../assets/bookingeventassets/assets/webc.svg';
import Sec from '../../../assets/bookingeventassets/assets/sec.svg';
import W from '../../../assets/bookingeventassets/assets/w.svg';



class EventBookingFinal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventTestData:this.props.eventTestData,
      
    };
  }

  render() {

    const {eventTestData} =this.state
    return (
      
<div className="right_div">
                    <div className="col-sm-12 col-md-12 col-lg-12 main_add" style={{background: "#fafafa;"}}>

                      <div className="col-12" style={{text_align: "center",margin_bottom: "10px;"}}>
                        <img src={path2} />
                      </div>
                        <div className="col-12" style={{margin_bottom: "10px;"}}><h1 id="sub_head" style={{text_align: "center",font_weight: "600",letter_spacing: "1px;"}}>Confirmed</h1>
                        </div>
                        <div className="col-12" style={{margin_bottom: "10px;"}}><p style={{text_align: "center",color: "black;"}}>You Are Scheduled With Reda.</p>
                        </div>
                        <div className="col-12" style={{margin_bottom: "25px;"}}>
                          <div className="row add_cal">
                            <div className="col-5" style={{text_align: "end",padding_right: "4px" ,margin_top: "-2px;"}}><img src={sec}/></div>
                            <div className="col-6" style={{padding_left: "0px",color:"#0C4767"}}>Add To Your Calendar</div>
                          </div>
                        </div>
                        {/*
                        <div className="col-12" style={{margin_bottom: "25px;"}}>
                         <div className="row" style={{justify_content: "center;"}}>
                           <div className="col-5" style={{border_top:"1px solid #dddddd;"}}>

                           </div>
                         </div>
                        </div>
                        */}
                        <div className="col-12" style={{margin_bottom: "10px;"}}>
                          <div className="row">
                            <div className="col-8" style={{padding_right: "0px;"}}>
                              <h1 id="sub_head" style={{text_align: "center;"}}>{eventTestData.event_name}</h1>
                            </div>
                          </div>

                        </div>
                        {/*
                        <div className="col-12" style={{margin_bottom: "10px;"}}>
                          <div className="row">
                            <div className="col-12">
                                <div className="row"style={{margin_bottom: "3px",margin_right: "37px;"}}>
                                <div className="col-4" style={{text_align: "end;"}}><img src="assets/sec.svg"/></div>
                                <div className="col-8" style={{font_size: "14px",color:"#0C4767",padding_top: "4px;"}}>1:00pm - 1:30pm, Wednesday, January 13, 2021</div>
                               </div>
                            </div>

                        </div>
                        </div>

                        <div className="col-12" style={{margin_bottom: "10px;"}}>
                          <div className="row">
                            <div className="col-12">
                                <div className="row"style={{margin_bottom: "3px",margin_right: "37px;"}}>
                                <div className="col-4" style={{text_align: "end;"}}><img src="assets/w.svg"/></div>
                                <div className="col-8" style={{font_size: "14px",color:"#0C4767",padding_top: "4px;"}}>1:00pm - 1:30pm, Wednesday, January 13, 2021</div>
                               </div>
                            </div>
                        </div>
                        </div>
                        */}
                        <div className="col-12" style={{margin_bottom: "10px;"}}>
                          <div className="row">
                            <div className="col-12">
                                <div className="row"style={{margin_bottom: "3px",margin_right: "37px;"}}>
                                <div className="col-4" style={{text_align: "end;"}}><img src={webc}/></div>
                                <div className="col-8" style={{font_size: "14px",color:"#0C4767",padding_top: "4px;"}}>Web Conferencing Details Provided Upon Confirmation.</div>
                               </div>
                            </div>

                        </div>

                        </div>


                        <div className="col-12" style={{margin_bottom: "25px;"}}>
                          <div className="row" style={{justify_content: "center;"}}>
                            <div className="col-5" style={{border_top:"1px solid #dddddd;"}}>

                            </div>
                          </div>
                         </div>
                         <div className="col-12" style={{margin_bottom: "10px;"}}>
                          <div className="row">
                            <div className="col-8 snd_text_head" style={{padding_right: "0px;"}}>
                              <h1  style={{text_align: "center",font_size: "20px;"}}>Simple. Automated. Scheduling</h1>
                            </div>
                          </div>

                        </div>
                        <div className="col-12" style={{margin_bottom: "10px;"}}>
                          <div className="row snd_input">
                            <div className="col-8" style={{padding_right: "0px;"}}>
                              <div className="form-group">

                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="test@gmail.com"/>

                              </div>
                            </div>
                          </div>

                        </div>
                        <div className="col-12" style={{margin_bottom: "10px;"}}>
                          <div className="row snd_input">
                            <div className="col-8" style={{padding_right: "0px;"}}>
                              <button type="button" className="btn btn-info btn-block"  style={{background: "#FE9920",border_color: "#FE9920",margin_bottom: "15px;"}}>Try It Now</button>
                            </div>
                          </div>

                        </div>

                        </div>




                        </div>
    )
  }
}

export default EventBookingFinal
