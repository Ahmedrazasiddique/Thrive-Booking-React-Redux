import React, { Component, Fragment } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import * as Icon from "react-feather";
import NumberField from '../Common/NumberField';


class SectionPricing extends Component {

    removeItem = (index) => {
        const { pricing, onChange } = this.props;

        if(index) {
            const newItems = pricing;
            delete newItems[index];
            onChange(newItems);
        }
    }


    addItem = () => {
        const { pricing, onChange } = this.props;
        
        const item = {
            "item_name": "",
            "price": "",
            "qty": 1
        }

        const newItems = pricing;

        newItems.push(item);

        onChange(newItems);
    }

    handleChange = (target, index) => {
        const { pricing, onChange } = this.props;
        const { name, value } = target || {};
        
        const newItems = (pricing || []).map((e, i) => {
            if(i === index) {
                return {
                    ...e,
                    [name]: value
                }
            } 

            return e;
        })

        onChange(newItems);
    }

    render () {
        const { pricing } = this.props;
        
        return (
            <Fragment>
                { (pricing || []).map((e, index) => { 
                    const { item_name, price, qty } = e || {};
                    return (
                        <Row key = { index } className="pricing">
                            <Col md="4" lg="4">
                                <div className="form-group event-form-group">
                                    <label>Item Name *</label>
                                    <Input
                                        placeholder="Item Name"
                                        required
                                        name="item_name" 
                                        value = { item_name }
                                        onChange = {({ target }) => this.handleChange(target, index) }
                                    />
                                </div>
                            </Col>

                            <Col md="3" lg="3">
                                <div className="form-group event-form-group">
                                    <label>Item Price *</label>
                                    <Input
                                        placeholder="Item Price"
                                        required
                                        name="price" 
                                        value = { price }
                                        onChange = {({ target }) => this.handleChange(target, index) }
                                    />
                                </div>
                            </Col>
                            <Col md="3" lg="3">
                                <div className="form-group event-form-group">
                                    <label>Qty</label>
                                    <NumberField defaultValue = { qty } onChange = { (qty) => {
                                        this.handleChange('qty', qty, index)
                                    }}/>
                                </div>    
                            </Col>
                            <Col md="2" lg="2">
                                <div className="btn-wrapper">
                                    <Button type="button" onClick = { () => this.removeItem(index) } className="btn btn-outline btn-danger btn-icon">
                                        <Icon.Minus size="16"/>
                                    </Button>
                                    <Button type="button" onClick = { this.addItem } className="btn btn-outline btn-success btn-icon">
                                        <Icon.Plus size="16" />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    )
                })} 
            </Fragment>
        )
    }
}

export default SectionPricing;