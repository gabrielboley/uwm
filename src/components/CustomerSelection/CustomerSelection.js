import Infinite from 'react-infinite';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import keygen from 'keygen';
import { Button, Icon } from 'semantic-ui-react';

import './customerSelection.css';
import { CustomerQuickView } from '../QuickView/CustomerQuickView';

class CustomerSelection extends Component {
    state = {
        currentSort: 'alphabetically',
        customer: {},
        customerIndex: null,
        sortedUsers: this.props.customers.sort(this.sortAlphabetically),
        viewModal: false
    }

    componentWillMount() {
        if (!this.props.currentSearch) {
            this.updateCustomers();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentSearch !== nextProps.currentSort) {
            this.setState({
                sortedUsers: this.filterSearch(nextProps.currentSearch)
            });
        }
        if (this.props.customers !== nextProps.customers) {
            this.updateCustomers(nextProps.customers);
        }
    }

    updateCustomers(customers = this.props.customers) {
        this.setState({
            sortedUsers: customers.sort(this.sortAlphabetically)
        });
    }

    handleCloseModal = (e) => this.setState({ viewModal: false });

    handleOpenModal = (e, customer, index) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            customer,
            viewModal: true,
            customerIndex: index
        });
    }

    sortAlphabetically = (a, b) => {
        if(a.name < b.name) {
            return -1;
        }
        if(a.name > b.name) {
            return 1;
        }
        return 0;
    }

    filterSearch = term => this.props.customers.filter(customer => (
        customer.name.toLowerCase().includes(term.toLowerCase())
    ))

    renderCustomerTiles = () => {
        return this.state.sortedUsers.map((customer, index) => (
            <div
                className="customer-list-item"
                key={`customer-${customer.id}-${keygen.hex(keygen.small)}`}
                onTouchTap={e => this.props.onUserSelection(customer)}
            >
                <Icon className="user-list-icon" name="user" />
                {customer.name}
                <Button
                    size="medium"
                    content="View"
                    floated="right"
                    className="customer-view"
                    onTouchTap={e => this.handleOpenModal(e, customer, index)}
                />
            </div>
        ));
    }

    render() {
        return (
            <div className="customer-list">
                <Infinite
                    elementHeight={45}
                    className="customer-selection-wrapper"
                    infiniteLoadingBeginBottomOffset={1000}
                    containerHeight={window.innerHeight}
                >
                    {this.renderCustomerTiles()}
                </Infinite>
                {this.state.viewModal &&
                    <CustomerQuickView
                        viewModal
                        customer={this.state.customer}
                        customerIndex={this.state.customerIndex}
                        dispatch={this.props.dispatch}
                        handleCloseModal={this.handleCloseModal}
                        onUserEdit={this.props.onUserEdit}
                        onUserSelection={this.props.onUserSelection}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers,
    };
}

export default connect(mapStateToProps)(CustomerSelection);
