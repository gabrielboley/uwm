import React, { Component } from 'react';
import { Button, Divider, Header, Modal, List, Icon } from 'semantic-ui-react'

import './customerQuickView.css';

export class CustomerQuickView extends Component {
    render (){
        const { customer, viewModal, handleCloseModal, onUserSelection } = this.props;
        return (
            <Modal open={viewModal} className="customer-quick-view-wrapper">
                <Modal.Header>Customer</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>
                            <Icon name="user" />
                            {customer.name}
                        </Header>
                        <List>
                            <List.Item>
                                <List.Icon name='phone' />
                                <List.Content>{customer.phone}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='mail' />
                                <List.Content>{customer.email}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='marker' />
                                <List.Content>{customer.address.city}, {customer.address.state}</List.Content>
                            </List.Item>
                        </List>
                        <Divider />
                        <Button.Group floated="left">
                            <Button secondary content="Cancel" onTouchTap={handleCloseModal} />
                        </Button.Group>
                        <Button.Group floated="right" className="quick-view-actions">
                            <Button content="Edit" />
                            <Button primary content="Select" onTouchTap={() => onUserSelection(customer)} />
                        </Button.Group>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
