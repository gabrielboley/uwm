import React, { PureComponent } from 'react';
import { Header, Icon, List } from 'semantic-ui-react'

export class CustomerView extends PureComponent {
    render() {
        const { customer } = this.props;
        return (
            <div>
                <Header>
                    <Icon name="user" />
                    {customer.name}
                </Header>
                <List>
                    <List.Item>
                        <List.Icon name='phone' />
                        <List.Content>{customer.phone}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>{customer.email}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>{customer.address.city}, {customer.address.state}</List.Content>
                    </List.Item>
                </List>
            </div>
        );
    }
}