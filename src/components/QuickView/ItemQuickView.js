import React, { Component } from 'react';
import { Button, Divider, Header, Modal, List, Icon } from 'semantic-ui-react'

import './itemQuickView.css';

export class ItemQuickView extends Component {
    render (){
        const { customer, viewModal, handleCloseModal, onUserSelection } = this.props;
        return (
            <Modal open={viewModal} className="item-quick-view-wrapper">
                <Modal.Header>Customer</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>
                            <Icon name="user" />
                        </Header>
                        <List>
                            <List.Item>
                                <List.Icon name='phone' />
                            </List.Item>
                            <List.Item>
                                <List.Icon name='mail' />
                            </List.Item>
                            <List.Item>
                                <List.Icon name='marker' />
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
