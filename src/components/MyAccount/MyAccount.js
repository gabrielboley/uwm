import equal from 'deep-equal';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './myAccount.css';
import { EditUser } from '../Users/EditUser';

class MyAccount extends Component {
    state = {
        userIndex: null
    }

    componentWillMount() {
        const { activeUser, users } = this.props;
        this.setState({
            userIndex: users.findIndex(user => user.username === activeUser.username)
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!equal(nextProps.activeUser, this.props.activeUser)) {
            NotificationManager.success('Changes saved.');
        }
    }

    render () {
        return (
            <div className="my-account-wrapper">
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
                <EditUser
                    {...this.props.activeUser}
                    index={this.state.userIndex}
                    dispatch={this.props.dispatch}
                />
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

export default connect(mapStateToProps)(MyAccount);
