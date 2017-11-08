import React, { Component } from 'react';
import { connect } from 'react-redux';
import keygen from 'keygen';
import { Card, Header, Button } from 'semantic-ui-react';

import {
    CREATE_NEW,
    CUSTOMER_SELECTION,
    EXISTING_SELECTION
} from '../../consts/views';

import './settings.css';
import Users from '../../components/Users/Users';
import MyAccount from '../../components/MyAccount/MyAccount';
import Products from '../../components/Products/Products';
import { CustomerType } from '../../pages/CreateOrder/views/CustomerSelection';
import CustomerSelection from '../../components/CustomerSelection/CustomerSelection';
import { AddNewCustomer } from '../../components/AddNewCustomer';
import { updateCustomer, removeActiveCustomer  } from '../../pages/CreateOrder/createOrder.actions';

class Settings extends Component {
    state = {
        view: 'menu',
        currentSearch: ''
    }

    handleRouteChange = (e, view) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ view });
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

    onClearActiveUser = () => {
        this.props.dispatch(removeActiveCustomer());
        this.setState({
            view: CUSTOMER_SELECTION
        });
    }

    onNewUserClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            view: CREATE_NEW
        });
    }

    onUserEdit = (user) => {
        this.props.dispatch(updateCustomer(user));
        this.setState({
            view: 'confirm-customer'
        });
    }

    onUserSelection = (user) => {
        return null;
    }

    onCustomerSelectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            view: EXISTING_SELECTION
        });
    }

    renderBackButton = () => {
        const { view } = this.state;

        if (view === 'menu') {
            return null;
        }

        return (
            <div className="back-button-wrapper">
                <Button
                    size="huge"
                    content="Back to Settings Menu"
                    className="next-step-button"
                    onTouchTap={() => this.setState({ view: 'menu' })}
                />
            </div>
        )
    }

    renderContent = () => {
        const { view } = this.state;
        switch (view) {
            case 'my-account': {
                return <MyAccount handleRouteChange={this.handleRouteChange}/>
            }
            case 'users': {
                return <Users handleRouteChange={this.handleRouteChange}/>
            }
            case 'products': {
                return <Products handleRouteChange={this.handleRouteChange}/>
            }
            case 'customers': {
                return <CustomerType
                    onNewUserClick={this.onNewUserClick}
                    onCustomerSelectClick={this.onCustomerSelectClick}
                />
            }
            case CREATE_NEW: {
                return <AddNewCustomer
                    dispatch={this.props.dispatch}
                    onSaveCustomer={this.onCustomerSelectClick}
                />;
            }
            case EXISTING_SELECTION: {
                return <CustomerSelection
                    dispatch={this.props.dispatch}
                    onNewUserClick={this.onNewUserClick}
                    onUserSelection={this.onUserSelection}
                    onUserEdit={this.onUserEdit}
                    currentSearch={this.state.currentSearch}
                />
            }
            default:
                return null;
        }
    }

    render (){
        const styles = {
            card: {
                height: '200px'
            }
        };
        return (
            <div className="settings-container">
                <div className={`settings-content ${this.state.view}`}>
                    <Header
                        dividing
                        icon="settings"
                        content="Settings"
                    />
                    {this.state.view === 'menu' &&
                        <Card.Group
                            stackable
                            itemsPerRow={2}
                        >
                            <Card
                                color="blue"
                                extra="Products"
                                style={styles.card}
                                image="/images/svg/dress-man.svg"
                                onTouchTap={e => this.handleRouteChange(e, 'products')}
                            />
                            <Card
                                color="blue"
                                extra="Customers"
                                style={styles.card}
                                image="/images/svg/settings-customers.svg"
                                onTouchTap={e => this.handleRouteChange(e, 'customers')}
                            />
                            <Card
                                color="blue"
                                extra="Users"
                                style={styles.card}
                                image="/images/svg/settings-users.svg"
                                onTouchTap={e => this.handleRouteChange(e, 'users')}
                            />
                            <Card
                                color="blue"
                                extra="My Account"
                                style={styles.card}
                                image="/images/svg/settings-my-settings.svg"
                                onTouchTap={e => this.handleRouteChange(e, 'my-account')}
                            />
                        </Card.Group>
                    }
                    {this.renderContent()}
                </div>
                <div className="footer">
                    {this.renderBackButton()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCustomer: state.activeCustomer,
        customers: state.customers,
    };
}

export default connect(mapStateToProps)(Settings);
