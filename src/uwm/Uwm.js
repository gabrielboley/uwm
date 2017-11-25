import store from 'store';
import { connect } from 'react-redux';
import React, { Component } from "react";
import { Sidebar } from 'semantic-ui-react';

// Styles
import "./Uwm.css";
// Utils
import { needsToLogin } from './uwm.viewStates';
import { updateUser, updatePageInView, updateStore } from './uwm.actions';
// Pages
import Login from '../pages/Login/Login';
import Settings from '../pages/Settings/Settings';
import OrderEdit from '../pages/OrderEdit/OrderEdit';
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

        if (store.get('uwm_state')) {
            dispatch(updateStore(store.get('uwm_state')));
        }

        if (!activeUser && needsToLogin()) {
            dispatch(updatePageInView('login'))
            return;
        };

        if(!activeUser) {
            dispatch(updateUser(store.get('user')));
        }
    }

    componentWillReceiveProps() {
        this.saveStoreToLocalStorage();
    }

    saveStoreToLocalStorage = () => {
        console.log('setting local state'); // eslint-disable-line no-console
        store.set('uwm_state', this.props.state);
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
            case 'in-progress': {
                return {
                  class: 'in-progress',
                  header: 'In Progress',
                  view: <OrderEdit status={'in-progress'} />
                };
            }
            case 'completed': {
                return {
                  class: 'completed',
                  header: 'Completed',
                  view: <OrderEdit status={'completed'}/>
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
        page: state.page,
        state: state
    };
}

export default connect(mapStateToProps)(Uwm);
