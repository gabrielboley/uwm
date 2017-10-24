import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

import './itemQuickView.css';
import { AddItem } from '../../pages/CreateOrder/views/AddItem';

export class ItemQuickView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItem: null,
            originalItem: this.props.item
        }
    }

    captureNewItem(newItem) {
        this.setState({
            newItem
        });
    }

    saveNewItem() {
        if (this.state.newItem) {
            this.props.handleAddItem(this.state.newItem, this.props.itemKey);
        }
        this.props.handleCloseModal();
    }

    render (){
        const { item, products, viewModal } = this.props;
        return (
            <Modal open={viewModal} className="item-quick-view-wrapper">
                <Modal.Header>Edit Order Item</Modal.Header>
                <Modal.Content>
                    <AddItem 
                        handleAddItem={(newItem) => this.captureNewItem(newItem)}
                        item={item}
                        products={products}
                        editItem
                    />
                    <Button
                        size="large"
                        content="Save Change"
                        className="add-another primary"
                        onTouchTap={() => this.saveNewItem()}
                    />
                    <Button
                        size="large"
                        content="Cancel"
                        className="cancel"
                        onTouchTap={this.props.handleCloseModal}
                    />
                </Modal.Content>
            </Modal>
        );
    }
}
