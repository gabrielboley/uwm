import md5 from 'md5';
import React, { Component } from 'react';
import { Button, Header, Icon, Card, Image, Modal } from 'semantic-ui-react';

import './editUser.css';
import { EditField } from './EditField';
import { PassCode } from '../../pages/Login/Passcode';
import { isValidEmail } from '../../utils/isValidEmail';
import { deleteUser, updateUserSettings } from '../../pages/Settings/settings.actions';

const fieldMap = {
    name: 0,
    username: 1,
    email: 2,
    phone: 3,
    password: 4
};

export class EditUser extends Component {
    state = {
        id: this.props.id,
        activeField: '',
        name: this.props.name,
        email: this.props.email,
        newPassword: '',
        newPasswordConfirmation: '',
        needsPasswordConfirmation: false,
        needsToSave: false,
        password: this.props.password,
        passwordError: false,
        passwordModal: false,
        phone: this.props.phone,
        username: this.props.username,
        hasValidEmail: true,
        hasErrors: [0,0,0,0,0]
    }

    onFieldUpdate = (field, e) => {
        let { hasValidEmail, hasErrors, needsToSave } = this.state;
        const value = e.target.value;
        if (value.length === 0) {
            hasErrors[fieldMap[field]] = 1;
            return this.setState({
                needsToSave: false,
                [field]: value,
                hasErrors
            });
        }
        if (field === 'email') {
            if (!isValidEmail(value)) {
                needsToSave = false;
                hasValidEmail = false;
                hasErrors[fieldMap[field]] = 1;
            } else {
                needsToSave = true;
                hasValidEmail = true;
                hasErrors[fieldMap[field]] = 0;
            }
        } else {
            needsToSave = true;
            hasErrors[fieldMap[field]] = 0;
        }

        this.setState({
            [field]: value,
            needsToSave,
            hasValidEmail,
            hasErrors
        });
    }

    onFieldFocus = (field) => {
        const { activeField } = this.state;
        this.setState({
            activeField: activeField === field ? '' : field
        });
    }

    onPasswordFocus = () => this.setState(previousState => ({
        needsPasswordConfirmation: false,
        newPassword: '',
        newPasswordConfirmation: '',
        password: this.props.password,
        passwordError: false,
        passwordModal: !previousState.passwordModal
    }))

    onPasswordClear = () => {
        const {
            needsPasswordConfirmation,
            passwordError
        } = this.state;
        const isConfirming = needsPasswordConfirmation && !passwordError;
        if (isConfirming) {
            return this.setState({ newPasswordConfirmation: '' });
        }
        this.setState({ newPassword: '' });
    }

    onPasswordDelete = () => {
        const {
            newPassword,
            newPasswordConfirmation,
            needsPasswordConfirmation,
            passwordError
        } = this.state;

        const isConfirming = needsPasswordConfirmation && !passwordError;
        if (isConfirming) {
            return this.setState({
                newPasswordConfirmation: newPasswordConfirmation.slice(0, -1)
            });
        }
        this.setState({
            newPassword: newPassword.slice(0, -1)
        });
    }

    onPasswordCardClick = (e, number) => {
        e.preventDefault();
        e.stopPropagation();
        const {
            newPassword,
            newPasswordConfirmation,
            needsPasswordConfirmation,
            passwordError
        } = this.state;
        const isConfirming = needsPasswordConfirmation && !passwordError;
        const currentPassword = isConfirming
            ? newPasswordConfirmation + number
            : newPassword + number;

        if (isConfirming) {
            if (newPasswordConfirmation.length === 4) {
                this.setState({ newPasswordConfirmation: number });
                return;
            }
            if (currentPassword.length <= 4) {
                this.setState({ newPasswordConfirmation: currentPassword });
            }
            if (currentPassword.length === 4) {
                if (currentPassword === newPassword) {
                    this.setState({
                        needsToSave: true,
                        passwordModal: false,
                        needsPasswordConfirmation: false
                    });
                    return;
                } else {
                    this.setState({
                        needsToSave: false,
                        passwordError: true,
                        newPassword: '',
                        newPasswordConfirmation: ''
                    });
                }
            }
        } else {
            if (newPassword.length === 4) {
                this.setState({ newPassword: number });
                return;
            }

            if (currentPassword.length <= 4) {
                this.setState({ newPassword: currentPassword });
            }

            if (currentPassword.length === 4) {
                const md5Password = md5(currentPassword);
                this.setState({
                    needsPasswordConfirmation: true,
                    password: md5Password,
                    passwordError: false
                })
            }
        }
    }

    onSaveUserChanges = () => {
        const { index } = this.props;
        const { id, email, name, password, phone, username } = this.state;
        const user = { id, email, name, password, phone, username };

        if (this.props.updateView) {
            this.props.updateView('users');
        }

        this.setState({ needsToSave: false });
        this.props.dispatch(updateUserSettings(index, user));
    }

    onDeleteUser = () => {
        const { index } = this.props;
        const { id, email, name, password, phone, username } = this.state;
        const user = { id, email, name, password, phone, username };

        if (this.props.updateView) {
            this.props.updateView('users');
        }
        this.props.dispatch(deleteUser(index, user));
    }

    renderPasswordHeader = () => {
        const { needsPasswordConfirmation, passwordError } = this.state;
        if (passwordError) {
            return (
                <h2 className="password-header password-error">
                    Passwords did not match. Please try again.
                </h2>
            );
        }
        if (needsPasswordConfirmation) {
            return <h2 className="password-header confirm-password">Please Confirm your password</h2>;
        }
        return <h2 className="password-header">Please select a 4 digit password.</h2>
    }

    renderPasswordText = () => {
        const {
            newPassword,
            newPasswordConfirmation,
            needsPasswordConfirmation
        } = this.state;
        const passwordArray = needsPasswordConfirmation
            ? newPasswordConfirmation.split('')
            : newPassword.split('');
        if (!passwordArray) {
            return <div className="password-text" />;
        }
        return (
            <div className="password-text">
                {passwordArray.map((letter, index) => (
                    <span key={`${letter}-${index}`} className="password-text"> * </span>
                ))}
            </div>
        )
    }

    renderSaveButton = () => {
        const { needsToSave } = this.state;
        const hasErrors = this.state.hasErrors.some(num => num === 1);
        if (!needsToSave || hasErrors) {
            return null;
        }
        const styles = {
            bottom: '20px',
            height: '45px',
            position: 'fixed',
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
                onTouchTap={this.onSaveUserChanges}
            />
        )
    }

    render () {
        return (
            <div className="edit-user-wrapper">
                {this.props.renderBackButton &&
                    <Header
                        as="h3"
                        className="back-to-breadcrumb"
                        onTouchTap={e => this.props.backToUsers(e)}
                    >
                        <Icon name="arrow left" />
                        <Header.Content>
                            Back to Users
                        </Header.Content>
                    </Header>
                }
                <div className="edit-user-info">
                    <Card fluid>
                        <Image src="/images/svg/settings-users.svg"/>
                        <Card.Content>
                            <Card.Header>
                                <EditField
                                    field="name"
                                    focus={this.state.activeField === 'name'}
                                    icon="user"
                                    needsValidation
                                    onFieldUpdate={this.onFieldUpdate}
                                    onFieldFocus={this.onFieldFocus}
                                    original={this.props.name}
                                    wrapperClass="user-name"
                                    value={this.state.name}
                                    validation={this.state.hasErrors[fieldMap['name']] === 0}
                                />
                                <EditField
                                    field="username"
                                    focus={this.state.activeField === 'username'}
                                    icon="at"
                                    needsValidation
                                    onFieldUpdate={this.onFieldUpdate}
                                    onFieldFocus={this.onFieldFocus}
                                    original={this.props.username}
                                    wrapperClass="user-username"
                                    value={this.state.username}
                                    validation={this.state.hasErrors[fieldMap['username']] === 0}
                                />
                                <EditField
                                    field="email"
                                    focus={this.state.activeField === 'email'}
                                    icon="mail"
                                    needsValidation
                                    onFieldUpdate={this.onFieldUpdate}
                                    onFieldFocus={this.onFieldFocus}
                                    original={this.props.email}
                                    shouldEdit={this.state.activeField === 'email'}
                                    wrapperClass="user-email"
                                    value={this.state.email}
                                    validation={this.state.hasValidEmail}
                                />
                                <EditField
                                    field="phone"
                                    focus={this.state.activeField === 'phone'}
                                    icon="phone"
                                    needsValidation
                                    onFieldUpdate={this.onFieldUpdate}
                                    onFieldFocus={this.onFieldFocus}
                                    original={this.props.phone}
                                    shouldEdit={this.state.activeField === 'phone'}
                                    wrapperClass="user-phone"
                                    value={this.state.phone}
                                    validation={this.state.hasErrors[fieldMap['phone']] === 0}
                                />
                                <EditField
                                    field="password"
                                    focus={this.state.activeField === 'password'}
                                    icon="lock"
                                    needsValidation
                                    onFieldUpdate={this.onFieldUpdate}
                                    onFieldFocus={this.onPasswordFocus}
                                    original={this.props.password}
                                    shouldEdit={this.state.activeField === 'password'}
                                    wrapperClass="user-password"
                                    value={this.state.password}
                                    validation
                                />
                            </Card.Header>
                            <Card.Meta>
                                <div className='ui two buttons'>
                                    {this.props.renderBackButton
                                    && (this.props.activeUser.id !== this.state.id) &&
                                        <Button
                                            basic
                                            color='red'
                                            content="Delete"
                                            onTouchTap={this.onDeleteUser}
                                        />
                                    }
                                </div>
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                </div>
                <Modal
                    basic
                    closeIcon
                    open={this.state.passwordModal}
                    onClose={this.onPasswordFocus}
                >
                    <Modal.Content>
                        <div className="password-wrapper">
                            {this.renderPasswordHeader()}
                            <PassCode
                                onPasswordClear={this.onPasswordClear}
                                onPasswordDelete={this.onPasswordDelete}
                                onPasswordCardClick={this.onPasswordCardClick}
                            />
                            <div className="password-text-wrapper">
                                {this.renderPasswordText()}
                            </div>
                        </div>
                    </Modal.Content>
                </Modal>
                {this.renderSaveButton()}
            </div>
        );
    }
}
