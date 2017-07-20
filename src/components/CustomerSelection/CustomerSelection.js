import Infinite from 'react-infinite';
import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'

import './customerSelection.css';
import { CustomerQuickView } from '../QuickView/CustomerQuickView';

export class CustomerSelection extends Component {
    state = {
        viewModal: false,
        currentSort: 'alphabetically',
        sortedUsers: this.props.customers.sort(this.sortAlphabetically)
    }

    componentWillMount() {
        if (!this.props.currentSearch) {
            this.setState({
                sortedUsers: this.props.customers.sort(this.sortAlphabetically)
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentSearch !== nextProps.currentSort) {
            this.setState({
                sortedUsers: this.filterSearch(nextProps.currentSearch)
            });
        }
    }

    handleCloseModal = (e) => this.setState({ viewModal: false });

    handleOpenModal = (e, customer) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            customer,
            viewModal: true
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
        return this.state.sortedUsers.map(customer => (
            <div
                className="customer-list-item"
                key={`customer-${customer.id}`}
                onTouchTap={e => this.props.onUserSelection(customer)}
            >
                <Icon className="user-list-icon" name="user" />
                {customer.name}
                <Button
                    size="medium"
                    content="View"
                    floated="right"
                    className="customer-view"
                    onTouchTap={e => this.handleOpenModal(e, customer)}
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
                        handleCloseModal={this.handleCloseModal}
                        onUserSelection={this.props.onUserSelection}
                    />
                }
            </div>
        );
    }
}
