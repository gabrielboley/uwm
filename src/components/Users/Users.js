import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react';

import './users.css';
import { EditUser } from './EditUser';

const buttons = (editUser, user, index) => (
    <div className='ui two buttons'>
        <Button
            basic
            color='grey'
            onTouchTap={e => editUser(e, user, index)}
        >
            Edit
        </Button>
        <Button
            basic
            color='red'
        >
            Delete
        </Button>
    </div>
);

class Users extends Component {
    state = {
        user: null,
        userIndex: null,
        view: 'users'
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

    renderContent = () => {
        const { view } = this.state;
        const { users } = this.props;

        switch (view) {
            case 'edit': {
                return (
                    <EditUser
                        {...this.state.user}
                        index={this.state.userIndex}
                        backToUsers={this.backToUsers}
                        dispatch={this.props.dispatch}
                        handleNeedsToSave={this.props.handleNeedsToSave}
                    />
                );
            }
            default: {
                return users.map((user, index) => (
                    <Card
                        header={user.name}
                        key={user.username}
                        extra={buttons(this.editUser, user, index)}
                        image="/images/svg/settings-users.svg"
                        meta={`${user.username} // ${user.email}`}
                    />
                ))
            }
        }
    }

    render (){
        return (
            <div className="user-wrapper">
                <Card.Group
                    stackable
                    itemsPerRow={2}
                >
                    {this.renderContent()}
                </Card.Group>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps)(Users);
