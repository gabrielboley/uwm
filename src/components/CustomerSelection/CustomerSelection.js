import Infinite from 'react-infinite';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import keygen from 'keygen';
import { Button, Icon, Input } from 'semantic-ui-react';

import './customerSelection.css';
import { CustomerQuickView } from '../QuickView/CustomerQuickView';

class CustomerSelection extends Component {
    state = {
        currentSort: 'alphabetically',
        customer: {},
        customerIndex: null,
        sortedUsers: this.props.customers.sort(this.sortAlphabetically),
        viewModal: false,
        customerSearchTerm: '',
        filteredList: []
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

    handleFilter = (value) => {
        const sortedUserCopy = this.state.sortedUsers.slice();
        this.setState({
            filteredList: sortedUserCopy.filter(user => (
                user.name.toLowerCase().includes(value.toLowerCase())
            ))
        })
    }

    onSearchChange = (e) => {
        const value = e.target.value;
        this.setState({
            customerSearchTerm: value && value.length ? value : null
        }, () => {
            this.handleFilter(value);
        })
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
    
    clearSearch = () => {
        this.setState({
            customerSearchTerm: '',
            filteredList: []
        });
    }

    filterSearch = term => this.props.customers.filter(customer => (
        customer.name.toLowerCase().includes(term.toLowerCase())
    ))

    renderCustomerTiles = () => {
        const customerList = this.state.customerSearchTerm ? this.state.filteredList : this.state.sortedUsers;
        if (customerList.length) {
            return customerList.map((customer, index) => (
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
        return <div className="no-customers"><i>There Are No Customers to Display</i></div>
    }

    render() {
        return (
            <div className="customer-list">
                <div className="search-form">
                    { this.state.customerSearchTerm 
                        && (<Icon
                            color="grey" 
                            name="remove circle" 
                            size="big"
                            onTouchTap={this.clearSearch}/>) 
                    }
                    <Input
                        icon='search'
                        placeholder='Search for Customer'
                        size='huge'
                        onChange={this.onSearchChange} 
                        value={this.state.customerSearchTerm}
                    />
                </div>
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
