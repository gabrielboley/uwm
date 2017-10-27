import React, { Component } from 'react';
import { Button, Divider, Modal } from 'semantic-ui-react'
import { CustomerEdit } from './CustomerEdit';
import { CustomerView } from './CustomerView';

import './customerQuickView.css';

export class CustomerQuickView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            customer: {
                name: this.props.customer.name,
                phone: this.props.customer.phone,
                email: this.props.customer.email,
                address: {
                    street1: this.props.customer.address.street1,
                    street2: this.props.customer.address.street2,
                    city: this.props.customer.address.city,
                    state: this.props.customer.address.state
                }
            }
        };
    }
    getEditedCustomer = () => (
        Object.assign({}, this.props.customer, this.state.customer)
    )
    updateCustomerInfo = (e, info) => {
        switch(info) {
            case 'city':
            case 'state':
            case 'street1':
            case 'street2': 
                this.setState({
                    'customer': {
                        ...this.state.customer,
                        'address': {
                            ...this.state.customer.address,
                            [info]: e.target.value
                        }
                    }
                });
                break;
            default:
                this.setState({
                    'customer': {
                        ...this.state.customer,
                        [info]: e.target.value
                    }
                });
        }
    }
    onToggleEdit() {
        this.setState(prevState => ({
            edit: !prevState.edit
        }));
    }
    render (){
        const { customer, viewModal, handleCloseModal, onUserSelection, onUserEdit } = this.props;
        const { name, phone, email, address } = this.state.customer;
        return (
            <Modal open={viewModal} className="customer-quick-view-wrapper">
                <Modal.Header>{ this.state.edit ? 'Edit' : 'View' } Customer</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {this.state.edit
                            ? <CustomerEdit customer={customer}
                                name={name}
                                phone={phone}
                                email={email}
                                street1={address.street1}
                                street2={address.street2}
                                city={address.city}
                                state={address.state}
                                updateCustomerInfo={this.updateCustomerInfo}
                            />
                            : <CustomerView customer={customer} />
                        }
                        <Divider />
                        <Button.Group floated="left">
                            <Button secondary content="Cancel" onTouchTap={handleCloseModal} />
                        </Button.Group>
                        <Button.Group floated="right" className="quick-view-actions">
                            { !this.state.edit ? <Button content="Edit" onTouchTap={() => this.onToggleEdit()}  /> : null }
                            { !this.state.edit 
                                ? <Button primary content="Select" onTouchTap={() => onUserSelection(customer)} />
                                : <Button primary content="Save" onTouchTap={() => onUserEdit(this.getEditedCustomer())} />
                            }
                        </Button.Group>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
