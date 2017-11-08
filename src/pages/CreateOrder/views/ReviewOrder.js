import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import'./reviewOrder.css';
import { Item } from '../../../components/Item';

export class ReviewOrder extends Component {
    renderCustomer = () => {
        return (
            <div className="customer-wrapper">
                <div className="customer-text">Customer Info</div>
                <div className="customer-info">
                    <div className="customer-name">{this.props.customer.name}</div>
                    <div className="customer-email">{this.props.customer.email}</div>
                    <div className="customer-phone">{this.props.customer.phone}</div>
                </div>
                <div
                    className="edit-customer"
                    onTouchTap={this.props.onClearActiveUser}
                >
                    Edit
                </div>
            </div>
        );
    }

    renderItems = () => {
        const { items } = this.props;
        return Object.keys(this.props.items).map((itemKey, index) => {
            const item = items[itemKey];
            return (
                <Item
                    item={item}
                    index={itemKey}
                    products={this.props.products}
                    handleAddItem={this.props.handleAddItem}
                    handleRemoveItem={this.props.handleRemoveItem}
                    key={`item-${item.name}-${item.id}-${index}`}
                />
            );
        })
    }

    addItemButton = () => (
        <div
            className="add-item-wrapper"
            style={{ marginBottom: '20px' }}
        >
            <Button
                size="huge"
                primary
                content="Add Another Item"
                className="next-step-button"
                onTouchTap={e => this.props.onAddAnotherItem(false, e)}
            />
        </div>
    )

    renderFooter = () => (
        <div>
            <div className="cancel-order-wrapper">
                <Button
                    size="huge"
                    content="Cancel Order"
                    className="cancel-order-button"
                    onTouchTap={this.props.onCancelOrder}
                />
            </div>
            <div className="complete-order-wrapper">
                <Button
                    size="huge"
                    primary
                    content="Save Order"
                    className="process-order-button"
                    onTouchTap={this.props.onProcessOrder}
                />
            </div>
        </div>
    )

    render (){
        return (
            <div className="review-order-wrapper">
                {this.renderCustomer()}
                <div className="items-text">Items</div>
                {this.renderItems()}
                {this.addItemButton()}
                {this.renderFooter()}
            </div>
        );
    }
}
