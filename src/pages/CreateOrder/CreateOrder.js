import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';

import './createOrder.css';
import { AddItem } from './views/AddItem';
import { guestUser } from '../../consts/guest';
import { ReviewOrder } from './views/ReviewOrder';
import { CustomerType } from './views/CustomerSelection';
import { ConfirmCustomer } from './views/ConfirmCustomer';
import { AddNewCustomer } from '../../components/AddNewCustomer';
import { CustomerSelection } from '../../components/CustomerSelection';
import { toggleGuest, updateCustomer, removeActiveCustomer } from './createOrder.actions';

class CreateOrder extends Component {
    state = {
        itemsToAdd: [0],
        currentItems: [],
        currentSearch: '',
        view: 'customer-selection'
    }

    handleAddItem = (item) => {
        const { currentItems } = this.state;
        currentItems.push(item);
        this.setState({ currentItems });
    }

    onAddItemClick = () => {
        this.setState({
            view: 'add-item'
        });
    }

    onToReviewItems = () => this.setState({ view: 'review-order' });

    onClearActiveUser = () => {
        this.props.dispatch(removeActiveCustomer());
        this.setState({
            view: 'customer-selection'
        });
    }

    onCustomerSelectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            view: 'existing-selection'
        });
    }

    onGuestOption = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            view: 'add-item'
        });
        this.props.dispatch(toggleGuest());
        this.props.dispatch(updateCustomer(guestUser));
    }

    onAnotherItem = () => {
        const { itemsToAdd } = this.state;
        const currentItems = itemsToAdd.length;
        itemsToAdd.push(currentItems);
        this.setState({ itemsToAdd });
    }

    onRemoveItem = (itemIndex) => {
        const { itemsToAdd } = this.state;
        const newItems = itemsToAdd.filter((item, index) => (index !== itemIndex));
        this.setState({ itemsToAdd: newItems });
    }

    onUserSelection = (user) => {
        this.props.dispatch(updateCustomer(user));
        this.setState({
            view: 'confirm-customer'
        });
    }

    onNewUserClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            view: 'create-new'
        });
    }

    renderAddItems = () => {
        const { itemsToAdd } = this.state;
        return itemsToAdd.map((item, index) => (
            <AddItem
                key={index}
                index={index}
                products={this.props.products}
                handleAddItem={this.handleAddItem}
                handleRemoveItem={this.onRemoveItem}
            />
        ));
    }

    renderAddItemButton = () => {
        const { currentItems } = this.state;
        if (!currentItems.length) {
            return null;
        }
        return (
            <div className="add-item-button-wrapper">
                <Button
                    size="huge"
                    content="Add Another"
                    className="add-another"
                    onTouchTap={this.onAnotherItem}
                />
                <Button
                    size="huge"
                    primary
                    icon="arrow right"
                    content="Add Item"
                    className="add-item-button"
                    onTouchTap={this.onToReviewItems}
                />
            </div>
        )
    }

    renderBackButton = () => {
        const { view } = this.state;
        let touchEvent = this.onClearActiveUser;

        if (view === 'add-item') {
            touchEvent = this.props.isGuest
                ? this.onClearActiveUser
                : () => this.setState({ view: 'confirm-customer' });
        }

        if (view === 'customer-selection') {
            return null;
        }

        return (
            <div className="back-button-wrapper">
                <Button
                    size="huge"
                    content="Back"
                    className="next-step-button"
                    onTouchTap={touchEvent}
                />
            </div>
        )
    }

    renderContent = () => {
        const { view } = this.state;

        switch (view) {
            case 'add-item': {
                return this.renderAddItems();
            }
            case 'create-new': {
                return <AddNewCustomer />;
            }
            case 'confirm-customer': {
                return (
                    <ConfirmCustomer
                        onAddItemClick={this.onAddItemClick}
                        activeCustomer={this.props.activeCustomer}
                        onClearActiveUser={this.onClearActiveUser}
                    />
                );
            }
            case 'existing-selection': {
                return (
                    <CustomerSelection
                        customers={this.props.customers}
                        onNewUserClick={this.onNewUserClick}
                        onUserSelection={this.onUserSelection}
                        currentSearch={this.state.currentSearch}
                    />
                );
            }
            case 'customer-selection': {
                return (
                    <CustomerType
                        onGuestOption={this.onGuestOption}
                        onNewUserClick={this.onNewUserClick}
                        onCustomerSelectClick={this.onCustomerSelectClick}
                    />
                );
            }
            case 'review-order': {
                return (
                    <ReviewOrder
                        items={this.state.currentItems}
                        customer={this.props.activeCustomer}
                        onClearActiveUser={this.onClearActiveUser}
                    />
                );
            }
            default: {
                return null;
            }
        }
    }

    render (){
        return (
            <div className="create-order-container">
                <div className="create-order-content">
                    <Header
                        dividing
                        icon="add user"
                        content="Create New Order"
                    />
                    {this.renderContent()}
                </div>
                <div className="footer">
                    {this.renderBackButton()}
                    {this.renderAddItemButton()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCustomer: state.activeCustomer,
        activeOrder: state.activeOrder,
        activeUser: state.activeUser,
        customers: state.customers,
        isGuest: state.isGuest,
        products: state.products,
        orders: state.orders
    };
}

export default connect(mapStateToProps)(CreateOrder);
