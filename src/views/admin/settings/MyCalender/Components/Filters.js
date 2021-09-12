import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-date-picker";
//import YearPicker from "react-year-picker";
import Select from "react-select";

class Filters extends React.Component {
  constructor(props) {
    super(props);

  }
  state = {
    selected_month:"",selected_year:"",staff:"",selected_date:"",
    Years:[{
        "label": "2020",
        "value":"2020",
    },
    {
        "label": "2021",
        "value":"2021",
    },{
        "label": "2022",
        "value":"2022",
    },{
        "label": "2023",
        "value":"2023",
    },{
        "label": "2024",
        "value":"2024",
    },{
        "label": "2025",
        "value":"2025",
    },{
        "label": "2026",
        "value":"2026",
    },{
        "label": "2027",
        "value":"2027",
    },{
        "label": "2028",
        "value":"2028",
    },{
        "label": "2029",
        "value":"2029",
    },{
        "label": "2030",
        "value":"2030",
    },{
        "label": "2031",
        "value":"2031",
    },{
        "label": "2032",
        "value":"2032",
    },{
        "label": "2033",
        "value":"2033",
    },{
        "label": "2034",
        "value":"2034",
    },{
        "label": "2035",
        "value":"2035",
    },{
        "label": "2036",
        "value":"2036",
    },{
        "label": "2037",
        "value":"2037",
    },{
        "label": "2038",
        "value":"2038",
    },{
        "label": "2039",
        "value":"2039",
    },{
        "label": "2040",
        "value":"2040",
    },
],
    Months:[
        {
            "abbreviation": "Jan",
            "label": "January",
            "value":"01"
        },
        {
            "abbreviation": "Feb",
            "label": "February",
            "value":"02"
        },
        {
            "abbreviation": "Mar",
            "label": "March",
            "value":"03"
        },
        {
            "abbreviation": "Apr",
            "label": "April",
            "value":"04"
        },
        {
            "abbreviation": "May",
            "label": "May",
            "value":"05"
        },
        {
            "abbreviation": "Jun",
            "label": "June",
            "value":"06"
        },
        {
            "abbreviation": "Jul",
            "label": "July",
            "value":"07"
        },
        {
            "abbreviation": "Aug",
            "label": "August",
            "value":"08"
        },
        {
            "abbreviation": "Sep",
            "label": "September",
            "value":"09"
        },
        {
            "abbreviation": "Oct",
            "label": "October",
            "value":"10"
        },
        {
            "abbreviation": "Nov",
            "label": "November",
            "value":"11"
        },
        {
            "abbreviation": "Dec",
            "label": "December",
            "value":"12"
        }
    ]
  }
  changeMonth = (event) => {
    this.setState({ selected_month: event });
  };
  changeYear = (event) => {
       
    this.setState({ selected_Year: event });
  };


  changeStaff = (event) => {
    this.setState({ staff: event.target.value });
  };

  search =()=>{
    const {selected_year,staff,selected_month,selected_date}=this.state || {};
    if(this.props.isCalendarView) 
    this.props.searchFilter({selected_year:selected_year.value,staff:staff,selected_month:selected_month.value});
    else
    this.props.searchFilter({staff:staff,selected_date:selected_date});
  }
  
      render()
      {
return (

    <div class="rd_vacationfilterpart rd_calendartabthing1">
        <div class="rd_calendarpafilterth">
            <h5>Filter</h5>
            <div class="rd_calendarpafilterthitems">


                <div class="rd_calendarpafilterthitemsitem" >
                    <p>By staff</p>
                    <div class="rd_profilethingco">
                      <input type="text" name="" id="" onChange={this.changeStaff} name="staff" class="rd_adddayofinput" placeholder="User name"/>
                    </div>
                </div>
                {
    this.props.isCalendarView?
    <>
                <div class="rd_calendarpafilterthitemsitem" >
                    <p>Month</p>
                    <Select
                      className="language rd_adddayofinput"
                      classNamePrefix="select"
                      //   defaultValue={companyInfo.language}
                      value={this.state.selected_month || ""}
                      name="selected_month"
                      options={this.state.Months}
                      onChange={this.changeMonth}
                    />
                </div>
                <div class="rd_calendarpafilterthitemsitem" >
                    <p>Year</p>
                    <Select
                      className="language rd_adddayofinput"
                      classNamePrefix="select"
                      //   defaultValue={companyInfo.language}
                      value={this.state.selected_year || ""}
                      name="selected_year"
                      options={this.state.Years}
                      onChange={this.changeYear}
                    />
                {  /* <YearPicker onChange={(year) => {
                    this.setState({ selected_year: year })}} />
                */}
                </div>
                </>
                :<></>
      }
{
    !this.props.isCalendarView?
                <div class="rd_calendarpafilterthitemsitem" >
                    <p>Date</p>
                    <DatePicker required value={this.state.selected_date} name="date" onChange={(date) => {
                    this.setState({ selected_date: date });
                  }} />
                </div>
:<></>
}              
<div class="rd_calendarpafilterthitemsitem" >
<p>Search</p>
<div class="buttonnotgcont"><button onClick={this.search} class="rd_searchButton "><span>Search</span></button></div>
</div>
            </div>

        </div>



    </div>





    



);
      }
  
}

export default Filters;