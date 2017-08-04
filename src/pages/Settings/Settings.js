import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';

import './settings.css';
import Users from '../../components/Users/Users';
import MyAccount from '../../components/MyAccount/MyAccount';
import Products from '../../components/Products/Products';

export default class Settings extends Component {
    state = {
        view: 'menu'
    }

    handleRouteChange = (e, view) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ view });
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
                <div className="settings-content">
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
                <div className="setting-footer">
                </div>
            </div>
        );
    }
}
