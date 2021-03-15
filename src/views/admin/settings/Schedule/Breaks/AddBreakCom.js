
  import React from "react"
  import { Table } from "reactstrap"
  import Flatpickr from "react-flatpickr";
  import Toggle from "react-toggle"

  class AddBreakCom extends React.Component {

    constructor(props)
    {
        super(props);
    }

    state = {
        StartTIme : new Date(),
        EndTime:new Date(),
        IsOffDay:true,
        BreaksData:this.props.BreaksData

    }

    componentDidMount()
    {
       // this.setState({BreaksData:this.props.BreaksData})
    }

    render() {
     
        const{Breaks,Day}=this.state;
      return  (
       
          <tbody>
                 <tr>
<td>{this.state.BreaksData.Day}</td>
<td></td>
<td>  <Flatpickr
              className="form-control"
             
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
              }}
              value={this.state.StartTIme}
              onChange={date => {
                this.setState({ StartTIme : date });
              }}
            /></td>
<td>   <Flatpickr
              className="form-control"
             
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
              }}
              value={this.state.StartTIme}
              onChange={date => {
                this.setState({ StartTIme : date });
              }}
            /></td>
<td>  <p className={"text-success"}>Add Breaks</p></td>

                 </tr>
                 {this.state.BreaksData.Breaks.map((key,value) => (
            <tr>
              <th>{value.Day}</th>
              <td> <label className="react-toggle-wrapper d-inline-block align-middle">
            <Toggle defaultChecked={this.state.IsOffDay} />
          </label></td>
              <td>   <Flatpickr
              className="form-control"
             
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
              }}
              value={this.state.StartTIme}
              onChange={date => {
                this.setState({ StartTIme : date });
              }}
            /></td>
              <td> <Flatpickr
              className="form-control"
             
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
              }}
              value={this.state.EndTime}
              onChange={date => {
                this.setState({ EndTime : date });
              }}
            /></td>
              <td><p className={"text-danger"}>Delete Breaks</p></td>
            </tr>
                   ))  }
          </tbody>
      
      )
    }
  }
  export default AddBreakCom