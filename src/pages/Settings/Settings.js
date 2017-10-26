import React, { Component } from 'react';
import { Card, Header, Button } from 'semantic-ui-react';

import './settings.css';
import Users from '../../components/Users/Users';

export default class Settings extends Component {
    state = {
        view: 'menu'
    }

    handleRouteChange = (e, view) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ view });
    }

    renderBackButton = () => {
        const { view } = this.state;
        let touchEvent;

        if (view === 'menu') {
            return null;
        }

        if (
            view === 'product' || 
            view === 'customers' ||
            view === 'users' ||
            view === 'my-account'
        ) {
            touchEvent = () => this.setState({ view: 'menu' });
        }

        return (
            <div className="back-button-wrapper">
                <Button
                    size="huge"
                    content="Back to Settings Menu"
                    className="next-step-button"
                    onTouchTap={touchEvent}
                />
            </div>
        )
    }

    renderContent = () => {
        const { view } = this.state;
        switch (view) {
            case 'users': {
                return <Users />
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
                                onTouchTap={e => this.handleRouteChange(e, 'product')}
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
