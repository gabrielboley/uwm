import store from 'store';
import { connect } from 'react-redux';
import React, { Component } from "react";
import { Sidebar } from 'semantic-ui-react';

// Styles
import "./Uwm.css";
// Utils
import { needsToLogin } from './uwm.viewStates';
import { updateUser, updatePageInView } from './uwm.actions';
// Pages
import Login from '../pages/Login/Login';
import Settings from '../pages/Settings/Settings';
import CreateOrder from '../pages/CreateOrder/CreateOrder';
// Components
import { LeftNav } from '../components/LeftNav';

class Uwm extends Component {
    isMobile = false;

    componentWillMount() {
        const { activeUser, dispatch } = this.props;

        if (window.innerWidth < 768) {
            this.isMobile = true;
        }

        if (!activeUser && needsToLogin()) {
            dispatch(updatePageInView('login'))
            return;
        };

        if(!activeUser) {
            dispatch(updateUser(store.get('user')));
        }
    }

    renderContent = () => {
        const { page } = this.props;
        switch (page) {
            case 'login': {
                return {
                    class: 'login',
                    header: 'Please Login',
                    view: <Login />
                };
            }
            case 'settings': {
                return {
                  class: 'settings',
                  header: 'Settings',
                  view: <Settings />
                };
            }
            default: {
                return {
                    class: 'create-order',
                    header: 'Create New Order',
                    view: <CreateOrder />
                };
            }
        }
    }

    render() {
        const { dispatch, page } = this.props;
        const content = this.renderContent();
        const renderLeftNav = !this.isMobile && page !== 'login';
        return (
            <div className="uwm-container">
                <Sidebar.Pushable>
                    <Sidebar className="left-nav-container" animation="uncover" width="thin" visible={renderLeftNav}>
                        <LeftNav
                            page={page}
                            dispatch={dispatch}
                        />
                    </Sidebar>
                    <Sidebar.Pusher className={`uwm-content ${content.class}`}>
                        {content.view}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser,
        page: state.page
    };
}

export default connect(mapStateToProps)(Uwm);
