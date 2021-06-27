
import React , { Component } from 'react';
import { connect } from "react-redux";

class Questions extends Component {

  constructor(props) {
    super(props)
  }
  render() {

    return (

        <div class="col-12">

                <div class="form-group">
                  <label required for="exampleInputEmail1" style={{color:"#0C4767;"}}> {this.props.Question}</label>
                  <input type="text" name={"QuestionID_"+this.props.QuestionID} style={{border: "1px solid #edeff2;"}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>

                </div>



        </div>

 )
  }

}

export default Questions
