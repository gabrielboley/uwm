import React, { Component } from 'react';
import { Button, Divider, Modal } from 'semantic-ui-react'
import { CustomerEdit } from './CustomerEdit';
import { CustomerView } from './CustomerView';

import { deleteCustomer } from './customerQuickView.actions';

import './customerQuickView.css';

export class CustomerQuickView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'default',
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
            },
            customerIndex: this.props.customerIndex
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
    onConfirmDelete() {
        this.props.dispatch(deleteCustomer(this.state.customerIndex));
        this.props.handleCloseModal();
    }
    onUserEdit() {
        this.setState({
            view: 'edit'
        });
    }
    onUserDelete() {
        this.setState({
            view: 'delete-confirm'
        });
    }
    renderButtons() {
        const { customer, onUserSelection, onUserEdit } = this.props;
        switch(this.state.view) {
            case 'delete-confirm': {
                return null;
            }
            case 'edit': {
                return <div>
                    <Button.Group floated="right" className="quick-view-actions">
                        <Button primary content="Save" onTouchTap={() => onUserEdit(this.getEditedCustomer())} />
                    </Button.Group>
                    <Button.Group floated="right" className="delete-customer">
                        <Button negative content="Delete Customer" onTouchTap={() => this.onUserDelete()}  />
                    </Button.Group>;
                </div>
            }
            default: 
                return <Button.Group floated="right" className="quick-view-actions">
                    <Button content="Edit/Delete" onTouchTap={() => this.onUserEdit()}  />
                    <Button primary content="Select" onTouchTap={() => onUserSelection(customer)} />
                </Button.Group>;
        }
    }
    renderContent() {
        const { customer, handleCloseModal } = this.props;
        const { name, phone, email, address } = this.state.customer;
        switch(this.state.view) {
            case 'delete-confirm': {
                return <div className={this.state.view}>
                    <div className="confirm-message">Are you sure you want to delete {name}?</div>
                    <div className="confirm-delete-customer">
                        <Button.Group floated="left">
                                <Button secondary size="huge" content="No, Cancel" onTouchTap={handleCloseModal} />
                            </Button.Group>
                        <Button.Group floated="right">
                            <Button negative size="huge" content="Yes, Delete" onTouchTap={() => this.onConfirmDelete()}  />
                        </Button.Group>
                    </div>
                </div>;
            }
            case 'edit': {
                return <CustomerEdit customer={customer}
                    name={name}
                    phone={phone}
                    email={email}
                    street1={address.street1}
                    street2={address.street2}
                    city={address.city}
                    state={address.state}
                    updateCustomerInfo={this.updateCustomerInfo}
                />
            }
            default: 
                return <CustomerView customer={customer} />
        }
    }
    renderHeader() {
        switch(this.state.view) {
            case 'delete-confirm': {
                return null;
            }
            case 'edit': {
                return <Modal.Header>Edit Customer</Modal.Header>;
            }
            default: 
                return <Modal.Header>View Customer</Modal.Header>;
        }
    }
    render (){
        const { viewModal, handleCloseModal } = this.props;
        return (
            <Modal open={viewModal} className="customer-quick-view-wrapper">
                {this.renderHeader()}
                <Modal.Content>
                    <Modal.Description>
                        {this.renderContent()}
                        {this.state.view !== 'delete-confirm' && <Divider />}
                        {this.state.view !== 'delete-confirm' 
                            && (<Button.Group floated="left">
                                <Button secondary content="Cancel" onTouchTap={handleCloseModal} />
                            </Button.Group>)
                        }
                        {this.renderButtons()}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
