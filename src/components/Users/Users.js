import equal from 'deep-equal';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Card, Header, Label, Icon } from 'semantic-ui-react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './users.css';
import { EditUser } from './EditUser';
import 'react-notifications/lib/notifications.css';
import { deleteUser } from '../../pages/Settings/settings.actions';

const buttons = (dispatch, editUser, user, activeUser, index) => (
    <div className='ui two buttons'>
        <Button
            basic
            color='grey'
            onTouchTap={e => editUser(e, user, index)}
        >
            Edit
        </Button>
        {activeUser.id !== user.id &&
            <Button
                basic
                color='red'
                onTouchTap={() => dispatch(deleteUser(index, user))}
            >
                Delete
            </Button>
        }
    </div>
);

class Users extends Component {
    state = {
        user: null,
        userIndex: null,
        view: 'users'
    }

    componentWillReceiveProps(nextProps) {
        if (!equal(nextProps.users, this.props.users)) {
            NotificationManager.success('Changes saved.');
        }
    }

    editUser = (e, user, index) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            user,
            userIndex: index,
            view: 'edit'
        });
    }

    backToUsers = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            user: null,
            view: 'users'
        });
    }

    updateView = (view) => this.setState({ view });

    renderContent = () => {
        const { view } = this.state;
        const { activeUser, users, dispatch } = this.props;

        switch (view) {
            case 'edit': {
                return (
                    <EditUser
                        {...this.state.user}
                        renderBackButton
                        activeUser={this.props.activeUser}
                        updateView={this.updateView}
                        index={this.state.userIndex}
                        backToUsers={this.backToUsers}
                        dispatch={this.props.dispatch}
                    />
                );
            }
            default: {
                return users.map((user, index) => (
                    <Card
                        header={([
                            user.name,
                            user.id === activeUser.id &&
                                <Label
                                    ribbon
                                    color='blue'
                                    key="logged-in"
                                    style={{ position: 'absolute', top: '10px', left: '-15px' }}
                                >
                                    Logged In
                                </Label>
                        ])}
                        key={user.username}
                        extra={buttons(dispatch, this.editUser, user, activeUser, index)}
                        image="/images/svg/settings-users.svg"
                        meta={`${user.username} // ${user.email}`}
                    />
                ))
            }
        }
    }

    render () {
        const { view } = this.state;
        return (
            <div className="user-wrapper">
                {view === 'users' &&
                    <Header
                        as="h3"
                        className="back-to-breadcrumb"
                        onTouchTap={e => this.props.handleRouteChange(e, 'menu')}
                    >
                        <Icon name="arrow left" />
                        <Header.Content>
                            Back to Settings
                        </Header.Content>
                    </Header>
                }
                <Card.Group
                    stackable
                    itemsPerRow={2}
                >
                    {this.renderContent()}
                </Card.Group>
                <NotificationContainer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        activeUser: state.activeUser
    };
}

export default connect(mapStateToProps)(Users);
