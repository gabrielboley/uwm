import React, { Component } from 'react';
import { Grid, Divider, Form, Checkbox } from 'semantic-ui-react'

import { states } from '../../consts/states';
import { months, days } from '../../consts/dates';
import './addNewCustomer.css';

export class AddNewCustomer extends Component {
    render(){
        return (
            <div className="add-customer-container">
                <div className="content-container">
                    <Grid>
                        <Grid.Column width={10}>
                            <div className="user-info">
                                <Form>
                                    <Form.Input label="Customer Name" placeholder='Customer Name'/>
                                    <Form.Group className="phone-dob">
                                        <Form.Input
                                            width={13}
                                            type="email"
                                            name="email"
                                            label="Email Address"
                                            placeholder='Email Address'
                                        />
                                        <Form.Field
                                            width={3}
                                            className="accepts-email-checkbox"
                                        >
                                            <label className="accept-email">Accepts Email</label>
                                            <Checkbox />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group className="phone-dob">
                                        <Form.Input
                                            placeholder='Phone Number'
                                            label='Phone Number'
                                            width={5}
                                            type="number"
                                            pattern="\d*"
                                        />
                                        <Form.Field
                                            width={3}
                                            className="accepts-sms-checkbox"
                                        >
                                            <label className="accept-sms">Accepts SMS</label>
                                            <Checkbox />
                                        </Form.Field>
                                        <Form.Field
                                            className="date-picker"
                                            width={8}
                                        >
                                            <Form.Select
                                                width={8}
                                                options={months}
                                                className="month"
                                                placeholder='Month'
                                                label='Date of Birth'
                                            />
                                            <Form.Select
                                                width={8}
                                                label="&nbsp;"
                                                options={days}
                                                className="day"
                                                placeholder='Day'
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Divider section={true}/>
                                    <Form.Input
                                        label='Address Line 1'
                                        placeholder='Address Line 1'
                                    />
                                    <Form.Input
                                        label='Address Line 2'
                                        placeholder='Address Line 2'
                                    />
                                    <Form.Input placeholder='City' />
                                    <Form.Group>
                                        <Form.Select
                                            width={11}
                                            label='State'
                                            options={states}
                                            className="state"
                                            placeholder='State'
                                        />
                                        <Form.Input
                                            width={5}
                                            label="Zip"
                                            className="zip"
                                            placeholder="Zip"
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <div className="notes-container">
                                <div className="notes">
                                    <Form.TextArea
                                        placeholder='Notes'
                                    />
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        );
    }
}
