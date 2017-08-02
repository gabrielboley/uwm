import keygen from 'keygen';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Checkbox, Header } from 'semantic-ui-react';

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
        itemsToAdd: [keygen.hex(keygen.small)],
        currentItems: {},
        currentSearch: '',
        view: 'customer-selection',
        shipAll: false
    }

    handleAddItem = (item, key) => {
        const { currentItems } = this.state;
        currentItems[key] = item;
        this.setState({ currentItems });
    }

    onAddItemClick = (shouldReset) => {
        const view = 'add-item';
        const itemsToAdd = [keygen.hex(keygen.small)];
        let { currentItems } = this.state;
        if (shouldReset) {
            currentItems = {};
        }
        this.setState({ currentItems, itemsToAdd, view });
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
        itemsToAdd.push(keygen.hex(keygen.small));
        this.setState({ itemsToAdd });
    }

    onRemoveItem = (itemIndex) => {
        let { view } = this.state;
        const { currentItems, itemsToAdd } = this.state;
        let newItems = itemsToAdd.filter((item) => item !== itemIndex);

        delete currentItems[itemIndex];
        if (Object.keys(currentItems).length === 0) {
            view = 'add-item';
            newItems = [ keygen.hex(keygen.small) ];
        }
        this.setState({
            view,
            currentItems,
            itemsToAdd: newItems
        });
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

    renderAddItems = () => (
        this.state.itemsToAdd.map((itemIndex, index) => (
            <AddItem
                key={itemIndex}
                index={itemIndex}
                isFirst={index === 0}
                products={this.props.products}
                handleAddItem={this.handleAddItem}
                handleRemoveItem={this.onRemoveItem}
                currentItems={this.state.currentItems}
            />
        ))
    )

    renderAddItemButton = () => {
        const { currentItems, view } = this.state;
        if (!Object.keys(currentItems).length || view !== 'add-item' ) {
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
        const styles = {
            checkbox: {
                paddingLeft: '10px',
                paddingTop: '20px'
            },
            text: {
                fontSize: '16px',
                marginLeft: '10px',
                verticalAlign: 'top'
            }
        };
        switch (view) {
            case 'add-item': {
                return (
                    <div className="add-items-wrapper">
                        <div
                            style={styles.checkbox}
                            className="checkbox-wrapper"
                        >
                            <Checkbox toggle/>
                            <span style={styles.text}>Ship All</span>
                        </div>
                        {this.renderAddItems()}
                    </div>
                );
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
                        handleRemoveItem={this.onRemoveItem}
                        onAddAnotherItem={this.onAddItemClick}
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
