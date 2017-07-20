import React, { Component } from "react";
import { Button, Divider, Header, Icon, Modal } from 'semantic-ui-react';

import './leftNav.css';
import { updatePageInView } from '../../uwm/uwm.actions';
import { logUserOut } from '../../pages/Login/login.actions';

export class LeftNav extends Component {
    state = {
        logoutModal: false
    };
    completeImg = this.props.page === 'complete' ? 'complete-active.svg' : 'complete.svg';
    inProgressImg = this.props.page === 'in-progress' ? 'in-progress-active.svg' : 'in-progress.svg';
    createOrderImg = this.props.page === 'create-order' ? 'create-order-active.svg' : 'create-order.svg';

    componentWillReceiveProps(nextProps) {
        this.completeImg = nextProps.page === 'complete' ? 'complete-active.svg' : 'complete.svg';
        this.inProgressImg = nextProps.page === 'in-progress' ? 'in-progress-active.svg' : 'in-progress.svg';
        this.createOrderImg = nextProps.page === 'create-order' ? 'create-order-active.svg' : 'create-order.svg';
    }

    handleOpenLogoutModal = (e) => this.setState({ logoutModal: true });
    handleCloseLogoutModal = (e) => this.setState({ logoutModal: false });

    onLogoutClick = () => {
        this.handleCloseLogoutModal();
        this.props.dispatch(logUserOut());
    }

    onPageClick = (page) => {
        this.props.dispatch(updatePageInView(page));
    }

    render (){
        return (
            <div className="left-nav-wrapper">
                <Button.Group
                    toggle
                    vertical
                    className={`nav-menu-wrapper ${this.props.page}`}
                >
                    <Button
                        onTouchTap={e => this.onPageClick('create-order')}
                        className="nav-item-wrapper create-order-wrapper"
                    >
                        <img
                            alt="Create an Order"
                            className="create-order-svg"
                            src={`/images/svg/${this.createOrderImg}`}
                        />
                        <div className="create-order-text">Create Order</div>
                    </Button>
                    <Button
                        onTouchTap={e => this.onPageClick('in-progress')}
                        className="nav-item-wrapper in-progress-wrapper"
                    >
                        <img
                            alt="Orders in Progress"
                            className="in-progress-svg"
                            src={`/images/svg/${this.inProgressImg}`}
                        />
                        <div className="in-progress-text">In Progress</div>
                    </Button>
                    <Button
                        onTouchTap={e => this.onPageClick('complete')}
                        className="nav-item-wrapper complete-wrapper"
                    >
                        <img
                            alt="Completed Orders"
                            className="complete-svg"
                            src={`/images/svg/${this.completeImg}`}
                        />
                        <div className="complete-text">Completed</div>
                    </Button>
                </Button.Group>
                {this.props.children}
                <Button.Group
                    toggle
                    className="footer-nav"
                >
                    <Modal
                        basic
                        size='small'
                        open={this.state.logoutModal}
                        trigger={
                            <Button
                                basic
                                inverted
                                icon="log out"
                                content="Logout"
                                onTouchTap={this.handleOpenLogoutModal}
                            />
                        }
                    >
                        <Header icon='log out' content='Are you sure want to logout?' />
                        <Modal.Content>
                            <Button color='green' onClick={this.onLogoutClick} inverted fluid>
                                <Icon name='checkmark' /> Logout
                            </Button>
                            <Divider hidden/>
                            <Button color='red' onClick={this.handleCloseLogoutModal} inverted fluid>
                                <Icon name='close' /> Cancel
                            </Button>
                        </Modal.Content>
                    </Modal>
                </Button.Group>
            </div>
        );
    }
}

