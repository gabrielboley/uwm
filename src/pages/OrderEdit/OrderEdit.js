import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card, Divider, Header, Icon, Button, Label, List, Input, TextArea, Modal } from 'semantic-ui-react';

import './OrderEdit.css';
import { NumberPad } from './NumberPad';
import { updateOrder, updateOrderNumber } from './OrderEdit.actions';
import { orderNumber } from '../../utils/orderNumber';

const replaceDollar = /\$/g;
const initialState = {
    customer: null,
    edit: false,
    order: null,
    orderComplete: false,
    renderOrderNumberModal: false,
    newOrderNumber: ''
};
class OrderEdit extends Component {
    componentWillUnmount() {
        this.setState({ initialState });
    }

    state = initialState;

    onEditOrder = (e, order, customer) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            customer,
            edit: true,
            order,
            needsToSave: false
        });
    }

    onBackToInProgress = () => {
        this.setState({ edit: false, order: null });
    }

    onChangeNotes = (e, { value }) => {
        const { order } = this.state;
        order.notes = value;
        this.setState({
            needsToSave: true,
            order
        });
    }

    onSaveOrder = () => {
        const orderIsComplete = this.getOrderIsComplete(this.state.order);
        this.setState({
            edit: false,
            order: {
                ...this.state.order,
                isOpen: orderIsComplete ? false : true,
                status: orderIsComplete ? 'complete' : 'open'
            },
            orderComplete: orderIsComplete ? false : true
        }, () => {
            this.props.dispatch(updateOrder(this.state.order));
        });
    }

    onOpenOrderModal = (e, order) => {
        e.preventDefault();
        e.stopPropagation();

        const { renderOrderNumberModal } = this.state;
        this.setState({
            order,
            renderOrderNumberModal: !renderOrderNumberModal,
        });
    }

    onCloseOrderModal = () => {
        this.setState({...initialState});
    }

    onUpdateOrderNumber = () => {
        const { order, newOrderNumber } = this.state;

        if (newOrderNumber.length !== 0) {
            this.props.dispatch(updateOrderNumber(order.id, newOrderNumber));
        }
        this.setState({...initialState});
    }

    onNumberClick = (e, number) => {
        e.preventDefault();
        e.stopPropagation();

        const { newOrderNumber } = this.state;
        this.setState({
            newOrderNumber: `${newOrderNumber}${number}`
        });
    }

    onNumberDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let { newOrderNumber } = this.state;
        if (newOrderNumber.length === 0) {
            return;
        }
        newOrderNumber = newOrderNumber.slice(0, -1);
        this.setState({ newOrderNumber });
    }

    onNumberClear = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ newOrderNumber: '' });
    }

    getOrderIsComplete = (order) => {
        const orderSize = Object.keys(order.orderItems).length;
        const itemsCompleted = [];
        for (let key in order.orderItems) {
            if (order.orderItems[key].isCompleted) {
                itemsCompleted.push(order.orderItems[key]);
            }
        }
        return orderSize === itemsCompleted.length;
    }

    onEditTracking = () => {
        const trackingInfo = this.state.order.trackingInfo
            || {
                carrier: '',
                trackingNumber: ''
            };
        this.setState({
            trackingEdit: true,
            order: {
                ...this.state.order,
                trackingInfo
            }
        });
    }

    onSaveTracking = () => {
        this.setState({
            trackingEdit: false
        })
    }

    onTrackingChange = (e, type) => {
        this.setState({
            order: {
                ...this.state.order,
                trackingInfo: {
                    ...this.state.order.trackingInfo,
                    [type]: e.target.value
                }
            }
        });
    }

    onToggleOrderItem = (key, order) => {
        this.setState({
            needsToSave: true,
            order: {
                ...order,
                orderItems: {
                    ...order.orderItems,
                    [key]: {
                        ...order.orderItems[key],
                        isCompleted: !order.orderItems[key].isCompleted
                    }
                }
            }
        });
    }

    renderTotal = (order) => {
        let total = 0;
        Object.keys(order.orderItems).forEach(item => (
            total += Number(order.orderItems[item].price.replace(replaceDollar, ''))
        ));
        return total.toLocaleString();
    }

    renderEditOrder = () => {
        const { order, customer, needsToSave } = this.state;
        const renderSaveButton = () => {
            if (!needsToSave) {
                return null;
            }
            const styles = {
                bottom: '15px',
                height: '45px',
                left: '5%',
                position: 'fixed',
                right: '5%',
                width: '90%',
                zIndex: '100'
            };
            return (
                <Button
                    fluid
                    primary
                    style={styles}
                    content="Save"
                    className="save-user-button"
                    onTouchTap={this.onSaveOrder}
                />
            )
        };
        return (
            <div className="in-progress-container">
                <Header
                    dividing
                    icon="cut"
                    content={`Edit Order #${orderNumber(order.id)}`}
                />
                <div className="edit-order-wrapper">
                    <Header
                        as="h3"
                        className="back-to-in-progress"
                        onTouchTap={this.onBackToInProgress}
                    >
                        <Icon name="arrow left" />
                        <Header.Content>
                            Back
                        </Header.Content>
                    </Header>
                    <Card
                        fluid
                        color="blue"
                        className="edit-order-card-wrapper"
                        header={
                            <div key="customer-name" className="order-header">
                                {customer.name}
                            </div>
                            }
                        extra={
                            <div className="edit-order-content">
                                {this.state.trackingEdit
                                    && <div className="tracking-form">
                                        <Input
                                            label="Carrier"
                                            onChange={(e) => {this.onTrackingChange(e, 'carrier')}}
                                            value={this.state.order.trackingInfo.carrier}
                                        />
                                        <Input
                                            label="Tracking No."
                                            onChange={(e) => {this.onTrackingChange(e, 'trackingNumber')}}
                                            value={this.state.order.trackingInfo.trackingNumber}
                                        />
                                        <Button
                                            primary
                                            content="Save Tracking Info"
                                            className="order-buttons"
                                            onTouchTap={e => this.onSaveTracking()}
                                        />
                                    </div>
                                }
                                {(this.props.status === 'completed'
                                    && !this.state.trackingEdit)
                                    && <div className="tracking-info">
                                        <div className="carrier">Carrier: {this.state.order.trackingInfo && this.state.order.trackingInfo.carrier}</div>
                                        <div className="tracking-number">Tracking No.: {this.state.order.trackingInfo && this.state.order.trackingInfo.trackingNumber}</div>
                                        <Button
                                            primary
                                            content="Edit Tracking Info"
                                            className="order-buttons"
                                            onTouchTap={e => this.onEditTracking()}
                                        />
                                    </div>
                                }
                                <div className="order-item-cards">
                                    <h3 className="order-items-header">Items</h3>
                                    {Object.keys(order.orderItems).map(key => (
                                        <Card
                                            key={order.orderItems[key].id}
                                            className="order-item-card"
                                            extra={
                                                <div className="item-details-wrapper">
                                                    <List
                                                        relaxed
                                                        floated="left"
                                                        className="product-details"
                                                    >
                                                        <List.Item
                                                            content={
                                                                <div className="label">
                                                                    Name:
                                                                    <span className="content">{order.orderItems[key].name}</span>
                                                                </div>
                                                            }
                                                        />
                                                        <List.Item
                                                            content={
                                                                <div className="label">
                                                                    Type:
                                                                    <span className="content">{order.orderItems[key].garmentType}</span>
                                                                </div>
                                                            }
                                                        />
                                                        <List.Item
                                                            content={
                                                                <div className="label">
                                                                    Price:
                                                                    <span className="content">{order.orderItems[key].price}</span>
                                                                </div>
                                                            }
                                                        />
                                                        {order.orderItems[key].canBeAltered && order.orderItems[key].notes &&
                                                            <List.Item
                                                                content={
                                                                    <div className="label">
                                                                        Alterations:
                                                                        <span className="content">{order.orderItems[key].notes}</span>
                                                                    </div>
                                                                }
                                                            />
                                                        }
                                                    </List>
                                                    <div className="order-actions-wrapper">
                                                        {order.orderItems[key].isCompleted
                                                            ? <div
                                                                className="order-complete-action completed"
                                                                onTouchTap={() => this.onToggleOrderItem(key, order)}
                                                            >
                                                                Completed!
                                                                <Icon
                                                                    inverted
                                                                    circular
                                                                    size="small"
                                                                    color="blue"
                                                                    name="check"
                                                                />
                                                            </div>
                                                            : <div
                                                                className="order-complete-action"
                                                                onTouchTap={() => this.onToggleOrderItem(key, order)}
                                                            >
                                                                Mark as complete
                                                                <Icon
                                                                    inverted
                                                                    circular
                                                                    size="small"
                                                                    name="check"
                                                                />
                                                            </div>

                                                        }
                                                    </div>
                                                </div>
                                            }
                                        />
                                    ))}
                                </div>
                                <div className="item-order-notes">
                                    <h3 className="order-notes-header">Notes</h3>
                                    <TextArea
                                        className="order-notes"
                                        value={order.notes || ''}
                                        onChange={this.onChangeNotes}
                                    />
                                </div>
                                <div className="order-image-wrapper">
                                    <h3 className="order-image-header">Images</h3>
                                </div>
                            </div>
                        }
                    />
                </div>
                <div className="in-progress-footer">
                    {renderSaveButton()}
                </div>
            </div>
        );
    }

    renderOrderNumberUpdate = () => {
        const { newOrderNumber, renderOrderNumberModal } = this.state;
        return (
            <Modal
                size='small'
                open={renderOrderNumberModal}
                className="update-order-number-modal"
                trigger={
                    <Button
                        basic
                        inverted
                        icon="log out"
                        content="Logout"
                        style={{ height: '75px' }}
                    />
                }
            >
                <Header icon='tag' content='Update Order Number' />
                <Modal.Content>
                    <h2>{newOrderNumber}</h2>
                    <NumberPad
                        onNumberClick={this.onNumberClick}
                        onNumberClear={this.onNumberClear}
                        onNumberDelete={this.onNumberDelete}
                    />
                    <Divider hidden/>
                    <Button color='green' onTouchTap={this.onUpdateOrderNumber} fluid>
                        <Icon name='checkmark' /> Update
                    </Button>
                    <Divider hidden/>
                    <Button color='red' onTouchTap={this.onCloseOrderModal} fluid>
                        <Icon name='close' /> Cancel
                    </Button>
                </Modal.Content>
            </Modal>
        )
    }

    renderOrders = () => {
        const { orders, customers, status } = this.props;
        const orderStatus = status === 'in-progress' ? 'open' : 'complete';
        return orders.filter(order => order.status === orderStatus).map(order => {
            const customer = customers.filter(customer => customer.id === order.customerId)[0];
            return (
                <Card
                    fluid
                    color="blue"
                    key={order.id}
                    className="in-progress-card-wrapper"
                    header={([
                        <div key="customer-name" className="order-header">{customer.name}</div>,
                        <Label
                            ribbon
                            color='blue'
                            key="logged-in"
                            onTouchTap={e => this.onOpenOrderModal(e, order)}
                            style={{ position: 'absolute', top: '10px', left: '-15px' }}
                        >
                            #{orderNumber(order.id)}
                        </Label>
                    ])}
                    meta={
                        <div className="customer-info">
                            <div className="customer-details">
                                <div className="name">{customer.name}</div>
                                <div className="address-1">{customer.address.street1}</div>
                                <div className="address-2">{customer.address.street2}</div>
                                <div className="address-3">
                                    {customer.address.city}, {customer.address.state} {customer.address.zip}
                                </div>
                            </div>
                            <div className="email-phone">
                                <div className="email">{customer.email}</div>
                                <div className="phone">{customer.phone}</div>
                            </div>
                        </div>
                    }
                    extra={
                        <div className="order-content">
                            <h3 className="number-items">Items ({Object.keys(order.orderItems).length})</h3>
                            <Divider/>
                            <div className="order-info">
                                <div className="order-items">
                                    {Object.keys(order.orderItems).map(item => (
                                        <div className="item" key={`item-${order.orderItems[item].id}`}>
                                            <span className="item-type">{order.orderItems[item].garmentType}: </span>
                                            <span className="item-name">{order.orderItems[item].name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-total">
                                    <div className="price">Total: ${this.renderTotal(order)}</div>
                                </div>
                                <div className="order-actions">
                                    <div className="tailor-order">
                                        <Button
                                            primary
                                            content="Edit Order"
                                            className="process-order-button order-buttons"
                                            onTouchTap={e => this.onEditOrder(e, order, customer)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            );
        });
    }

    render (){
        if (this.state.edit) {
            return this.renderEditOrder();
        }
        return (
            <div className="in-progress-container">
                <Header
                    dividing
                    icon="cut"
                    content={this.props.status === 'in-progress' ? "Orders in Progress" : "Completed Orders"}
                />
                <div className="in-progress-wrapper">
                    {this.renderOrders()}
                </div>
                <div className="in-progress-footer">

                </div>
                {this.renderOrderNumberUpdate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser,
        customers: state.customers,
        orders: state.orders,
        users: state.users
    };
}

export default connect(mapStateToProps)(OrderEdit);
