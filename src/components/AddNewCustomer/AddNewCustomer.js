/* eslint-disable  */
import React, { Component } from 'react';
import { Button, Divider, Form, Checkbox } from 'semantic-ui-react'

import './addNewCustomer.css';
import { states } from '../../consts/states';
import { months, days } from '../../consts/dates';
import { isValidEmail } from '../../utils/isValidEmail';
import { addNewCustomer } from './addNewCustomer.actions';

const validation = {
    email: 1,
    name: 1,
    phone: 1
};

window.validation = validation;

export class AddNewCustomer extends Component {
    state = {
        valid: false,
        state: null,
        month: null,
        day: null
    }

    shouldComponentUpdate = (nextProps, nextState) => nextState.valid !== this.state.valid;

    updateMonthDayState = (e, value, field) => this.setState({ [field]: value });

    checkValidation = (e, field) => {
        e.preventDefault();
        e.stopPropagation();
        const value = e.target.value;

        switch (field) {
            case 'email': {
                if (isValidEmail(value)) {
                    validation.email = 0;
                } else {
                    validation.email = 1;
                }
                break;
            }
            case 'name': {
                if (value.length >= 3) {
                    validation.name = 0;
                } else {
                    validation.name = 1;
                }
                break;
            }
            case 'phone': {
                if (value.length >= 10) {
                    validation.phone = 0;
                } else {
                    validation.phone = 1;
                }
                break;
            }
        }

        const valid = Object.values(validation).every(num => num === 0);
        this.setState({ valid });
    }

    onFormSubmit = (e) => {
        const customer = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            dob: `${this.state.month}/${this.state.day}`,
            address: {
                street1: e.target['address-1'].value,
                street2: e.target['address-2'].value,
                city: e.target.city.value,
                state: this.state.state,
                zip: e.target.zip.value
            },
            acceptSms: e.target.sms.checked,
            acceptEmail: e.target.acceptEmail.checked,
            notes: e.target.notes.value
        };
        console.log('customer', customer); // eslint-disable-line no-console
        this.props.dispatch(addNewCustomer(customer));
    }

    renderSaveButton = () => {
        if (!this.state.valid) {
            return null;
        }
        return (
            <div className="add-customer-button-wrapper">
                <Form.Button
                    primary
                    size="huge"
                    className="save-new-customer"
                    onTouchTap={this.onAnotherItem}
                >
                    Add Customer
                </Form.Button>
            </div>
        );
    }

    render() {
        return (
            <div className="add-customer-container">
                <div className="content-container">
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Input
                            required
                            name="name"
                            label="Customer Name"
                            placeholder="Customer Name"
                            onChange={e => this.checkValidation(e, 'name')}
                        />
                        <Form.Input
                            required
                            name="email"
                            label="Email"
                            placeholder="Email"
                            onChange={e => this.checkValidation(e, 'email')}
                        />
                        <Form.Group widths='equal'>
                            <Form.Input
                                width={6}
                                required
                                name="phone"
                                type="number"
                                label="Phone Number"
                                placeholder="Phone Number"
                                onChange={e => this.checkValidation(e, 'phone')}
                            />
                            <Form.Field
                                className="date-picker"
                                width={10}
                            >
                                <Form.Select
                                    width={8}
                                    name="month"
                                    options={months}
                                    className="month"
                                    placeholder="Month"
                                    label="Date of Birth"
                                    onChange={(e, { value }) => this.updateMonthDayState(e, value, 'month')}
                                />
                                <Form.Select
                                    width={8}
                                    name="day"
                                    label="&nbsp;"
                                    options={days}
                                    className="day"
                                    placeholder="Day"
                                    onChange={(e, { value }) => this.updateMonthDayState(e, value, 'day')}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths={4}>
                            <Form.Field>
                                <label className="accept-sms">Accepts SMS</label>
                                <Checkbox
                                    toggle
                                    name="sms"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label className="accept-email">Accepts Email</label>
                                <Checkbox
                                    toggle
                                    name="acceptEmail"
                                />
                            </Form.Field>
                        </Form.Group>
                        <Divider section={true} className="new-customer-divider"/>
                        <Form.Input
                            name="address-1"
                            label="Address Line 1"
                            placeholder="Address Line 1"
                        />
                        <Form.Input
                            name="address-2"
                            label="Address Line 2"
                            placeholder="Address Line 2"
                        />
                        <Form.Input
                            name="city"
                            label="City"
                            placeholder='City'
                        />
                        <Form.Group>
                            <Form.Select
                                width={11}
                                name="state"
                                label="State"
                                options={states}
                                className="state"
                                placeholder='State'
                                onChange={(e, { value }) => this.updateMonthDayState(e, value, 'state')}
                            />
                            <Form.Input
                                width={5}
                                label="Zip"
                                name="zip"
                                className="zip"
                                placeholder="Zip"
                            />
                        </Form.Group>
                        <Form.TextArea
                            name="notes"
                            placeholder='Notes'
                        />
                        {this.renderSaveButton()}
                    </Form>
                </div>
            </div>
        );
    }
}
