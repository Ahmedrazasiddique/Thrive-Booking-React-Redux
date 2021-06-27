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
        const { data, touched } = this.props;
        const { first_name, last_name, email } = data || {};
        return (
            <div className="invite-wrapper">
                <h3>Invitees</h3>
                <div className="padding-zero">
                    <Row>
                        <Col md="6" lg="6">
                            <FormGroup>
                                <label>
                                    First Name
                                </label>
                                <input type="text" className="form-control" value={ first_name } name="first_name" onChange = { this.handleChange } placeholder="First Name"/>
                                { (first_name === "" && touched[first_name]) && <div className="help-block text-danger">
                                        First Name is required.
                                    </div>}
                            </FormGroup>

                            {/* <FormField 
                                type="text"
                                name="first_name"
                                label="First Name *"
                                placeholder="First Name"
                                showLabel={true}
                                value={ first_name }
                                errors={errors}
                                touched={touched}
                                onChange = { this.handleChange }
                            /> */}
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
                        <Col md="12" lg="12">
                            <FormGroup>
                                <label>
                                    Email Address
                                </label>
                                <input type="email" className="form-control" value={ email } onChange = { this.handleChange } name="email" placeholder="Email Address"/>
                            </FormGroup>
                        </Col>
                        
                    </Row>   
                </div>
            </div>
        )
    }
}


export default InvitesList;