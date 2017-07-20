import md5 from 'md5';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Container, Header, Icon } from 'semantic-ui-react';

import './css/login.css';
import { Users } from './Users';
import { PassCode } from './Passcode';
import { clearErrors, logUserIn, hasLoginError } from './login.actions';

class Login extends Component {
    state = {
        password: '',
        renderUsers: false,
        renderPassword: false,
        selectedUser: null
    };

    onClearUserClick = () => {
        this.setState({
            password: '',
            selectedUser: null
        })
    };

    onUsernameClick = () => {
        this.setState((prevState) => {
            return {
                renderUsers: !prevState.renderUsers,
                renderPassword: false
            };
        });
    }

    onUserCardClick = (e, selectedUser) => {
        this.setState({
            selectedUser,
            renderUsers: false
        });
    }

    onPasswordCardClick = (e, number) => {
        const { dispatch } = this.props;
        const { password, selectedUser } = this.state;
        const currentPassword = password + number;

        if (password.length === 4) {
            this.setState({ password: number });
            return dispatch(clearErrors());
        }

        if (currentPassword.length <= 4) {
            this.setState({ password: currentPassword });
        }

        if (currentPassword.length === 4) {
            const md5Password = md5(currentPassword);

            if (md5Password === selectedUser.password) {
                return dispatch(logUserIn(selectedUser));
            } else {
                return dispatch(hasLoginError());
            }
        }
    }

    onPasswordClear = () => {
        this.setState({ password: '' });
        this.props.dispatch(clearErrors());
    }

    onPasswordDelete = () => {
        const { password } = this.state;
        this.setState({ password: password.slice(0, -1) });
        this.props.dispatch(clearErrors());
    }

    renderUser = () => {
        const { users } = this.props;
        const { renderUsers, selectedUser } = this.state;
        let userColor = 'teal';
        let userText = 'Username';
        let userClass = 'username-button';

        if (selectedUser) {
            userColor = 'blue';
            userText = selectedUser.name;
            userClass = 'username-button selected';
        }

        if (renderUsers) {
            return (
                <Users
                    users={users}
                    onUserCardClick={this.onUserCardClick}
                />
            );
        }
        return (
            <Button.Group
                fluid
                size="massive"
                className="username-wrapper"
            >
                <Button
                    color={userColor}
                    content={userText}
                    className={userClass}
                    onClick={this.onUsernameClick}
                />
                {selectedUser &&
                    <Button
                        color="red"
                        className="clear-selected-user"
                        content={<Icon name="close" />}
                        onClick={this.onClearUserClick}
                    />
                }
            </Button.Group>
        )
    }

    renderPassword = () => {
        const {
            renderUsers,
            selectedUser
        } = this.state;

        if (renderUsers) {
            return null;
        }
        if (selectedUser) {
            return (
                <PassCode
                    onPasswordClear={this.onPasswordClear}
                    onPasswordDelete={this.onPasswordDelete}
                    onPasswordCardClick={this.onPasswordCardClick}
                />
            );
        }
        return (
            <Button
                fluid
                disabled
                content="Passcode"
                className="passcode"
            />

        )
    }

    renderPasswordText = () => {
        const { password } = this.state;
        const { loginError } = this.props;
        const passwordArray = password.split('');
        const passwordClass = loginError ? 'password-text errors' : 'password=text';
        if (!passwordArray) {
            return null;
        }
        return (
            <div className={passwordClass}>
                {passwordArray.map((letter, index) => (
                    <span key={`${letter}-${index}`} className="password-text"> * </span>
                ))}
            </div>
        )
    }

    renderHeaderText = () => {
        const { renderUsers, selectedUser } = this.state;

        if (selectedUser) {
            return <Header size='medium'>Enter Passcode</Header>;
        }

        if (renderUsers) {
            return <Header size='medium'>Select a User</Header>;
        }
        return <Header size='huge'>Please Login</Header>
    }

    render (){
        return (
            <Container className="login-wrapper" text>
                <div className="login-header">
                    <div className="header-text">
                        Utah Woolen Mills
                    </div>
                </div>
                {this.renderHeaderText()}
                {this.renderUser()}
                <div className="password-wrapper">
                    {this.renderPassword()}
                </div>
                <div className="password-text-wrapper">
                    {this.renderPasswordText()}
                </div>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginError: state.loginError,
        users: state.users
    };
}

export default connect(mapStateToProps)(Login);
