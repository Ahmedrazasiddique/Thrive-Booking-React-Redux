import React, { Component, Fragment } from 'react';
import { Row, Col, FormGroup } from 'reactstrap';
import InviteModal from '../Modals/InviteModal';


class InvitesList extends Component {
    handleChange = ({ target }) => {
        const { index, onChange } = this.props;
        const { name, value } = target || {};
        onChange (name, value, index);
    }
    render () {
        const { data } = this.props;
        const { first_name, last_name, email } = data || {};
        return (
            <Fragment>
                <div className="padding-zero">
                    <Row>
                        <Col md="6" lg="6">
                            <FormGroup>
                                <label>
                                    First Name
                                </label>
                                <input type="text" className="form-control" value={ first_name } name="first_name" onChange = { this.handleChange } placeholder="First Name"/>
                            </FormGroup>
                        </Col>
                        <Col md="6" lg="6">
                            <FormGroup>
                                <label>
                                    Last Name
                                </label>
                                <input type="text" className="form-control" value={ last_name } onChange = { this.handleChange } name="last_name" placeholder="Last Name"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6" lg="6">
                            <FormGroup>
                                <label>
                                    Email Address
                                </label>
                                <input type="email" className="form-control" value={ email } onChange = { this.handleChange } name="email" placeholder="Email Address"/>
                            </FormGroup>
                        </Col>
                        <Col md="6" lg="6">
                            <div className="form-group">
                                <InviteModal data = { data } onChange = { (event) => this.handleChange(event) }/>
                            </div>
                        </Col>
                    </Row>   
                </div>
            </Fragment>
        )
    }
}


export default InvitesList;