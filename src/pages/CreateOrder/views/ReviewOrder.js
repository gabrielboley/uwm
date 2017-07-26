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
                >Edit</div>
            </div>
        );
    }

    renderItems = () => (
        this.props.items.map((item, index) => (
            <Item
                key={`item-${item.name}-${item.id}-${index}`} {...item} />
        ))
    )

    addItemButton = () => (
        <div className="add-item-wrapper">
            <Button
                size="huge"
                primary
                content="Add Another Item"
                className="next-step-button"
                onTouchTap={this.props.onAddAnotherItem}
            />
        </div>
    )

    processOrder = () => (
        <div className="complete-order-wrapper">
            <Button
                size="huge"
                primary
                content="Save Order"
                className="process-order-button"
                onTouchTap={this.props.onProcessOrder}
            />
        </div>
    )

    render (){
        return (
            <div className="review-order-wrapper">
                {this.renderCustomer()}
                <div className="items-text">Items</div>
                {this.renderItems()}
                {this.addItemButton()}
                {this.processOrder()}
            </div>
        );
    }
}
