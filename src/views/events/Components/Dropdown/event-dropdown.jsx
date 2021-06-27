import React, { Fragment, Component } from 'react';
import PropTypes from "prop-types";
import * as Icon from 'react-feather';
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

        const venueText = this.getVenueName(defaultValue);

        this.setState({
            dropDownText: venueText
        })
    }

    componentDidUpdate(prevProps, nextProps) {
        const { defaultValue } = prevProps;
        const { dropDownText: oldText } = nextProps || {};

        const venueText = this.getVenueName(defaultValue);

        if(venueText !== oldText) {
            this.setState({
                dropDownText: venueText
            })
        }
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
            console.log({
                value
            })
            onChange(value);
        })
    }


    getVenueName = (venue) => {

        const { venues } = this.props;

        const venueName = (venues || []).find((e) => e.id === parseInt(venue));

        const { venue: name } = venueName || {};

        return name || "";

    }

    render() {
        const { dropdownOpen, dropDownText } = this.state;

        const { venues } = this.props;

        return(
            <Dropdown isOpen={dropdownOpen} toggle={this.toggle} className="event-dropdown" onChange={ this.onDropdownChange}>
                <DropdownToggle caret>
                    { dropDownText }
                    <span className="dropdown-icon">
                        <Icon.ChevronDown size="16"/>
                    </span>
                </DropdownToggle>
                <DropdownMenu>
                    {
                        (venues || []).map((e, index) => {
                            const { venue, id } = e || {};
                            
                            return (
                                <DropdownItem key={ index } onClick={ () => this.onDropdownChange(id) }>{  venue }</DropdownItem>
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
