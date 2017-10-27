import keygen from 'keygen';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Radio, Header } from 'semantic-ui-react';

import './createOrder.css';
import { 
    ADD_ITEM,
    CREATE_NEW,
    REVIEW_ORDER,
    CONFIRM_CUSTOMER,
    CUSTOMER_SELECTION,
    EXISTING_SELECTION,
    CREATE_CUSTOMER_GUEST
} from '../../consts/views';
import { AddItem } from './views/AddItem';
import { guestUser } from '../../consts/guest';
import { ReviewOrder } from './views/ReviewOrder';
import { CustomerType } from './views/CustomerSelection';
import { updatePageInView } from '../../uwm/uwm.actions';
import { ConfirmCustomer } from './views/ConfirmCustomer';
import { AddNewCustomer } from '../../components/AddNewCustomer';
import { CustomerSelection } from '../../components/CustomerSelection';
import { addNewOrder, toggleGuest, updateCustomer, removeActiveCustomer } from './createOrder.actions';

class CreateOrder extends Component {
    state = {
        itemsToAdd: [keygen.hex(keygen.small)],
        currentItems: {},
        currentSearch: '',
        pendingOrder: null,
        shipOrPickupAll: '',
        view: CUSTOMER_SELECTION
    }

    handleAddItem = (item, key) => {
        const { currentItems } = this.state;
        currentItems[key] = item;
        this.setState({ currentItems });
    }

    onAddItemClick = (shouldReset, e) => {
        e.preventDefault();
        e.stopPropagation();
        const view = 'ADD_ITEM';
        const itemsToAdd = [keygen.hex(keygen.small)];
        let { currentItems } = this.state;
        if (shouldReset) {
            currentItems = {};
        }
        this.setState({ currentItems, itemsToAdd, view });
    }

    onToReviewItems = () => this.setState({ view: REVIEW_ORDER });

    onClearActiveUser = () => {
        this.props.dispatch(removeActiveCustomer());
        this.setState({
            view: CUSTOMER_SELECTION
        });
    }

    onCustomerSelectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            view: EXISTING_SELECTION
        });
    }

    onGuestOption = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            view: ADD_ITEM
        });
        this.props.dispatch(toggleGuest());
        this.props.dispatch(updateCustomer(guestUser));
    }

    onAnotherItem = () => {
        const { itemsToAdd } = this.state;
        itemsToAdd.push(keygen.hex(keygen.small));
        this.setState({ itemsToAdd });
    }

    onProcessOrder = () => {
        const { activeUser, activeCustomer } = this.props;
        const { currentItems } = this.state;
        const pendingOrder = {
            id: keygen.hex(keygen.small),
            customerId: activeCustomer.id,
            dateOfOrder: Date.now(),
            images: [],
            isOpen: true,
            orderItems: currentItems,
            notes: null,
            orderTotal: null,
            owner: activeUser.id,
            status: 'open'
        };

        if (this.props.isGuest) {
            return this.setState({
                pendingOrder,
                view: CREATE_CUSTOMER_GUEST
            });
        }

        this.setState({
            view: CUSTOMER_SELECTION
        }, () => {
            this.props.dispatch(addNewOrder(pendingOrder));
            this.props.dispatch(updatePageInView('in-progress'));
        })
    }

    onRemoveItem = (itemIndex) => {
        let { view } = this.state;
        const { currentItems, itemsToAdd } = this.state;
        let newItems = itemsToAdd.filter((item) => item !== itemIndex);

        delete currentItems[itemIndex];
        if (Object.keys(currentItems).length === 0) {
            view = ADD_ITEM;
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
            view: CONFIRM_CUSTOMER
        });
    }

    onUserEdit = (user) => {
        this.props.dispatch(updateCustomer(user));
        this.setState({
            view: 'confirm-customer'
        });
    }

    onShipOrPickupAll = (e, { value }) => {
        const { shipOrPickupAll } = this.state;
        const newValue = shipOrPickupAll === value ? '' : value;
        this.setState({
            shipOrPickupAll: newValue
        });
    }

    onNewUserClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            view: CREATE_NEW
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
                shipOrPickupAll={this.state.shipOrPickupAll.length > 0}
            />
        ))
    )

    renderAddItemButton = () => {
        const { currentItems, view } = this.state;
        if (!Object.keys(currentItems).length || view !== ADD_ITEM ) {
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
                    primary
                    size="huge"
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
                : () => this.setState({ view: CONFIRM_CUSTOMER });
        }

        if (view === CUSTOMER_SELECTION
            || view === CREATE_CUSTOMER_GUEST) {
            touchEvent = this.props.isGuest
                ? this.onClearActiveUser
                : () => this.setState({ view: 'existing-selection' });
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
        const { view, shipOrPickupAll } = this.state;
        const styles = {
            checkboxWrapper: {
                paddingTop: '20px'
            },
            radio1: {
                marginLeft: '10px'
            },
            radio2: {
                marginLeft: '20px'
            },
            text: {
                fontSize: '16px',
                marginLeft: '10px',
                verticalAlign: 'top'
            }
        };
        switch (view) {
            case ADD_ITEM: {
                return (
                    <div className="add-items-wrapper">
                        <div
                            style={styles.checkboxWrapper}
                            className="checkbox-wrapper"
                        >
                            <Radio
                                toggle
                                value="ship"
                                style={styles.radio1}
                                onChange={this.onShipOrPickupAll}
                                checked={shipOrPickupAll === 'ship'}
                            />
                            <span style={styles.text}>Ship All</span>
                            <Radio
                                toggle
                                value="pickup"
                                style={styles.radio2}
                                onChange={this.onShipOrPickupAll}
                                checked={shipOrPickupAll === 'pickup'}
                            />
                            <span style={styles.text}>Pickup All</span>

                        </div>
                        {this.renderAddItems()}
                    </div>
                );
            }
            case CREATE_NEW: {
                return <AddNewCustomer dispatch={this.props.dispatch}/>;
            }
            case CONFIRM_CUSTOMER: {
                return (
                    <ConfirmCustomer
                        onAddItemClick={this.onAddItemClick}
                        activeCustomer={this.props.activeCustomer}
                        onClearActiveUser={this.onClearActiveUser}
                    />
                );
            }
            case EXISTING_SELECTION: {
                return (
                    <CustomerSelection
                        customers={this.props.customers}
                        onNewUserClick={this.onNewUserClick}
                        onUserSelection={this.onUserSelection}
                        onUserEdit={this.onUserEdit}
                        currentSearch={this.state.currentSearch}
                    />
                );
            }
            case CUSTOMER_SELECTION: {
                return (
                    <CustomerType
                        onGuestOption={this.onGuestOption}
                        onNewUserClick={this.onNewUserClick}
                        onCustomerSelectClick={this.onCustomerSelectClick}
                    />
                );
            }
            case CREATE_CUSTOMER_GUEST: {
                return <AddNewCustomer isGuest dispatch={this.props.dispatch}/>;
            }
            case REVIEW_ORDER: {
                return (
                    <ReviewOrder
                        items={this.state.currentItems}
                        customer={this.props.activeCustomer}
                        handleAddItem={this.handleAddItem}
                        handleEditItem={this.handleEditItem}
                        handleRemoveItem={this.onRemoveItem}
                        products={this.props.products}
                        onAddAnotherItem={this.onAddItemClick}
                        onProcessOrder={this.onProcessOrder}
                        onClearActiveUser={this.onClearActiveUser}
                        onProcessOrder={this.onProcessOrder}
                    />
                );
            }
            default: {
                return null;
            }
        }
    }

    renderHeader = () => {
        let icon = 'add user';
        let content = 'Create New Order';
        const { view } = this.state;

        switch (view) {
            case CREATE_NEW: {
                icon = 'add user';
                content = 'New Customer';
                break;
            }
            case REVIEW_ORDER: {
                icon = 'checkmark box';
                content = 'Review Order';
                break;
            }
            case ADD_ITEM: {
                icon = 'plus';
                content = 'Add Item';
                break;
            }
            case CREATE_CUSTOMER_GUEST: {
                icon = 'plus';
                content = 'Add New Customer';
                break;
            }
            default: {
                icon = 'add user';
                content = 'Create New Order';
            }
        }

        return (
            <Header
                dividing
                icon={icon}
                content={content}
            />
        );
    }

    render (){
        return (
            <div className="create-order-container">
                <div className="create-order-content">
                    {this.renderHeader()}
                    {this.renderContent()}
                </div>
                <div className={this.state.view === REVIEW_ORDER ? 'footer review' : 'footer'}>
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
