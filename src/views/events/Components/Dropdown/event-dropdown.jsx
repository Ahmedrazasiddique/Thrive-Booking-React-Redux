import React, { Fragment, Component } from 'react';
import PropTypes from "prop-types";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class EventDropDownComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venues: [],
            dropdownOpen: false,
            dropDownText: "Choose Venue"
        } 
    }

    componentDidMount() {
        const { defaultValue } = this.props;

        this.setState({
            dropDownText: defaultValue
        })
    }

    
    toggle = () => {
        const { dropdownOpen } = this.state;
       this.setState({
           dropdownOpen: !dropdownOpen
       })
    }

    onDropdownChange = (value) => {
        const { onChange } = this.props;
        this.setState({
            dropDownText: value
        }, () => {
            onChange(value);
        })
    }


    getVenueName = (venue) => {

        const { venues } = this.props;

        const venueName = (venues || []).find((e) => e.id === parseInt(venue));

        const { venue: name } = venueName || {};

        console.log({
            venues,
            venueName
        });

        return name || "";

    }

    render() {
        const { dropdownOpen, dropDownText } = this.state;

        const { venues } = this.props;

        console.log({
            dropDownText
        });

        return(
            <Dropdown isOpen={dropdownOpen} toggle={this.toggle} className="event-dropdown" onChange={ this.onDropdownChange}>
                <DropdownToggle caret>
                    { this.getVenueName(dropDownText) }
                </DropdownToggle>
                <DropdownMenu>
                    {
                        (venues || []).map((e, index) => {
                            const { venue } = e || {};
                            return (
                                <DropdownItem key={ index } onClick={ () => this.onDropdownChange(venue) }>{  venue }</DropdownItem>
                            )
                        })
                    }
                
                </DropdownMenu>
            </Dropdown>    
        )
    }
}

EventDropDownComponent.propTypes = {
    venues: PropTypes.any,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

export default EventDropDownComponent;
